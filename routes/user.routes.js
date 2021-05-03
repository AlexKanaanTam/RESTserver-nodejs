
//desestructuramos para pbteenr el Router de Express
const {Router}= require("express");
const { check } = require("express-validator");
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require("../controller/user.controller");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middleware/validar-campos");


//llamamos a la funcion con la constante router
const router = Router();


//pedir
router.get("/", usuarioGet ) //NO LLAMAR A LA FUNCION, se llama solo a la REFERENCIA esto esta formado por una ruta (this.app) y un controllador(callback)
//actualizar
router.put("/:id",[
    check("id", "No es un id válid").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos
],usuarioPut )
//crear
router.post("/",[
    check("nombre","el nombre no puede estar vacío").not().isEmpty(), // tiene que existir
    check("password","el password debe tener más de 6 caracteres").isLength({min:6}),
    check("correo","el correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    // check("role","el role no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(esRoleValido),
    validarCampos //EL MIDDLEWARE NO SE LLAMA COMO UNA FUNCION!!!!!!!
],usuarioPost )
//borrar
router.delete("/:id", [
    check("id", "No es un id válid").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete)


module.exports= router;


//Los parametros los añadimos directamente en la parte de ROUTES

//Los middlewares se ejecutan en la funcion como un segundo argumento, en el caso de que sean muchos usamos arrays

//Podemos usar distintos modelos en una misma route

//Cuando usemos el FindOne generalmente este va a compañado del async, await

//El CHECK y el VALIDATIONRESULT vienen directamente del express-validator