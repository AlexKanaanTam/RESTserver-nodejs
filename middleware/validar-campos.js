const { validationResult } = require("express-validator");

const validarCampos= (req, res, next)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()

}

module.exports={
    validarCampos
}












//vamos a crear en este file middlewares personalizados
//vamos a crear un middleware especializado en validar estos campos

//El next() nos dice que si todo esta correcto entonces sigue con el siguiente middleware o directamenre el controlador