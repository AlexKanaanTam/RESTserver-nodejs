const {response}= require("express")

const getError=(req, res = response)=>{
    res.json("Error 404, chinga tu madre")
}


module.exports= getError;