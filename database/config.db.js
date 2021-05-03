const mongoose = require("mongoose");


const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Base de datos online") //si se conecta la db llamamos al console.log

    } catch (error) {
        throw new Error ("Error al inicializar la base de datos")
    }



}

module.exports={
    dbConnection
}


//Como se trata de datos en la que nosotros no tenemos el control absoluto haremos un try/catch en nuestra
//funcion de connexion

//Pra comectar con ongoose debemos aportar nuestro link de variables de entorno y un OBJETO de configuraciones