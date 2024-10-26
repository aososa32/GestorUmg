const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "databaseaoso.cp4cqsym8321.us-east-1.rds.amazonaws.com",
    user:"admin",
    password: "Conejito1992#.",
    database: "dbpyumggestor",
    insecureAuth : true

});

//Aca se realizo todo el crud para Recursos:
app.post("/create", (req, res) => {
    const Nombre = req.body.Nombre;
    const Rol = req.body.Rol;

    console.log("Nombre:", Nombre);
    console.log("Rol:", Rol);  // Verificar si el campo se recibe correctamente por error de prueba de la api

    db.query('INSERT INTO recurso(Nombre, Rol) VALUE(?,?)', [Nombre, Rol],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    mensaje: "Recurso registrado con éxito!"
                });
            }
        }
    );
});


app.post("/deleteRecurso", (req, res)=>{
    const IdRecurso = req.body.IdRecurso;
    console.log("IdRecurso recibido:", IdRecurso);  // Verificar si se recibe correctamente

    db.query("UPDATE recurso SET Estado = 'D' WHERE IdRecurso = ?", [IdRecurso],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Recurso eliminado con exito!"
                
                });
            }
        }
    );
});

app.post("/updateRecurso", (req, res)=>{
    const IdRecurso = req.body.IdRecurso;
    const Nombre = req.body.Nombre;
    const Rol = req.body.Rol;
    db.query("UPDATE recurso SET Nombre = ?, Rol = ? WHERE IdRecurso = ?", [Nombre, Rol, IdRecurso],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Recurso actualizado con exito!"
                
                });
            }
        }
    );
});

app.get("/getRecursos", (req, res)=>{
    db.query("SELECT * FROM recurso WHERE estado IS NULL",
        (err, result)=>{
            if(err){
                console.log(err);
            
            }else{
                res.send(result);
            }
        }
    );
});

//aca se realizo el crud para ESTADOS:


app.post("/createEstado", (req, res)=>{
    const NombreEstado = req.body.NombreEstado;

    db.query('INSERT INTO estado(NombreEstado) VALUE(?)', [NombreEstado],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Estado registrado con exito!"
                
                });
            }
        }
    );
});

app.post("/deleteEstado", (req, res)=>{
    const IdEstado = req.body.IdEstado;
    db.query("UPDATE estado SET Estado = 'D' WHERE IdEstado = ?", [IdEstado],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Estado eliminado con exito!"
                
                });
            }
        }
    );
});

app.post("/updateEstado", (req, res) => {
    const IdEstado = req.body.IdEstado;
    const NombreEstado = req.body.NombreEstado;
    const Estado = req.body.Estado;

   
    db.query("UPDATE Estado SET NombreEstado = ?, Estado = ? WHERE IdEstado = ?", [NombreEstado, Estado, IdEstado],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al actualizar el estado" });
            } else {
                res.json({
                    mensaje: "Estado actualizado con éxito!"
                });
            }
        }
    );
});

app.get("/getEstados", (req, res)=>{
    db.query("SELECT * FROM estado WHERE estado IS NULL",
   // db.query("SELECT * FROM estado", // Se obtienen todos los estados sin ningún filtro
        (err, result)=>{
            if(err){
                console.log(err);
                res.status(500).json({ mensaje: "Error al obtener los estados" });
            
            }else{
                res.json(result);
            }
        }
    );
});

/////////////////////////////////////////////////////////////////////////7

//aca se realizo el crud para PROYECTO:


app.post("/createProyecto", (req, res)=>{
    const NombrePy = req.body.NombrePy;
    const Porcentaje = req.body.Porcentaje;
    const PropietarioPy = req.body.PropietarioPy;
    const IdEstado = req.body.IdEstado;
    const Fecha_Inicio = req.body.Fecha_Inicio;
    const Fecha_Fin = req.body.Fecha_Fin;
    const Url = req.body.Url
    const descripcion = req.body.descripcion;
    db.query('INSERT INTO proyecto(NombrePy, Porcentaje, PropietarioPy, IdEstado, Fecha_Inicio, Fecha_Fin, Url, descripcion) VALUES(?,?,?,?,?,?,?,?)', 
        [NombrePy, Porcentaje, PropietarioPy, IdEstado, Fecha_Inicio, Fecha_Fin, Url, descripcion],
        (err, result)=>{
            if(err){
                console.log(err);
                res.status(500).json({ mensaje: "Error al Crear el proyecto" });
            }else{
                res.json({
                    mensaje: "Proyecto Creado con exito!"
                
                });
            }
        }
    );
});

app.delete("/deleteProyecto", (req, res) => {
    const IdProyecto = req.body.IdProyecto;

    // Cambié la tabla a 'proyecto'
    db.query("UPDATE proyecto SET Estado = 'D' WHERE IdProyecto = ?", [IdProyecto],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al eliminar el proyecto" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el proyecto
                    res.status(404).json({ mensaje: "Proyecto no encontrado" });
                } else {
                    res.json({
                        mensaje: "Proyecto eliminado con éxito!"
                    });
                }
            }
        }
    );
});


app.post("/updateProyecto", (req, res) => {
    const IdProyecto = req.body.IdProyecto; 
    const NombrePy = req.body.NombrePy;
    const Porcentaje = req.body.Porcentaje;
    const PropietarioPy = req.body.PropietarioPy;
    const IdEstado = req.body.IdEstado;
    const Fecha_Inicio = req.body.Fecha_Inicio;
    const Fecha_Fin = req.body.Fecha_Fin;
    const Url = req.body.Url;
    //const Estado = req.body.Estado;
    const descripcion = req.body.descripcion;

    db.query('UPDATE proyecto SET NombrePy = ?, Porcentaje = ?, PropietarioPy = ?, IdEstado = ?, Fecha_Inicio = ?, Fecha_Fin = ?, Url = ?, descripcion =? WHERE IdProyecto = ?', 
        [NombrePy, Porcentaje, PropietarioPy, IdEstado, Fecha_Inicio, Fecha_Fin, Url, descripcion, IdProyecto], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al actualizar el Proyecto" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el proyecto
                    res.status(404).json({ mensaje: "Proyecto no encontrado" });
                } else {
                    res.json({
                        mensaje: "Proyecto actualizado con éxito!"
                    });
                }
            }
        }
    );
});


app.get("/getProyectos", (req, res)=>{
    //db.query("SELECT proyecto.IdProyecto AS IdProyecto,	proyecto.NombrePy AS NombrePy, proyecto.PropietarioPy AS PropietarioPy, Estado.NombreEstado AS NombreEstado, proyecto.Fecha_Inicio As Fecha_Inicio, proyecto.Fecha_Fin AS Fecha_Fin, proyecto.Url AS Url, proyecto.descripcion AS descripcion, proyecto.IdEstado AS IdEstado, proyecto.Porcentaje AS Porcentaje FROM proyecto INNER JOIN estado ON estado.IdEstado = proyecto.IdEstado WHERE proyecto.Estado IS NULL ORDER BY IdProyecto DESC",
    db.query(`
        SELECT 
            proyecto.IdProyecto AS IdProyecto,
            proyecto.NombrePy AS NombrePy,
            proyecto.PropietarioPy AS PropietarioPy, 
            estado.NombreEstado AS NombreEstado,  
            proyecto.Fecha_Inicio AS Fecha_Inicio, 
            proyecto.Fecha_Fin AS Fecha_Fin, 
            proyecto.Url AS Url, 
            proyecto.descripcion AS descripcion, 
            proyecto.IdEstado AS IdEstado, 
            proyecto.Porcentaje AS Porcentaje
        FROM proyecto 
        INNER JOIN estado ON estado.IdEstado = proyecto.IdEstado 
        WHERE proyecto.Estado IS NULL 
        ORDER BY IdProyecto DESC
    `,
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/proyectos/getProyecto/:Id", (req, res)=>{
    const IdProyecto = req.params.Id;
    //db.query("SELECT proyecto.IdProyecto AS IdProyecto,	proyecto.NombrePy AS NombrePy, proyecto.Propietario AS Propietario, Estado.Nombre AS Estado, proyecto.Fecha_Inicio As Fecha_Inicio, proyecto.Fecha_Fin AS Fecha_Fin, proyecto.Url AS Url, proyecto.descripcion AS descripcion, proyecto.IdEstado AS IdEstado, proyecto.Porcentaje AS Porcentaje FROM proyecto INNER JOIN estado ON estado.IdEstado = proyecto.IdEstado WHERE proyecto.Estado IS NULL and proyecto.IdProyecto = ?",
    db.query(`
        SELECT 
            proyecto.IdProyecto AS IdProyecto, 
            proyecto.NombrePy AS NombrePy, 
            proyecto.PropietarioPy AS PropietarioPy,  -- Revisa que el campo esté correcto
            estado.NombreEstado AS Estado,  -- Obtener el nombre del estado
            proyecto.Fecha_Inicio AS Fecha_Inicio, 
            proyecto.Fecha_Fin AS Fecha_Fin, 
            proyecto.Url AS Url, 
            proyecto.descripcion AS descripcion, 
            proyecto.IdEstado AS IdEstado,  -- Relacionado con el estado
            proyecto.Porcentaje AS Porcentaje
        FROM proyecto 
        INNER JOIN estado ON estado.IdEstado = proyecto.IdEstado 
        WHERE proyecto.Estado IS NULL AND proyecto.IdProyecto = ?  -- Filtramos solo proyectos no eliminados
    `,
        [IdProyecto],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


///////////////////////////////////////////////

//aca se realizo el crud para HITOS:
app.get("/getHitos/:Id", (req, res)=>{
    const IdProyecto = req.params.Id;
    db.query("SELECT hito.IdHito As IdHito, hito.Descripcion As Descripcion, hito.Fecha_inicio As Fecha_inicio, hito.Fecha_Fin As Fecha_Fin, hito.Porcentaje As Porcentaje, hito.idEstado As idEstado, estado.NombreEstado As Estado FROM hito INNER JOIN estado on estado.IdEstado = hito.idEstado where hito.Estado is null and IdProyecto = ?;",[IdProyecto],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.post("/createHito", (req, res)=>{
    
    const Descripcion = req.body.Descripcion;
    const Fecha_inicio = req.body.Fecha_inicio;
    const Fecha_Fin = req.body.Fecha_Fin;
    const Porcentaje = req.body.Porcentaje;
    const IdProyecto = req.body.IdProyecto;
    const idEstado = req.body.idEstado;
    

    db.query('INSERT INTO hito(Descripcion, Fecha_inicio, Fecha_Fin, Porcentaje, IdProyecto, idEstado ) VALUE(?,?,?,?,?,?)', 
        [Descripcion, Fecha_inicio, Fecha_Fin, Porcentaje, IdProyecto, idEstado ],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Hito registrado con exito!"
                
                });
            }
        }
    );
});


app.post("/updateHito", (req, res)=>{
    const Descripcion = req.body.Descripcion;
    const Fecha_inicio = req.body.Fecha_inicio;
    const Fecha_Fin = req.body.Fecha_Fin;
    const Porcentaje = req.body.Porcentaje;
    const idEstado = req.body.idEstado;
    const IdHito = req.body.IdHito;

    db.query('UPDATE Hito SET Descripcion = ?, Fecha_inicio=?, Fecha_Fin=?, Porcentaje=?, idEstado=? WHERE IdHito = ?', 
        [Descripcion, Fecha_inicio, Fecha_Fin, Porcentaje, idEstado,  IdHito],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Hito registrado con exito!"
                
                });
            }
        }
    );
});


app.delete("/deleteHito", (req, res) => {
    const IdHito = req.body.IdHito;
    const IdProyecto = req.body.IdProyecto;

    
    db.query("UPDATE hito SET Estado = 'D' WHERE IdHito = ? and IdProyecto = ?", [IdHito, IdProyecto],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al eliminar el Hito" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el proyecto
                    res.status(404).json({ mensaje: "Hito no encontrado" });
                } else {
                    res.json({
                        mensaje: "Hito eliminado con éxito!"
                    });
                }
            }
        }
    );
});

///////////////////////////////////////////////
//aca se realizo lo relacionado a la asignacion de recursos:

app.get("/getProyectoRecurso/:Id", (req, res)=>{
    const IdProyecto = req.params.Id;
    db.query("SELECT recurso.IdRecurso as IdRecurso, recurso.Nombre as Nombre, recurso.Rol as Rol From proyecto_recurso INNER JOIN recurso ON proyecto_recurso.IdRecurso = recurso.IdRecurso WHERE proyecto_recurso.Estado is null and proyecto_recurso.IdProyecto = ?;",[IdProyecto],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.post("/createRecursoProyecto", (req, res)=>{
    const IdProyecto = req.body.IdProyecto;
    const IdRecurso = req.body.IdRecurso;

    db.query('INSERT INTO proyecto_recurso(IdProyecto, IdRecurso ) VALUE(?,? )', 
        [IdProyecto, IdRecurso],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Recurso agregado con exito!"
                
                });
            }
        }
    );
});

app.get("/getProyectoRecursoNoAsignado/:Id", (req, res)=>{
    const IdProyecto = req.params.Id;
    db.query("SELECT recurso.IdRecurso AS IdRecurso, recurso.Nombre AS Nombre, recurso.Rol As Rol FROM recurso WHERE IdRecurso NOT IN (SELECT IdRecurso FROM proyecto_recurso WHERE IdProyecto = ? and Estado IS NULL) AND (Estado IS NULL OR estado = '');",[IdProyecto],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

///////////////////////////////////////////////
//aca se realizo el crud para PRUEBAS:
app.get("/getDetalleHito/:id", (req, res)=>{
    const IdHito = req.params.id;
    db.query("SELECT proyecto.IdProyecto as IdProyecto, proyecto.NombrePy as NombrePy, hito.IdHito as IdHito, hito.Descripcion as Descripcion, hito.Fecha_inicio as Fecha_inicio, hito.Fecha_Fin as Fecha_Fin, estado.NombreEstado as NombreEstado, hito.Porcentaje as Porcentaje FROM hito INNER JOIN estado ON estado.IdEstado = hito.idEstado INNER JOIN proyecto ON proyecto.IdProyecto = hito.IdProyecto WHERE IdHito = ?;",[IdHito],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


app.get("/getPruebas/:id", (req, res) => {
    const IdHito = req.params.id; // Corregido para capturar el parámetro correctamente
    db.query(
        "SELECT prueba.IdPrueba AS IdPrueba, prueba.Nombre AS Nombre, prueba.Descripcion AS descripcion, estado.NombreEstado AS NombreEstado, Fecha_inicio AS Fecha_inicio, Fecha_fin AS Fecha_fin, CONCAT(recurso.Nombre, ' - ', recurso.Rol) AS recurso, prueba.Criterio_aceptacion AS Criterio FROM prueba INNER JOIN estado ON estado.IdEstado = prueba.IdEstado INNER JOIN recurso ON recurso.IdRecurso = prueba.IdRecurso WHERE prueba.IdHito = ?;",
        [IdHito],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener las pruebas."); // Respuesta de error
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/getRecursosHito/:id", (req, res)=>{
    const IdHito = req.params.id;
    db.query("SELECT recurso.IdRecurso as IdRecurso, recurso.Nombre as Nombre, recurso.Rol as Rol FROM hito INNER JOIN proyecto ON proyecto.IdProyecto = hito.IdProyecto INNER JOIN proyecto_recurso ON proyecto_recurso.IdProyecto = proyecto.IdProyecto INNER JOIN recurso ON recurso.IdRecurso = proyecto_recurso.IdRecurso WHERE hito.IdHito = ?;",[IdHito],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.post("/createPrueba", (req, res) => {
    
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Fecha_inicio = req.body.Fecha_inicio;
    const Fecha_fin = req.body.Fecha_fin;
    const IdRecurso = req.body.IdRecurso;
    const IdHito = req.body.IdHito;
    const Criterio_aceptacion = req.body.Criterio_aceptacion;
    const IdEstado = req.body.IdEstado;

    db.query('INSERT INTO prueba(Nombre, Descripcion, Fecha_inicio, Fecha_fin, IdRecurso, IdHito, Criterio_aceptacion, IdEstado) VALUES(?,?,?,?,?,?,?,?)', 
        [Nombre, Descripcion, Fecha_inicio, Fecha_fin, IdRecurso, IdHito,Criterio_aceptacion, IdEstado],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al Crear la Prueba" });
            } else {
                res.json({
                    mensaje: "Prueba Creada con éxito!"
                });
            }
        }
    );
});

app.delete("/deletePrueba", (req, res) => {
    const IdPrueba = req.body.IdPrueba;
    const IdHito = req.body.IdHito;

    
    db.query("UPDATE prueba SET Estado = 'D' WHERE IdPrueba = ? AND IdHito = ?", [IdPrueba, IdHito],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al eliminar la prueba" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el proyecto
                    res.status(404).json({ mensaje: "Prueba no encontrada" });
                } else {
                    res.json({
                        mensaje: "Prueba eliminada con éxito!"
                    });
                }
            }
        }
    );
});


app.post("/updatePrueba", (req, res) => {
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Fecha_inicio = req.body.Fecha_inicio;
    const Fecha_fin = req.body.Fecha_fin;
    const IdRecurso = req.body.IdRecurso;
    const Criterio_aceptacion = req.body.Criterio_aceptacion;
    const IdEstado = req.body.IdEstado;
    const IdPrueba = req.body.IdPrueba;

    db.query('UPDATE prueba SET Nombre = ?, Descripcion = ?, Fecha_inicio = ?, Fecha_fin = ?, IdRecurso = ?, Criterio_aceptacion = ?, IdEstado = ? WHERE IdPrueba = ? ', 
        [Nombre, Descripcion, Fecha_inicio, Fecha_fin, IdRecurso, Criterio_aceptacion, IdEstado, IdPrueba], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al actualizar la Prueba" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el hito
                    res.status(404).json({ mensaje: "Prueba no encontrada" });
                } else {
                    res.json({
                        mensaje: "Prueba actualizada con éxito!"
                    });
                }
            }
        }
    );
});




//aca se realizo el crud para DEFECTOS DE LAS PRUEBAS:
app.get("/getDefectosPrueba/:Id", (req, res)=>{
    const IdPrueba = req.params.Id;
    db.query("SELECT defecto.IdPrueba as IdPrueba, defecto.IdDefecto as IdDefecto, defecto.Nombre as Nombre, defecto.Descripcion as Descripcion, defecto.IdEstado as IdEstado, estado.NombreEstado as NombreEstado, defecto.Resolucion as Resolucion, defecto.IdRecurso as IdRecurso, CONCAT(recurso.Nombre, ' - ', recurso.Rol) as Recurso, defecto.Tiempo as Tiempo FROM defecto INNER JOIN prueba ON prueba.IdPrueba = defecto.IdPrueba INNER JOIN estado ON estado.IdEstado = defecto.IdEstado INNER JOIN recurso ON recurso.IdRecurso = defecto.IdRecurso WHERE defecto.Idprueba = ?;",[IdPrueba],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/getDetallePrueba/:Id", (req, res)=>{
    const IdPrueba = req.params.Id;
    db.query("SELECT proyecto.NombrePy as proyecto, hito.IdHito as IdHito, prueba.IdPrueba as IdPrueba, prueba.Nombre as Nombre, prueba.Descripcion as Descripcion, estado.NombreEstado as NombreEstado, prueba.Fecha_inicio as Fecha_inicio, prueba.Fecha_fin as Fecha_fin, CONCAT(recurso.Nombre, ' - ', recurso.Rol) as Recurso, prueba.Criterio_aceptacion as Criterio FROM prueba INNER JOIN hito ON hito.IdHito = prueba.IdHito INNER JOIN proyecto ON proyecto.IdProyecto = hito.IdProyecto INNER JOIN estado ON estado.IdEstado = prueba.IdEstado INNER JOIN recurso ON recurso.IdRecurso = prueba.IdRecurso WHERE IdPrueba = ?;",[IdPrueba],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/getRecursosPrueba/:Id", (req, res)=>{
    const IdPrueba = req.params.Id;
    db.query("SELECT recurso.IdRecurso as IdRecurso, recurso.Nombre as Nombre, recurso.Rol as Rol FROM prueba INNER JOIN hito ON hito.IdHito = prueba.IdHito INNER JOIN proyecto ON proyecto.IdProyecto = hito.IdProyecto INNER JOIN proyecto_recurso ON proyecto_recurso.IdProyecto = proyecto.IdProyecto INNER JOIN recurso ON recurso.IdRecurso = proyecto_recurso.IdRecurso WHERE prueba.IdPrueba = ?;",[IdPrueba],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.post("/createDefecto", (req, res) => {
    const IdPrueba = req.body.IdPrueba;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    //const Estatus = req.body.Estatus;
    //const Resolucion = req.body.Resolucion;
    const IdRecurso = req.body.IdRecurso;
    const IdEstado = req.body.IdEstado;
    //const Tiempo = req.body.Tiempo;
  

    db.query('INSERT INTO defecto(IdPrueba, Nombre, Descripcion, IdRecurso, IdEstado) VALUES(?,?,?,?,?)', 
        [IdPrueba, Nombre, Descripcion, IdRecurso, IdEstado],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al Crear el error" });
            } else {
                res.json({
                    mensaje: "Error Creado con éxito!"
                });
            }
        }
    );
});

app.post("/updateDefecto", (req, res) => {
     
    
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Resolucion = req.body.Resolucion;
    const IdRecurso = req.body.IdRecurso;
    const Tiempo = req.body.Tiempo;
    const IdEstado = req.body.IdEstado;
    const IdDefecto = req.body.IdDefecto;


    db.query('UPDATE defecto SET Nombre = ?, Descripcion=?, Resolucion=?, IdRecurso=?, Tiempo=?, IdEstado=?  WHERE IdDefecto = ?', 
        [Nombre, Descripcion, Resolucion, IdRecurso, Tiempo, IdEstado, IdDefecto],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    mensaje: "Defecto modificado con exito!"
                
                });
            }
        }
    );
});


app.delete("/deleteDefecto", (req, res) => {
    const IdDefecto = req.body.IdDefecto;
    

    
    db.query("UPDATE defecto SET Estado = 'D' WHERE IdDefecto = ?", [IdDefecto],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al eliminar el Defecto" });
            } else {
                if (result.affectedRows === 0) {
                    // Manejo del caso en que no se encontró el proyecto
                    res.status(404).json({ mensaje: "Defecto no encontrado" });
                } else {
                    res.json({
                        mensaje: "Defecto eliminado con éxito!"
                    });
                }
            }
        }
    );
});


/* ///////////////////////////////////////////////

// aca esta el CRUD para lo relacionado a la tabla Proyecto_Recurso

app.post("/createProyectoRecurso", (req, res) => {
    const { IdProyecto, IdRecurso } = req.body;
    
    db.query('INSERT INTO proyecto_recurso (IdProyecto, IdRecurso) VALUES (?, ?)', 
        [IdProyecto, IdRecurso], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al crear el recurso para el proyecto" });
            } else {
                res.json({ mensaje: "Recurso creado con éxito!" });
            }
        }
    );
});

app.get("/getProyectoRecursos", (req, res) => {
    const IdProyecto = req.query.IdProyecto;

    db.query('SELECT * FROM proyecto_recurso WHERE IdProyecto = ?', [IdProyecto], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: "Error al obtener los recursos del proyecto" });
        } else {
            res.send(result);
        }
    });
});

app.post("/updateProyectoRecurso", (req, res) => {
    const { IdProyecto, IdRecurso, Estado } = req.body;

    db.query('UPDATE proyecto_recurso SET Estado = ? WHERE IdProyecto = ? AND IdRecurso = ?', 
        [Estado, IdProyecto, IdRecurso], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al actualizar el recurso del proyecto" });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ mensaje: "Recurso no encontrado" });
                } else {
                    res.json({ mensaje: "Recurso actualizado con éxito!" });
                }
            }
        }
    );
});

app.delete("/deleteProyectoRecurso", (req, res) => {
    const { IdProyecto, IdRecurso } = req.body;

    db.query("UPDATE  proyecto_recurso SET Estado = 'D' WHERE IdProyecto = ? AND IdRecurso = ?", 
        [IdProyecto, IdRecurso], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ mensaje: "Error al eliminar el recurso del proyecto" });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ mensaje: "Recurso no encontrado" });
                } else {
                    res.json({ mensaje: "Recurso eliminado con éxito!" });
                }
            }
        }
    );
});
*/

////////////////////////////////////////////////////////

// TABLERO DASHBOARD
app.get("/getCountPruebas", (req, res)=>{
    db.query("SELECT COUNT(prueba.IdPrueba) AS value, estado.NombreEstado AS name FROM prueba INNER JOIN estado ON estado.IdEstado = prueba.IdEstado GROUP BY estado.NombreEstado;",
        (err, result)=>{
            if(err){
                console.log(err);
            
            }else{
                res.send(result);
            }
        }
    );

});

app.get("/getPorcentajeProyecto", (req, res)=>{
    db.query("SELECT proyecto.NombrePy as nombre, proyecto.Porcentaje as porcentaje FROM proyecto ;",
        (err, result)=>{
            if(err){
                console.log(err);
            
            }else{
                res.send(result);
            }
        }
    );

});

app.get("/getDefectosRecurso", (req, res)=>{
    db.query("SELECT COUNT(defecto.IdDefecto) AS cantidad_defecto, recurso.Nombre AS recurso FROM defecto INNER JOIN recurso ON defecto.IdRecurso = recurso.IdRecurso GROUP BY recurso.Nombre;",
        (err, result)=>{
            if(err){
                console.log(err);
            
            }else{
                res.send(result);
            }
        }
    );

});

app.get("/getEstadosProyectos", (req, res)=>{
    db.query("SELECT COUNT(proyecto.IdProyecto) as cantidad, estado.NombreEstado as estado FROM proyecto INNER JOIN estado ON estado.IdEstado = proyecto.IdEstado GROUP BY estado.NombreEstado;",
        (err, result)=>{
            if(err){
                console.log(err);
            
            }else{
                res.send(result);
            }
        }
    );

});


///////////////////////////////////////////////////////
/////////// LOGIN///////////////////////
app.post("/login", (req, res) => { 
    const user = req.body.username;
    const pass = req.body.password;

    if ((user === "admin" && pass === "admin") || (user === "usuario1" && pass === "Umg2024")) {
        res.json({
            token: "USUARIO AUTENTICADO",
            username: user
        });
    } else {
        res.status(401).json({
            message: "Usuario o contraseña incorrectos"
        });
    }
});



////////////////// server ////////////////////

app.listen(3000, ()=>{
    console.log("corriendo en el puerto 3001");
})