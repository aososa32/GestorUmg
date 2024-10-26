"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col,Modal , Button} from "react-bootstrap";
import API from "@/app/lib/auth";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

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
  
  interface Estado {
    IdEstado: number;
    NombreEstado: string;
  }

  export default function Dashboard() {
    const [proyectos, setProyectos] = useState<Proyecto[] | null>(null);
    const [NombrePy, setNombrePy] = useState("");
    const [Porcentaje, setPorcentaje] = useState("0");
    const [PropietarioPy, setPropietarioPy] = useState("");
    const [Fecha_Inicio, setFecha_Inicio] = useState("");
    const [Fecha_Fin, setFecha_Fin] = useState("");
    const [Url, setUrl] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [IdEstado, setIdEstado] = useState(0);
    const [NombreEstado, setNombreEstado] = useState("");

    const [IdProyecto, setIdProyecto] = useState(0);

    const [Estados, setEstados] = useState<Estado[] | null>(null);

    useEffect(() => {
        const fetchProyectos = async () => {
          try {
            const res = await API<Proyecto[]>({}, "getProyectos", "GET", false);
            if(res.result != null){
              setProyectos(res.result);
            }
          } catch (error) {
            console.error("ERROR ", error);
          }
        };
    
        fetchProyectos();
      }, []);    

    const [show, setShow] = useState(false);
    const [mostrar, setMostrar] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    
    const cerrar = () =>setMostrar(false);
    const abrir = (proyecto: Proyecto) =>{
        const fetchEstados = async () => {
            try {
              
                const res = await API<Estado[]>({}, "getEstados", "GET", false);
                
               
                if(res.result != null){
                    setEstados(res.result);
                }
            } catch (error) {
                console.error("Error al obtener los estados:", error);
            }
            };
        
        fetchEstados();
        setNombrePy(proyecto.NombrePy);
        setPropietarioPy(proyecto.PropietarioPy);
        setDescripcion(proyecto.descripcion);
        setUrl(proyecto.Url);
        setFecha_Inicio(proyecto.Fecha_Inicio);
        setFecha_Fin(proyecto.Fecha_Fin);
        setPorcentaje(proyecto.Porcentaje);
        setIdProyecto(proyecto.IdProyecto);
        setIdEstado(Number(proyecto.IdEstado));
        
        setMostrar(true)
    };

    const updateProyecto = () =>{
        const editProyecto = async () =>{
            if (NombrePy.trim() === "" || PropietarioPy.trim() === "" || Fecha_Inicio.trim() === "" || Fecha_Inicio.trim()=== "" || descripcion.trim() === "") {
                MySwal.fire({
                  title: <strong>Error</strong>,
                  html: <i>los campos no deben estar vacios</i>,
                  icon: "error",
                  timer: 2000
                });
                return;
              }
            try{
                const res = await API<{mensaje: string, message: string}>({IdProyecto: IdProyecto, 
                                                                            NombrePy: NombrePy, 
                                                                            Porcentaje: Porcentaje,
                                                                            PropietarioPy: PropietarioPy,
                                                                            IdEstado: IdEstado,
                                                                            Fecha_Inicio: Fecha_Inicio,
                                                                            Fecha_Fin: Fecha_Fin,
                                                                            Url: Url,
                                                                            descripcion: descripcion},
                                                                            "updateProyecto",
                                                                            "POST",
                                                                            false);
                if(res.result != null){
                    const res1 = await API<Proyecto[]>({}, "getProyectos", "GET", false);
                    if(res1.result != null){
                        setProyectos(res1.result);
                    }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Proyecto modificado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error", error);
            }
        }
        editProyecto();
        cerrar();
    }

    const agregarProyecto = ()=>{
        const addProyecto = async () =>{
            if (NombrePy.trim() === "" || PropietarioPy.trim() === "" || Fecha_Inicio.trim() === "" || Fecha_Inicio.trim()=== "" || descripcion.trim() === "") {
                MySwal.fire({
                  title: <strong>Error</strong>,
                  html: <i>los campos no deben estar vacios</i>,
                  icon: "error",
                  timer: 2000
                });
                return;
              }
            try{
                const res = await API<{mensaje: string, message: string}>({NombrePy: NombrePy, 
                                                                           Porcentaje: Porcentaje,
                                                                           PropietarioPy: PropietarioPy,
                                                                           IdEstado: '1',
                                                                           Fecha_Inicio: Fecha_Inicio,
                                                                           Fecha_Fin: Fecha_Fin,
                                                                           Url: Url,
                                                                           descripcion: descripcion},
                                                                           "createProyecto",
                                                                           "POST",
                                                                           false);
                
                if(res.result != null){
                    const res1 = await API<Proyecto[]>({}, "getProyectos", "GET", false);
                    if(res1.result != null){
                        setProyectos(res1.result);
                    }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Proyecto<strong> {NombrePy}</strong> agregado con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error: ", error);
            }
        }
        addProyecto();
        handleClose();
    }
    return (
    <Container>
        <Row>
        <Col md="6">
            <h2>Proyectos</h2>
        </Col>
        <p>Bienvenido a administración de proyectos</p>
        </Row>  
        <Row className="justify-content-md-center">

            <Col xs lg="2">
            </Col>
            <Col md="auto">
            <Button
                className= "btn btn-success"
                onClick={handleShow}
            >
                Nuevo Proyecto
            </Button>
            </Col>
            <Col xs lg="2">
            </Col>
        </Row>
        <Row>
            <p></p>
        </Row>
        <Row>
            <div style={{display: "flex", flexWrap: "wrap"}} >
            {proyectos ? (proyectos.map((proyecto) => {
  const estadoNombre = Estados?.find(estado => estado.IdEstado === Number(proyecto.IdEstado))?.NombreEstado || "Desconocido";

  return (
    <div className="card bg-light mb-3" key={proyecto.IdProyecto} style={{ maxWidth: "18rem", marginLeft: "5px" }}>
      <div className="card-header"><strong>Proyecto: {proyecto.IdProyecto} - {proyecto.NombrePy}</strong></div>
      <div className="card-body">
        <p>Propietario: <strong>{proyecto.PropietarioPy}</strong></p>
        <p>Estado: <strong>{estadoNombre}</strong></p>
        <p>
            Duración De: <strong>{new Date(proyecto.Fecha_Inicio).toLocaleDateString('en-CA')}</strong> a <strong>{new Date(proyecto.Fecha_Fin).toLocaleDateString('en-CA')}</strong>
        </p>
        <p className="card-text"> Url: <a href={proyecto.Url}>{proyecto.Url}</a></p>
        <p className="card-text"> descripcion: <a href={proyecto.descripcion} style={{ textDecoration: "none", color: "black" }}>{proyecto.descripcion}</a></p>
        <p>Porcentaje: <strong>{proyecto.Porcentaje}%</strong>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: proyecto.Porcentaje + "%" }}>{proyecto.Porcentaje}%</div>
          </div>
        </p>
        <a className="btn btn-outline-secondary" href={`/pages/proyectos/hitos/${proyecto.IdProyecto}`} style={{ fontSize: '12px' }}>Hitos</a>
        <a className="btn btn-outline-success" style={{ fontSize: '12px' }} onClick={() => { abrir(proyecto) }}>Modificar</a>
        <a className="btn btn-outline-dark" href={`/pages/proyectos/recursos/${proyecto.IdProyecto}`} style={{fontSize: '12px'}}>Rercursos</a>
      </div>
    </div>
  )
})) : (
  <p>Cargando.....</p>
)}
            </div>

        </Row>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Nuevo Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Nombre:</span>
                        <input className="form-control"  aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setNombrePy(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Propietario:</span>
                        <input className="form-control"  aria-label='Propietario' placeholder="Propietario" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setPropietarioPy(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Url:</span>
                        <input className="form-control"  aria-label='Ticket' placeholder="Ticket" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setUrl(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <input className="form-control" value="Creado" disabled aria-label='Estado' placeholder="Estado" aria-describedby='basic-addon1' type="text" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" aria-label='Fecha Inicio' placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFecha_Inicio(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" aria-label='Fecha Fin'  placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFecha_Fin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Porcentaje: {Porcentaje}%</span>
                        <input type="range" className="form-range" min="0" max="100" step="10" id="customRange3" onChange={(event) => {
                            setPorcentaje(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(event) => {
                            setDescripcion(event.target.value)
                        }}></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={agregarProyecto}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">NombrePy:</span>
                        <input className="form-control"  aria-label='NombrePy' value={NombrePy} placeholder='NombrePy' aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setNombrePy(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">PropietarioPy:</span>
                        <input className="form-control"  aria-label='PropietarioPy' value={PropietarioPy} placeholder="PropietarioPy" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setPropietarioPy(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Url:</span>
                        <input className="form-control"  aria-label='Ticket' value={Url} placeholder="Ticket" aria-describedby='basic-addon1' type="text" onChange={(event) => {
                            setUrl(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Estado:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdEstado(Number(event.target.value))
                        }}>

                            { Estados ? (Estados.map((Estado) => (
                                <option key={Estado.IdEstado} value={Estado.IdEstado}>{Estado.NombreEstado}</option>
                            ))):( 
                                <option value="0">Carganado.....</option>
                            ) }
                        </select>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" aria-label='Fecha Inicio' value={Fecha_Inicio} placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFecha_Inicio(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" aria-label='Fecha Fin' value={Fecha_Fin} placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFecha_Fin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Porcentaje: {Porcentaje}%</span>
                        <input type="range" className="form-range" min="0" max="100" step="10" id="customRange3" value={Porcentaje} onChange={(event) => {
                            setPorcentaje(event.target.value)
                        }}/>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Descripción:</span>
                        <textarea className="form-control" value={descripcion} id="exampleFormControlTextarea1" onChange={(event) => {
                            setDescripcion(event.target.value)
                        }}></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={cerrar}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={updateProyecto}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>



    </Container>
      
 ); }