
//desestructuramos para pbteenr el Router de Express
const {Router}= require("express");
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require("../controller/user.controller");

//llamamos a la funcion con la constante router
const router = Router();


//pedir
router.get("/", usuarioGet ) //NO LLAMAR A LA FUNCION, se llama solo a la REFERENCIA esto esta formado por una ruta (this.app) y un controllador(callback)
//actualizar
router.put("/:id", usuarioPut )
//crear
router.post("/",usuarioPost )
//borrar
router.delete("/", usuarioDelete)


module.exports= router;


//Los parametros los añadimos directamente en la parte de ROUTES