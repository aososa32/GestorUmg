"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col,Table , Button} from "react-bootstrap";
import API from "@/app/lib/auth";

import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Recurso {
  IdRecurso: number;
  Nombre: string;
  Rol: string;
}

export default function Dashboard() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [Nombre, setNombre] = useState("");
  const [IdRecurso, setIdRecurso] = useState(0);
  const [Rol, setRol] = useState("");

  const[editar, setEditar] = useState(false);

  const agregarRecurso = ()=>{
    
    const addRecurso = async () =>{
      if (Nombre.trim() === "" || Rol.trim() === "") {
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El campo Nombre y Rol no pueden estar vacíos</i>,
          icon: "error",
          timer: 2000
        });
        return;
      }
      try{
        const res = await API<{ mensaje: string, message: string }>({Nombre: Nombre, Rol: Rol}, "create", "POST", false);
        if(res.result != null){
          const res1 = await API<Recurso[]>({}, "getRecursos", "GET", false);
          if(res1.result != null){
            setRecursos(res1.result);
          }
          limpiarCampos();
          MySwal.fire({
            title: <strong>Correcto</strong>,
            html: <i>Recurso<strong> {Nombre}</strong> agregado con exito</i>,
            icon: "success",
            timer: 2000
          });
        }
      }catch(error) {
        console.log('ERROR', error);
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Ocurrió un error al procesar la solicitud</i>,
          icon: "error",
          timer: 2000
        });
      }
    };
    addRecurso();

  }

  const updateRecurso = ()=>{
    
    const editRecurso = async () =>{
      if (Nombre.trim() === "" || Rol.trim() === "") {
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El campo Nombre y Rol no pueden estar vacíos</i>,
          icon: "error",
          timer: 2000
        });
        return;
      }
      try{
        const res = await API<{ mensaje: string, message: string }>({IdRecurso: IdRecurso, Nombre: Nombre, Rol: Rol}, "updateRecurso", "POST", false);
        if(res.result != null){
          const res1 = await API<Recurso[]>({}, "getRecursos", "GET", false);
          if(res1.result != null){
            setRecursos(res1.result);
            limpiarCampos();
            MySwal.fire({
              title: <strong>Correcto</strong>,
              html: <i>Recurso modificado con exito</i>,
              icon: "success",
              timer: 2000
            })

          }
        }
      }catch(error) {
        console.log('ERROR', error);
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Ocurrió un error al procesar la solicitud</i>,
          icon: "error",
          timer: 2000
        });
      }
    };
    editRecurso();

  }

  const editarRecurso = (recurso: Recurso) => {
    //alert("Editando recurso: "+recurso.idRecurso);
    setEditar(true);
    setNombre(recurso.Nombre);
    setRol(recurso.Rol);
    setIdRecurso(recurso.IdRecurso);    
  }

  const eliminarRecurso = (IdRecursoEdit: number) => {
    const deleteRecurso = async () =>{
      try{
        const res = await API<{mensaje: string, message: string}>({IdRecurso: IdRecursoEdit}, "deleteRecurso", "POST", false);
        if(res.result != null){ 
          const res1 = await API<Recurso[]>({}, "getRecursos", "GET", false);
          if(res1.result != null){
            setRecursos(res1.result);
          }
          
          MySwal.fire({
            title: <strong>Correcto</strong>,
            html: <i>Recurso eliminado con exito</i>,
            icon: "success",
            timer: 2000
          })
          
        }else{
          alert("Error al eliminar");
        }
      }catch(error) {
        console.log('ERROR', error);
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Ocurrió un error al procesar la solicitud</i>,
          icon: "error",
          timer: 2000
        });
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
        deleteRecurso();
      } else if (result.isDenied) {
        
      }
    })
  }

  const limpiarCampos = ()=>{
    setEditar(false);
    setNombre("");
    setRol("");
    setIdRecurso(0);
  }

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const res = await API<Recurso[]>({}, "getRecursos", "GET", false);
        if(res.result != null){
          setRecursos(res.result);
        }
      } catch(error) {
        console.log('ERROR', error);
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Ocurrió un error al procesar la solicitud</i>,
          icon: "error",
          timer: 2000
        });
      }
    };

    fetchRecursos();
  }, []);

  return (
    <Container>
      <Row>
        <Col md="6">
          <h2>RECURSOS</h2>
        </Col>
        <p>Bienvenido a administración de recursos</p>
      </Row>
      <Row className="justify-content-md-center">
        <Col>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className='input-group-text' id="basic-addon1">Nombre:</span>
            <input className="form-control" value={Nombre} aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text" onChange={(event) => {
              setNombre(event.target.value)
            }} />
          </div>
          <div className="input-group mb-3">  
            <span className='input-group-text' id="basic-addon1">Rol:</span>
            <input className="form-control" value={Rol} aria-label='Rol' placeholder="Rol" aria-describedby='basic-addon1' type="text" onChange={(event) => {
              setRol(event.target.value)
            }}/>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
              <button className="btn btn-primary" onClick={updateRecurso}>Actualizar</button>
              <button className="btn btn-danger" onClick={limpiarCampos}>Cancelar</button>
            </div>
            :
            <button className="btn btn-success" onClick={agregarRecurso}>Registrar</button>

          }
          
        </div>
        </Col>
        <Col>
        </Col>
        <Col> </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {recursos ? (recursos.map((recurso) => (
              <tr key={recurso.IdRecurso}>
                <td>{recurso.IdRecurso}</td>
                <td>{recurso.Nombre}</td>
                <td>{recurso.Rol}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    {/* Botón para Editar (Color Gris) */}
                    <Button
                      style={{ backgroundColor: "gray", borderColor: "gray" }}
                      className="me-2"
                      onClick={()=>{
                        editarRecurso(recurso);

                      }}
                      
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </Button>

                    {/* Botón para Eliminar (Color Azul Marino) */}
                    <Button
                      style={{ backgroundColor: "navy", borderColor: "navy" }}
                      onClick={() => eliminarRecurso(recurso.IdRecurso)}
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