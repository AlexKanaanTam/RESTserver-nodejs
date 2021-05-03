const express = require("express");
const  cors = require('cors');
const { dbConnection } = require("../database/config.db");


class Server {
    
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath= "/api/usuarios"

        //Conectar a la base de datos
        this.conectarDB();

        //Middleware
        this.middleware();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    routes(){
        // this.app.use("*", require("../routes/error.routes"))
        this.app.use(this.usuariosPath, require("../routes/user.routes"))
    }
    middleware(){
        //Lectura y parseo del Body
        this.app.use(express.json())
        //CORS
        this.app.use(cors())
        //Directorio público
        this.app.use(express.static("public"))
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Corriendo en el puerto", this.port)
        })
    }
}



module.exports= Server;


//En el contrsuctor definimos las propiedades de nuestra clase

//Cuando se llame al constructor queremos que tambien se llame a las rutas

//En la funcion routes ponemos "this.app" siempre que hagamos referencia a las propiedades de la clase

//El listen no lo ponemos como constructor

//Orden importancia dependencias: Paquetes locales, paquetes externos, paquetes creados usuario

//tenemos que llamar a la clase fuera del file, debemos que llamar a la clase o instancia fuera del servidor

//Middleware: funciones que le van a añadir funcionalidad a mi webserver

//Las instancias se llaman con la palabra "NEW"