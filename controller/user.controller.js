const {response, request} = require("express");
//vamos a importar nuestro modelo, ponemos "U" mayuscula porque nos va a permitir crear instancias de mi modelo
const Usuario= require("../models/usuario")
const bcryptjs = require("bcryptjs");



const usuarioGet = (req=request, res=response)=> {

    // const {alex, q, venesuela="tu madurito keloke"} = req.query;
    // #1 aplicamos el metoo "FIND" para encontrar todos los usuarios

    const {limite=5, desde=0}= req.query //los queries vienen definidos en "strings" por lo que habra que pasarlo a number
    const query= {estado: true}

    //para optimizar el tiempo de respuesta crearemos un array de respuestas mediante Promise.all
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))//ponemos un limite al numero de usuarios
        .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuarioPut = async(req, res=response)=> {
    //#0 desestructura el id con req.params
    const {id}= req.params;
    //#1 seleccionar las variables de nuestro req.body con las que queremos trabajar
    const {_id, password, google, correo, ...resto}=req.body //desestructuramos lo que no vamos a necesitar

    //Validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    //los middlwares se deben aplicar en cada controlador
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({ 
        usuario
    })
}

const usuarioPost = async(req, res=response)=> {
    //#1 seleccionar mediante desestructuracion las variables con las que queremos trabajar
    const {nombre, correo, password, role} = req.body //podemos desestructurar el body
    //#crear una instancia de nuestro ususario
    const usuario = new Usuario({nombre, correo, password, role}) //obtenemos un objeto de los campos deseados. Creamos una nueva instancia para Usuario

    //verificar si el correo existe (usamos el await para que espere a verifcar si existe otro igual
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save()

    res.json({ 
        usuario
    })
}

const usuarioDelete = async(req, res=response)=> {
    
    const {id} = req.params

    //Fisicamente lo borramos (no es recomendable)
    // const usuario= await Usuario.findByIdAndDelete(id);

    //Forma recomendada de borrar usuario
    const usuarios= await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json(usuarios)
}



module.exports={
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}

//Cuando queremos poner queries quitamos el "/" y ponemos el interrogante "?"
//Las queries se separan entre si con el ampersant "&"

//Si a nuestra nueva instancia "new Usuario(body)" le ponemos valores que no existen en el SCHEMA, este los rechazara

//Para guardar los datos en las bases de datos debemos hacer los siguientes: 
        //body= re.body
        // usuario= new Usuario(body)
        //usuario.save()

//Sacaremos del body.req los campos que nos interesa, en el caso de que fuesen muchos podemos hacer {google, ...rest}
//siendo "rest" los campos que queremos y "google" el que no queremos

//nostros no deberiamos retornar la password en nuestra base de datos

//Para verificar usaremos el await (porque esperamos una respuesta de si el correo existe, uan vez lo tenga,os pasamos a la siguiente)
//Usaremos el findOne para determinar si hay un correo que sea el mismo que el correo posteado

//El Middleware es una funcion que se ejecuta antes de que se ejecuten nuestros controladores

//express-validator es un paquete de Middlewares que nos permite validar todos los controladores

//dentro del controlador POST vamos a hacer el validation

//Añadimos queries con un "?"
    //Para que sean a partir del 5 pondremos "desde=5"
    //Para poner un limite ponemos "limite=5"

//entre query y query ponemos un ampersant "&"

//dentro de los find, findOne, findById podemos incluir condiciones. Las condiciones se incluyen como objetos

//Usaremos "PROMISE.ALL" para que se ejecuten las dos promesas conjuntamente (hay que poner await antes de Promise.all)
//Si falla una, fallan todas

//Para que el GET no se vea como un array de Pormesas y sea menos visible, podemos hacer una desestructuracion de arrays 

//En el "findByIdandUpdate()" podemos definir en el segundo argumento que valor queremos cambiar y por cual valor
//findByIdandUpdate(id, {estado:false})