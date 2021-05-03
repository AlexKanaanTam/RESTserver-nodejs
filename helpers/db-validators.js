const Role= require("../models/role");
const Usuario= require("../models/usuario")

const esRoleValido= async(role= "")=>{
    const existRole= await Role.findOne({role})
    if(!existRole){
        throw new Error("este role no está disponible")
    }
}

const emailExiste= async(correo="", res)=>{
    const existsEmail = await Usuario.findOne({correo})
    if(existsEmail){
        throw new Error("correo usado con anterioridad")
    }
}

const existeUsuarioPorId= async(id= "")=>{
    const existId= await Usuario.findById({id})
    if(!existeUsuarioPorId){
        throw new Error("este id no está disponible")
    }
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}

//En las Costum validations en vez de "res.status(404)" deberemos retornar un "throw new error"

//El "THROW NEW ERROR" se usa sin el RETURN

