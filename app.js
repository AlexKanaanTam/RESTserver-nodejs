const Server = require("./models/Server")
require("dotenv").config() //el require del DOTENV siemrpe tiene que estar en la página inicial

const server= new Server()


server.listen()

