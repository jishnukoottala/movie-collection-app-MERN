const express = require("express");
const router = express.Router();
//const auth = require("../middlewares/auth");
const {  getTrendingMovies } = require("../controllers/movies");




router.get("/",getTrendingMovies);




module.exports= router;