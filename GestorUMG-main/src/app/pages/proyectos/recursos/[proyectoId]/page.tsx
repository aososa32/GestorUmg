"use client";
import React, { useState, useEffect } from "react";
import { useRouter} from "next/router"
import { Container, Row, Col,Modal , Button, Table} from "react-bootstrap";
import API from "@/app/lib/auth";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useLocation } from 'react-router-dom';

const MySwal = withReactContent(Swal);

interface Proyecto {
    IdProyecto: number;
    NombrePy: string;
    Porcentaje: string;
    PropietarioPy: string;
    IdEstado: string;
    Fecha_Inicio: string;
    Fecha_Fin: string;
    Url: string;
    Estado: string;
    descripcion: string;
  }

interface Recurso{
    IdRecurso: number;
    Nombre: string;
    Rol: string;
}

interface Estado {
    IdEstado: number;
    NombreEstado: string;
  }

  export default function Dashboard({params,}:{params: {proyectoId: string}}) {

    
    const [idProyectoActual, setIdProyectoActual] = useState(0);
    const [recursos, setRecursos] = useState<Recurso[] | null>(null);
    const [proyectos, setProyectos] = useState<Proyecto[] | null>(null);
    const [recursosNoAsignados, setRecursosNoAsignados] = useState<Recurso[] | null>(null);

    const [IdRecurso, setIdRecurso] = useState(0);

    //const router = useRouter();



    useEffect(() => {
        setIdProyectoActual(Number(params.proyectoId));

        const fetchProyectos = async () => {
          try {
            const res = await API<Proyecto[]>({}, "proyectos/getProyecto/"+params.proyectoId, "GET", false);
            if(res.result != null){
              setProyectos(res.result);
            }
          } catch (error) {
            console.error("ERROR ", error);
          }

        };

        const fetchRecursos = async () => {
            try {
              const res = await API<Recurso[]>({}, "getProyectoRecurso/"+params.proyectoId, "GET", false);
              if(res.result != null){
                setRecursos(res.result);
              }

              const res_1 = await API<Recurso[]>({}, "getProyectoRecursoNoAsignado/"+params.proyectoId, "GET", false);
              if(res_1.result != null){
                setRecursosNoAsignados(res_1.result);
              }

            } catch (error) {
              console.error("ERROR ", error);
            }
          };
    
        fetchProyectos();
        fetchRecursos();
      }, [params.proyectoId]);    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  



    const agregarRecurso = ()=>{
        const addRecurso = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({IdProyecto: params.proyectoId, 
                                                                           IdRecurso: IdRecurso},
                                                                           "createRecursoProyecto",
                                                                           "POST",
                                                                           false);
                
                if(res.result != null){
                    try {
                        const res = await API<Recurso[]>({}, "getProyectoRecurso/"+params.proyectoId, "GET", false);
                        if(res.result != null){
                            setRecursos(res.result);
                        }
                    } catch (error) {
                        console.error("ERROR ", error);
                    }

                    try {
                        const res_2 = await API<Recurso[]>({}, "getProyectoRecursoNoAsignado/"+params.proyectoId, "GET", false);
                        if(res_2.result != null){
                            setRecursosNoAsignados(null);
                            setRecursosNoAsignados(res_2.result);
                        }
                    } catch (error) {
                        console.error("ERROR ", error);
                    }
                }
            }catch(error){
                console.log("Error: ", error);
            }

        }
        addRecurso();
        handleClose();
    }

    return (
    <Container>
        <Row>
        <br></br>
            { proyectos ? (proyectos.map((proyecto) => (
                <div className="card" key={proyecto.IdProyecto}>
                    <h5 className="card-header"><strong>Proyecto: {proyecto.IdProyecto} - {proyecto.NombrePy}</strong></h5>
                    <div className="card-body">
                        <p>Propietario: <strong>{proyecto.PropietarioPy}</strong></p>
                        <p>Estado: <strong>{proyecto.Estado}</strong></p>
                        <p>Duración De: <strong>{new Date(proyecto.Fecha_Inicio).toLocaleDateString()}</strong> a <strong>{new Date(proyecto.Fecha_Fin).toLocaleDateString()}</strong></p>
                        <p className="card-text"> URL: <a href={proyecto.Url}>{proyecto.Url}</a></p>
                        <p>Porcentaje: <strong>{ proyecto.Porcentaje } %</strong><div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={ 100 }  style={{ width: proyecto.Porcentaje+"%" }}>{proyecto.Porcentaje}% </div>
                            </div>
                        </p>
                        <p>Descripción: {proyecto.descripcion}</p>
                    </div>
                </div>
            ))):( 
                <p>Cargando.....</p>
            ) }

        </Row>
        <Row>
        <Col md="6">
            <br></br>
            <h2>Recursos Asignados</h2>
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
                Asignar Nuevo Recurso
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
                <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                {recursos ? (recursos.map((recurso) => (
                <tr key={recurso.IdRecurso}>
                    <td>{recurso.IdRecurso}</td>
                    <td>{recurso.Nombre}</td>
                    <td>{recurso.Rol}</td>
                </tr>
                ))):( <tr>
                    <td>Cargando.....</td>
                </tr> ) }
            </tbody>
            </Table>
        </Row>
        
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Asignar Recursos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Recurso:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdRecurso(Number(event.target.value))
                        }}>

                            { recursosNoAsignados ? (recursosNoAsignados.map((recurso) => (
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
            <Button variant="primary" onClick={agregarRecurso}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>

    </Container>
      
 ); }