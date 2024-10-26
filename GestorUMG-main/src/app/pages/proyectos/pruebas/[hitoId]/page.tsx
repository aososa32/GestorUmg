"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col,Modal , Button, Table} from "react-bootstrap";
import API from "@/app/lib/auth";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Hito{
    IdHito: number;
    Nombre: string;
    Descripcion: string;
    Fecha_inicio: string;
    Fecha_Fin: string;
    Porcentaje: string;
    IdProyecto: number;
    Estado: string;
    idEstado: number; 
}

interface Prueba{
    IdPrueba: number;
    Nombre: string;
    Descripcion: string;
    Fecha_inicio: string;
    Fecha_fin: string;
    Comentario: string;
    Recurso: string;
    Criterio_aceptacion: string;
    Estado: string;
    

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
  export default function Dashboard({params,}:{params: {hitoId: string}}) {

    
    const [hitos, setHitos] = useState<Hito[] | null>(null);
    const [Descripcion, setDescripcion] = useState("");
    const [Nombre, setNombre] = useState("");
    const [IdRecurso, setIdRecurso] = useState("");
    const [Criterio_aceptacion, setCriterio_aceptacion] = useState("");
    const [Fecha_inicio, setFecha_inicio] = useState("");
    const [Fecha_fin, setFecha_fin] = useState("");
    const [IdEstado, setIdEstado] = useState(0);
    const [Recursos, setRecursos] = useState<Recurso[] | null>(null);

    const [IdHito, setIdHito] = useState(0);
    const [IdPrueba, setIdPrueba] = useState(0);



    const [Estados, setEstados] = useState<Estado[] | null>(null);
    const [pruebas, setPruebas] = useState<Prueba[] | null>(null);



    useEffect(() => {

        const fetchHitos = async () => {
          try {
            const res = await API<Hito[]>({}, "getDetalleHito/"+params.hitoId, "GET", false);
            if(res.result != null){
              setHitos(res.result);
            }
          } catch (error) {
            console.error("ERROR ", error);
          }

        };

        const fetchPruebas = async () => {
            try {
              const res = await API<Prueba[]>({}, "getPruebas/"+params.hitoId, "GET", false);
              if(res.result != null){
                setPruebas(res.result);
              }
            } catch (error) {
              console.error("ERROR ", error);
            }
          };

        const fetchRecursos = async () => {
        try {
            const res = await API<Recurso[]>({}, "getRecursosHito/"+params.hitoId, "GET", false);
            if(res.result != null){
            setRecursos(res.result);
            }
        } catch (error) {
            console.error("ERROR ", error);
        }
        };  
        
        fetchRecursos();
        fetchHitos();
        fetchPruebas();
      }, [params.hitoId]);    

    const [show, setShow] = useState(false);
    const [mostrar, setMostrar] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    
    const cerrar = () =>setMostrar(false);
    const abrir = (prueba: Prueba) =>{
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
        setNombre(prueba.Nombre);
        setDescripcion(prueba.Descripcion);
        setCriterio_aceptacion(prueba.Criterio_aceptacion);
        setFecha_fin(prueba.Fecha_fin);
        setFecha_inicio(prueba.Fecha_inicio);
        setIdPrueba(prueba.IdPrueba);
        setMostrar(true)
    };

    const updateHito = () =>{
        const editPrueba = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({ Nombre: Nombre,
                                                                            Descripcion: Descripcion, 
                                                                            Fecha_inicio: Fecha_inicio,
                                                                            Fecha_fin: Fecha_fin,                  
                                                                            IdRecurso: IdRecurso,             
                                                                            Criterio_aceptacion: Criterio_aceptacion,
                                                                            IdEstado: IdEstado,
                                                                            IdPrueba: IdPrueba},  
                                                                            "updatePrueba",
                                                                            "POST",
                                                                            false);              
                    if(res.result != null){
                        const res = await API<Prueba[]>({}, "getPruebas/"+params.hitoId, "GET", false);
                        if(res.result != null){
                        setPruebas(res.result);
                        }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Prueba modificada con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error", error);
            }
        }
        editPrueba();
        cerrar();
    }

    const agregarPrueba = ()=>{
        const addPrueba = async () =>{
            try{
                const res = await API<{mensaje: string, message: string}>({IdHito: params.hitoId, 
                                                                           Nombre: Nombre,
                                                                           Descripcion: Descripcion,
                                                                           
                                                                           Fecha_inicio: Fecha_inicio,
                                                                           Fecha_fin: Fecha_fin,
                                                                           IdRecurso: IdRecurso,
                                                                           Criterio_aceptacion: Criterio_aceptacion,
                                                                           IdEstado: 1
                                                                            },
                                                                           "createPrueba",
                                                                           "POST",
                                                                           false);
                
                if(res.result != null){
                    const res = await API<Prueba[]>({}, "getPruebas/"+params.hitoId, "GET", false);
                    if(res.result != null){
                        setPruebas(res.result);
                    }
                    MySwal.fire({
                        title: <strong>Correcto</strong>,
                        html: <i>Prueba agregada con exito</i>,
                        icon: "success",
                        timer: 2000
                    });
                }
            }catch(error){
                console.log("Error: ", error);
            }

        }
        addPrueba();
        handleClose();
    }

    return (
    <Container>
        <Row>
        <br></br>
            { hitos ? (hitos.map((hito) => (
                <div className="card" key={hito.IdProyecto}>
                    <h5 className="card-header"><strong>Proyecto: {hito.IdProyecto} - {hito.Nombre}</strong></h5>
                    <h5 className="card-header"><strong>Hito: {hito.IdHito}</strong></h5>
                    <div className="card-body">
                        <p>Descripción: <strong>{hito.Descripcion}</strong></p>
                        <p>Estado: <strong>{hito.Estado}</strong></p>
                        <p>Duración: De <strong>{hito.Fecha_inicio} a <strong>{hito.Fecha_Fin}</strong></strong></p>
                        <p>Porcentaje: <strong>{ hito.Porcentaje } %</strong><div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={ 100 }  style={{ width: hito.Porcentaje+"%" }}>{hito.Porcentaje}% </div>
                            </div>
                        </p>
                    </div>
                </div>
            ))):( 
                <p>Cargando.....</p>
            ) }

        </Row>
        <Row>
        <Col md="6">
            <br></br>
            <h2>Pruebas</h2>
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
                Nueva Prueba
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
                <th>Duración</th>
                <th>Estado</th>
                <th>Recurso</th>
                <th>Criterio Aceptación</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pruebas ? (pruebas.map((prueba) => (
                <tr key={prueba.IdPrueba}>
                    <td>{prueba.IdPrueba}</td>
                    <td>{prueba.Nombre}</td>
                    <td>{prueba.Descripcion}</td>
                    <td>De {prueba.Fecha_inicio} a {prueba.Fecha_fin}</td>
                    <td>{prueba.Estado}</td>
                    <td>{prueba.Recurso}</td>
                    <td>{prueba.Criterio_aceptacion}</td>
                    <td>
                        <div className="d-flex justify-content-center">
                            {/* Botón para Editar (Color Gris) */}
                            <Button
                            style={{ backgroundColor: "gray", borderColor: "gray" }}
                            className="me-2"
                            onClick={() => {abrir(prueba)}}
                            >
                            Editar
                            </Button>

                            {/* Botón para Eliminar (Color Azul Marino) */}
                            <a className="btn btn-primary" href={`/pages/proyectos/defectos/${prueba.IdPrueba}`} >Ver Defectos</a>
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
            <Modal.Title>Nuevo Set de Pruebas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Código Hito:</span>
                        <input className="form-control" disabled={true} value={params.hitoId}  aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text"/>
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
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" aria-label='Fecha Inicio' placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFecha_inicio(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" aria-label='Fecha Fin'  placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFecha_fin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Recurso:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdRecurso(event.target.value)
                        }}>

                            { Recursos ? (Recursos.map((recurso) => (
                                <option key={recurso.IdRecurso} value={recurso.IdRecurso}>{recurso.Nombre} - {recurso.Rol}</option>
                            ))):( 
                                <option value="0">Cargando.....</option>
                            ) }
                        </select>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Criterios de Aceptación:</span>
                        <textarea className="form-control" id="textArea" onChange={(event) => {
                            setCriterio_aceptacion(event.target.value)
                        }}></textarea>
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={agregarPrueba}>
                Grabar
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Set de Pruebas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="card-body">
                    <div className="input-group mb-3">
                        <span className='input-group-text' id="basic-addon1">Código Hito:</span>
                        <input className="form-control" disabled={true} value={params.hitoId}  aria-label='Nombre' placeholder='Nombre' aria-describedby='basic-addon1' type="text"/>
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
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
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
                        <span className='input-group-text' id="basic-addon1">Fecha Inicio:</span>
                        <input className="form-control" value={Fecha_inicio} aria-label='Fecha Inicio' placeholder="Fecha Inicio" aria-describedby='basic-addon1' type="date" onChange={(event) => {
                            setFecha_inicio(event.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Fecha Fin:</span>
                        <input className="form-control" value={Fecha_fin} aria-label='Fecha Fin'  placeholder="Fecha Fin" aria-describedby='basic-addon1' onChange={(event) => {
                            setFecha_fin(event.target.value)
                        }} type="date" />
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Recurso:</span>
                        <select className="form-select" aria-label="Default select example" onChange={(event) => {
                            setIdRecurso(event.target.value)
                        }}>

                            { Recursos ? (Recursos.map((recurso) => (
                                <option key={recurso.IdRecurso} value={recurso.IdRecurso}>{recurso.Nombre} - {recurso.Rol}</option>
                            ))):( 
                                <option value="0">Cargando.....</option>
                            ) }
                        </select>
                    </div>
                    <div className="input-group mb-3">  
                        <span className='input-group-text' id="basic-addon1">Criterios de Aceptación:</span>
                        <textarea className="form-control" value={Criterio_aceptacion} id="textArea" onChange={(event) => {
                            setCriterio_aceptacion(event.target.value)
                        }}></textarea>
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