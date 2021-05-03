const {Schema, model} = require("mongoose");

const RoleSchema= Schema({
    role:{
        type: String, 
        required: [true, "este campo es obligatorio"]
    }

})



module.exports= model("Role", RoleSchema)