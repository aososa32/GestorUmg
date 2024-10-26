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
interface Estado {
    IdEstado: number;
    NombreEstado: string;
  }

  export default function Dashboard({params,}:{params: {proyectoId: string}}) {

    
    const [idProyectoActual, setIdProyectoActual] = useState(0);
    const [hitos, setHitos] = useState<Hito[] | null>(null);
    const [proyectos, setProyectos] = useState<Proyecto[] | null>(null);
    const [Descripcion, setDescripcion] = useState("");
    const [Fecha_inicio, setFechaIni] = useState("");
    const [Fecha_Fin, setFechaFin] = useState("");
    const [Porcentaje, setPorcentaje] = useState("0");
    const [idEstado, setIdEstado] = useState(0);
    const [IdHito, setIdHito] = useState(0);
    const [estados, setEstados] = useState<Estado[] | null>(null);
    const [nombreProyecto, setNombreProyecto] = useState("");

    //const router = useRouter();



    useEffect(() => {
        setIdProyectoActual(Number(params.proyectoId));

        const fetchProyectos = async () => {
          try {
            const res = await API<Proyecto[]>({}, "proyectos/getProyecto/"+params.proyectoId, "GET", false);
            if(res.result != null){
              setProyectos(res.result);

              // Busca el proyecto correspondiente y actualiza el nombre
          const proyectoActual = res.result.find((proyecto) => proyecto.IdProyecto === Number(params.proyectoId));
          if (proyectoActual) {
            setNombreProyecto(proyectoActual.NombrePy); // Asigna el nombre del proyecto actual
          }
            }
          } catch (error) {
            console.error("ERROR ", error);
          }

        };

        

        const fetchHitos = async () => {
            try {
              const res = await API<Hito[]>({}, "getHitos/"+params.proyectoId, "GET", false);
              if(res.result != null){
                setHitos(res.result);
              }
            } catch (error) {
              console.error("ERROR ", error);
            }
          };
    
        fetchProyectos();
        fetchHitos();
      }, [params.proyectoId]);     

    const [show, setShow] = useState(false);
    const [mostrar, setMostrar] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    
    const cerrar = () =>setMostrar(false);
    const abrir = (hito: Hito) =>{
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
        setDescripcion(hito.Descripcion);
        setFechaIni(hito.Fecha_inicio);
        setFechaFin(hito.Fecha_Fin);
        setPorcentaje(hito.Porcentaje);
        setIdEstado(Number(hito.idEstado));
        setIdHito(hito.IdHito);
        setMostrar(true)
    };

    const updateHito = () =>{
        const editHito = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({ Descripcion: Descripcion,
                                                                            Fecha_inicio: Fecha_inicio,
                                                                            Fecha_Fin: Fecha_Fin,
                                                                            Porcentaje: Porcentaje,   
                                                                            idEstado: idEstado,               
                                                                            IdHito: IdHito},
                                                                            "updateHito",
                                                                            "POST",
                                                                            false);
                if(res.result != null){
                    const res = await API<Hito[]>({}, "getHitos/"+params.proyectoId, "GET", false);
                    if(res.result != null){
                        setHitos(res.result);
                    }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Hito agregado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error", error);
            }
        }
        editHito();
        cerrar();
    }

    const agregarHito = ()=>{
        const addHito = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({IdProyecto: params.proyectoId, 
                                                                           Fecha_inicio: Fecha_inicio,
                                                                           Fecha_Fin: Fecha_Fin,
                                                                           idEstado: 1,
                                                                           Porcentaje: Porcentaje,
                                                                           Descripcion: Descripcion},
                                                                           "createHito",
                                                                           "POST",
                                                                           false);
                
                if(res.result != null){
                    const res = await API<Hito[]>({}, "getHitos/"+params.proyectoId, "GET", false);
                    if(res.result != null){
                        setHitos(res.result);
                    }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Hito agregado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error: ", error);
            }

        }
        addHito();
        handleClose();
    }

    return (
    <Container>
        <Row>
        <br></br>
            { proyectos ? (proyectos.map((proyecto) => (
                <div className="card" key={proyecto.IdProyecto}>
                    <h5 className="card-header"><strong>Proyecto: {proyecto.IdProyecto} - {proyecto.NombrePy} </strong></h5>
                    <div className="card-body">
                        <p>Propietario: <strong>{proyecto.PropietarioPy}</strong></p>
                        <p>Estado: <strong>{proyecto.Estado}</strong></p>
                        <p> Duración De: <strong>{new Date(proyecto.Fecha_Inicio).toLocaleDateString()}</strong> a <strong>{new Date(proyecto.Fecha_Fin).toLocaleDateString()}</strong></p>
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
            <h2>Hitos</h2>
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
                Nuevo Hito
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
                <th>Descripción</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Porcentaje</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {hitos ? (hitos.map((hito) => (
                <tr key={hito.IdHito}>
                    <td>{hito.IdHito}</td>
                    <td>{hito.Descripcion}</td>
                    <td>De {new Date(hito.Fecha_inicio).toLocaleDateString()} a {new Date(hito.Fecha_Fin).toLocaleDateString()}</td>
                    <td>{hito.Estado}</td>
                    <td><p>Porcentaje: <strong>{ hito.Porcentaje } %</strong><div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={ 100 }  style={{ width: hito.Porcentaje+"%" }}>{hito.Porcentaje}% </div>
                            </div>
                        </p></td>
                    <td>
                    <div className="d-flex justify-content-center">
                        {/* Botón para Editar (Color Gris) */}
                        <Button
                        style={{ backgroundColor: "gray", borderColor: "gray" }}
                        className="me-2"
                        onClick={() => {abrir(hito)}}
                        >
                        Editar
                        </Button>

                        {/* Botón para Eliminar (Color Azul Marino) */}

                        <a className="btn btn-primary" href={`/pages/proyectos/pruebas/${hito.IdHito}`} >Ver Pruebas</a>
                        
                       
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
            <Modal.Title>Nuevo Hito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Código Proyecto:</span>
                        <input className="form-control" disabled={true} value={params.proyectoId} aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text"/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" id="textArea" onChange={(event) => {
                            (event.target.value)
                        }}></textarea>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <input className="form-control" value="Creado" disabled aria-label='Estado' placeholder="Estado" aria-describedby='basic-addon1' type="text" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" aria-label='Fecha Inicio' placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFechaIni(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" aria-label='Fecha Fin'  placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFechaFin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Porcentaje: {Porcentaje}%</span>
                        <input type="range" className="form-range" min="0" max="100" step="10" id="customRange3" onChange={(event) => {
                            setPorcentaje(event.target.value)
                        }}/>
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={agregarHito}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Hito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Proyecto:</span>
                        <input className="form-control" disabled={true} value={`${idProyectoActual}  ${ nombreProyecto}`}  />
                      
                    
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" value={Descripcion} id="textArea" onChange={(event) => {
                            setDescripcion(event.target.value)
                        }}></textarea>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdEstado(Number(event.target.value))
                        }}>

                            { estados ? (estados.map((estado) => (
                                <option key={estado.IdEstado} value={estado.IdEstado}>{estado.NombreEstado}</option>
                            ))):( 
                                <option value="0">Carganado.....</option>
                            ) }
                        </select>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" value={Fecha_inicio} aria-label='Fecha Inicio' placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFechaIni(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" value={Fecha_Fin} aria-label='Fecha Fin'  placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFechaFin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Porcentaje: {Porcentaje}%</span>
                        <input type="range" className="form-range" min="0" max="100" step="10" id="customRange3" onChange={(event) => {
                            setPorcentaje(event.target.value)
                        }}/>
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={cerrar}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={updateHito}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>
    </Container>
      
 ); }