
const {Router}= require("express");
const getError = require("../controller/error.controller");

const router= Router();

router.get("/", getError)


module.exports= getError