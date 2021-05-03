
const {Schema, model} = require("mongoose");

const UsuarioSchema= Schema({
    nombre:{
        type: String,
        required: [true, "es necesario completar este campo"]
    },
    correo:{
        type: String, 
        required: [true, "es necesario completar este campo"],
        unqiue: true
    },
    password:{
        type: String, 
        required: [true, "es necesario completar este campo"]
    },
    image:{
        type: String
    },
    role:{
        type: String, 
        required: [true, "es necesario completar este campo"],
        emun: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type: Boolean, 
        default: true
    },
    google:{
        type: Boolean, 
        default: false
    }
})

UsuarioSchema.methods.toJSON=function(){
    const {password, __v, ...usuario}= this.toObject();
    return usuario;
}


module.exports= model("Usuarios", UsuarioSchema)


//Cremos dentro de la carpeta modules un Schema, que será un objeto "Schema({})" con toda la info que queremos del user

//Cada propiedad del Schema es un objeto

//Si ponemos un claudator en "required", el segundo arguemnto será el mensaje en el caso de que no ocupemos dicho claudator

//El nombre del Schema irá en mayuscula

//Tenemos que guardar nuestro Schema como un modelo ==> model("usuarios", UsuarioSchema)

