const {response, request} = require("express");

const usuarioGet = (req=request, res=response)=> {

    const {alex, q, venesuela="tu madurito keloke"} = req.query;

    res.json({ 
        msg: "get API - controlador",
        alex,
        q,
        venesuela
    })
}

const usuarioPut = (req, res=response)=> {

    const {id}= req.params;

    res.json({ 
        msg: "put API - controlador",
        id
    })
}

const usuarioPost = (req, res=response)=> {

    const {nombre, edad} = req.body //podemos desestructurar el body
    res.json({ 
        msg: "post API - controlador",
        nombre, 
        edad
    })
}

const usuarioDelete = (req, res=response)=> {
    res.json({ 
        msg: "delete API - controlador"
    })
}



module.exports={
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}

//Cuando queremos poner queries quitamos el "/" y ponemos el interrogante "?"
//Las queries se separan entre si con el ampersant "&"