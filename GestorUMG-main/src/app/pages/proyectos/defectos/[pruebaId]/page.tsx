"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col,Modal , Button, Table} from "react-bootstrap";
import API from "@/app/lib/auth";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Hito{
    IdHito: number;
    Descripcion: string;
    Fecha_inicio: string;
    Fecha_Fin: string;
    Porcentaje: string;
    IdProyecto: number;
    Estado: string;
    idEstado: number;
    
    
}


interface Prueba{
    proyecto: string,
    IdHito: number;
    IdPrueba: number;
    Nombre: string;
    Descripcion: string;
    Estado: string;
    Fecha_inicio: string;
    Fecha_fin: string;
    recurso: string;
    Criterio_aceptacion: string;

}

interface Defecto{
    IdPrueba: number;
    IdDefecto: number;
    Nombre: string;
    Descripcion: string;
    IdEstado: number;
    Estado: string;
    Resolucion: string;
    IdRecurso: number;
    recurso: string;
    Tiempo: number;
}

  interface Estado {
    IdEstado: number;
    NombreEstado: string;
  }


interface Recurso{
    IdRecurso: number;
    Nombre: string;
    Rol: string;
}
  export default function Dashboard({params,}:{params: {pruebaId: string}}) {

    const [Descripcion, setDescripcion] = useState("");
    const [Nombre, setNombre] = useState("");
    const [IdRecurso, setIdRecurso] = useState(0);
    const [IdEstado, setIdEstado] = useState(0);
    const [idPrueba, setIdPrueba] = useState(0);
    const [IdDefecto, setIdDefecto] = useState(0);
    const [Tiempo, setTiempo] = useState(0);
    const [Resolucion, setResolucion] = useState("");

    const [Recursos, setRecursos] = useState<Recurso[] | null>(null);
    const [Estados, setEstados] = useState<Estado[] | null>(null);
    const [Pruebas, setPruebas] = useState<Prueba[] | null>(null);
    const [Defectos, setDefectos] = useState<Defecto[] | null>(null);



    useEffect(() => {

        const fetchDefectos = async () => {
          try {
            const res = await API<Defecto[]>({}, "getDefectosPrueba/"+params.pruebaId, "GET", false);
            if(res.result != null){
              setDefectos(res.result);
            }
          } catch (error) {
            console.error("ERROR ", error);
          }

        };

        const fetchPruebas = async () => {
            try {
              const res = await API<Prueba[]>({}, "getDetallePrueba/"+params.pruebaId, "GET", false);
              if(res.result != null){
                setPruebas(res.result);
              }
            } catch (error) {
              console.error("ERROR ", error);
            }
          };

        const fetchRecursos = async () => {
        try {
            const res = await API<Recurso[]>({}, "getRecursosPrueba/"+params.pruebaId, "GET", false);
            if(res.result != null){
            setRecursos(res.result);
            }
        } catch (error) {
            console.error("ERROR ", error);
        }
        };  
        
        fetchRecursos();
        fetchDefectos();
        fetchPruebas();
      }, [params.pruebaId]);    

    const [show, setShow] = useState(false);
    const [mostrar, setMostrar] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    
    const cerrar = () =>setMostrar(false);
    const abrir = (defecto: Defecto) =>{
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
        setNombre(defecto.Nombre);
        setDescripcion(defecto.Descripcion);
        setTiempo(defecto.Tiempo);
        setResolucion(defecto.Resolucion);
        setIdRecurso(defecto.IdRecurso);
        setIdEstado(defecto.IdEstado);
        setIdPrueba(defecto.IdPrueba);
        setIdDefecto(defecto.IdDefecto);    
        setMostrar(true)
    };

    const updateDefecto = () =>{
        const editDefecto = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({ nombre: Nombre,
                                                                            descripcion: Descripcion,
                                                                            resolucion: Resolucion,
                                                                            idrecurso: IdRecurso,
                                                                            tiempo: Tiempo, 
                                                                            idEstado: IdEstado,                  
                                                                            idDefecto: IdDefecto},
                                                                            "updateDefecto",
                                                                            "POST",
                                                                            false);              
                    if(res.result != null){
                        const res1 = await API<Defecto[]>({}, "getDefectosPrueba/"+params.pruebaId, "GET", false);
                        if(res1.result != null){
                            setDefectos(res1.result);
                        }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Defecto actualizado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error", error);
            }
        }
        editDefecto();
        cerrar();
    }

    const agregarDefecto = ()=>{
        const addDefecto = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({idPrueba: params.pruebaId, 
                                                                           nombre: Nombre,
                                                                           descripcion: Descripcion,
                                                                           idRecurso: IdRecurso,
                                                                           idEstado: 1,
                                                                           },
                                                                           "createDefecto",
                                                                           "POST",
                                                                           false);
                
                if(res.result != null){
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Defecto creado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                    const res1 = await API<Defecto[]>({}, "getDefectosPrueba/"+params.pruebaId, "GET", false);
                    if(res1.result != null){
                        setDefectos(res1.result);
                    }
                }
            }catch(error){
                console.log("Error: ", error);
            }

        }
        addDefecto();
        handleClose();
    }

    return (
    <Container>
        <Row>
        <br></br>
            { Pruebas ? (Pruebas.map((prueba) => (
                <div className="card" key={prueba.IdPrueba}>
                    <h5 className="card-header"><strong>Proyecto: {prueba.proyecto}</strong></h5>
                    <h5 className="card-header"><strong>Hito: {prueba.IdHito} </strong></h5>
                    <h5 className="card-header"><strong>Prueba: {prueba.IdPrueba} - {prueba.Nombre}</strong></h5>
                    <div className="card-body">
                        <p>Descripción: <strong>{prueba.Descripcion}</strong></p>
                        <p>Estado: <strong>{prueba.Estado}</strong></p>
                        <p>De: <strong>{prueba.Fecha_inicio}</strong> a <strong>{prueba.Fecha_fin}</strong></p>
                        <p>Recurso: <strong>{prueba.recurso}</strong></p>
                        <p>Criterio de aceptación: <strong>{prueba.Criterio_aceptacion}</strong></p>
                    </div>
                </div>
            ))):( 
                <p>Cargando.....</p>
            ) }

        </Row>
        <Row>
        <Col md="6">
            <br></br>
            <h2>Defectos</h2>
        </Col>
        
        </Row>  
        <Row className="justify-content-md-center">

            <Col xs lg="2">
            </Col>
            <Col md="auto">
            <Button
                className= "btn btn-success"
                onClick={handleShow}
            >
                Nuevo Defecto
            </Button>
            </Col>
            <Col xs lg="2">
            </Col>
        </Row>
        <Row>
            <p></p>
        </Row>
        
        <Row>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Recurso</th>
                <th>Resolución</th>
                <th>Tiempo</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {Defectos ? (Defectos.map((defecto) => (
                <tr key={defecto.IdDefecto}>
                    <td>{defecto.IdDefecto}</td>
                    <td>{defecto.Nombre}</td>
                    <td>{defecto.Descripcion}</td>
                    <td>{defecto.Estado}</td>
                    <td>{defecto.recurso}</td>
                    <td>{defecto.Resolucion}</td>
                    <td>{defecto.Tiempo}</td>
                    <td>
                        <div className="d-flex justify-content-center">
                            {/* Botón para Editar (Color Gris) */}
                            <Button
                            style={{ backgroundColor: "gray", borderColor: "gray" }}
                            className="me-2"
                            onClick={()=>{
                                abrir(defecto);
                            }}
                            >
                            Editar
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
        
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Nuevo Defecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Código Prueba:</span>
                        <input className="form-control" disabled={true} value={params.pruebaId}  aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text"/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Nombre:</span>
                        <input className="form-control"  aria-label='Nombre' placeholder="Nombre" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setNombre(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" id="textArea" onChange={(event) => {
                            setDescripcion(event.target.value)
                        }}></textarea>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <input className="form-control" value="Creado" disabled aria-label='Estado' placeholder="Estado" aria-describedby='basic-addon1' type="text" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Recurso:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdRecurso(Number(event.target.value))
                        }}>

                            { Recursos ? (Recursos.map((recurso) => (
                                <option key={recurso.IdRecurso} value={recurso.IdRecurso}>{recurso.Nombre} - {recurso.Rol}</option>
                            ))):( 
                                <option value="0">Cargando.....</option>
                            ) }
                        </select>
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={agregarDefecto}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Defecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Código Prueba:</span>
                        <input className="form-control" disabled={true} value={params.pruebaId}  aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text"/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Nombre:</span>
                        <input className="form-control"  aria-label='Nombre' value={Nombre} placeholder="Nombre" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setNombre(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" value={Descripcion} id="textArea" onChange={(event) => {
                            setDescripcion(event.target.value)
                        }}></textarea>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <select className="form-select" value={IdEstado} aria-label="Default select example" onChange={(event) => {
                            setIdEstado(Number(event.target.value))
                        }}>

                            { Estados ? (Estados.map((estado) => (
                                <option key={estado.IdEstado} value={estado.IdEstado}>{estado.NombreEstado}</option>
                            ))):( 
                                <option value="0">Carganado.....</option>
                            ) }
                        </select>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Recurso:</span>
                        <select className="form-select" value={IdRecurso} aria-label="Default select example" onChange={(event) => {
                            setIdRecurso(Number(event.target.value))
                        }}>

                            { Recursos ? (Recursos.map((recurso) => (
                                <option key={recurso.IdRecurso} value={recurso.IdRecurso}>{recurso.Nombre} - {recurso.Rol}</option>
                            ))):( 
                                <option value="0">Cargando.....</option>
                            ) }
                        </select>
                    </div>

                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Resolución:</span>
                        <textarea className="form-control" value={Resolucion} id="textArea" onChange={(event) => {
                            setResolucion(event.target.value)
                        }}></textarea>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Tiempo invertido en horas:</span>
                        <input className="form-control"  value={Tiempo  } aria-describedby='basic-addon1' type="number" onChange={(event) => {
                            setTiempo(Number(event.target.value))
                        }}/>
                    </div>

                    
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={cerrar}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={updateDefecto}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>
    </Container>
      
 ); }