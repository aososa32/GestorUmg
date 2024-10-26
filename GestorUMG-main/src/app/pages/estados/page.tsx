"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col,Table , Button} from "react-bootstrap";
import API from "@/app/lib/auth";

import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Estado {
  IdEstado: number;
  NombreEstado: string;
}

export default function Dashboard() {
  const [estados, setEstados] = useState<Estado[] | null>(null);
  const [NombreEstado, setNombreEstado] = useState("");
  const [IdEstado, setIdEstado] = useState(0);
  const[editar, setEditar] = useState(false);

  const limpiarCampos = ()=>{
    setEditar(false);
    setNombreEstado("");
    setIdEstado(0);
  }

  const agregarEstado = ()=>{
    
    const addEstado = async () =>{
      if (NombreEstado.trim() === "") {
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El campo Nombre no pueden estar vacíos</i>,
          icon: "error",
          timer: 2000
        });
        return;
      }
      try{
        const res = await API<{ mensaje: string, message: string }>({NombreEstado: NombreEstado}, "createEstado", "POST", false);
        if(res.result != null){
          const res1 = await API<Estado[]>({}, "getEstados", "GET", false);
          if(res1.result != null){
            setEstados(res1.result);
          }
          limpiarCampos();
          MySwal.fire({
            title: <strong>Correcto</strong>,
            html: <i>Estado<strong> {NombreEstado}</strong> agregado con exito</i>,
            icon: "success",
            timer: 2000
          });
        }
      }catch(error){
        console.log('ERROR',error);
      }
    };
    addEstado();

  }
  const eliminarEstado = (IdEstadoEdit: number) => {
    const deleteEstado = async () =>{
        try{
          const res = await API<{ mensaje: string, message: string }>({IdEstado: IdEstadoEdit}, "deleteEstado", "POST", false);
          if(res.result != null){
            const res1 = await API<Estado[]>({}, "getEstados", "GET", false);
            if(res1.result != null){
              setEstados(res1.result);
            }

            MySwal.fire({
              title: <strong>Correcto</strong>,
              html: <i>Estado eliminado con exito</i>,
              icon: "success",
              timer: 2000
            })

          }else{
            alert("Error en eliminar");
          }
        }catch(error){
          console.log('ERROR',error);
        }
      };

    MySwal.fire({
      title: 'Seguro que desea eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: "question",
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEstado();
      } else if (result.isDenied) {
        
      }
    }) 
  }

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const res = await API<Estado[]>({}, "getEstados", "GET", false);
        if(res.result != null){
          setEstados(res.result);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchEstados();
  }, []);

  const updateEstado = ()=>{
    const editEstado = async () => {
      if (NombreEstado.trim() === "") {
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El campo Nombre  no pueden estar vacíos</i>,
          icon: "error",
          timer: 2000
        });
        return;
      }
      try{
        const res = await API<{mensaje: string, message: string}>({IdEstado: IdEstado, NombreEstado: NombreEstado}, "updateEstado", "POST", false);
        if(res.result != null){
          const res1 = await API<Estado[]>({}, "getEstados", "GET", false);
          if(res1.result != null){
            setEstados(res1.result);
          }
          limpiarCampos();
          MySwal.fire({
            title: <strong>Correcto</strong>,
            html: <i>Estado modificado con exito</i>,
            icon: "success",
            timer: 2000
          });
        }
      }catch(error){
        console.log("ERROR:", error);
      }


    };
    editEstado();

  }

  const editarEstado = (estado: Estado) =>{
    setEditar(true);
    setNombreEstado(estado.NombreEstado);
    setIdEstado(estado.IdEstado);
  }

  return (
    <Container>
      <Row>
        <Col md="6">
          <h2>ESTADOS</h2>
        </Col>
        <p>Bienvenido a administración de estados</p>

        
      </Row>



      <Row className="justify-content-md-center">
        <Col>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className='input-group-text' id="basic-addon1">Nombre:</span>
            <input className="form-control" value={NombreEstado} aria-label='NombreEstado' placeholder='NombreEstado' aria-describedby='basic-addon1' type="text" onChange={(event) => {
              setNombreEstado(event.target.value)
            }} />
          </div>
        </div>
        <div className="card-footer text-muted">

          {
            editar?
            <div>
              <button className="btn btn-primary" onClick={updateEstado}>Actualizar</button>
              <button className="btn btn-danger" onClick={limpiarCampos}>Cancelar</button>
            </div>
            :
            <button className="btn btn-success" onClick={agregarEstado}>Registrar</button>
          }
        </div>
        </Col>
        <Col>
        </Col>
      </Row>

        


      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {estados ? (estados.map((estado) => (
              <tr key={estado.IdEstado}>
                <td>{estado.IdEstado}</td>
                <td>{estado.NombreEstado}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    {/* Botón para Editar (Color Gris) */}
                    <Button
                      style={{ backgroundColor: "gray", borderColor: "gray" }}
                      className="me-2"
                      onClick={() => editarEstado(estado)}
                      
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </Button>

                    {/* Botón para Eliminar (Color Azul Marino) */}
                    <Button
                      style={{ backgroundColor: "navy", borderColor: "navy" }}
                      onClick={() => eliminarEstado(estado.IdEstado)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))):( <tr>
                <td>Cargando.....</td>
            </tr> ) }
          </tbody>
        </Table>



      </Row>
      
    </Container>
    
    

  );
}