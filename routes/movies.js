const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { addMovie, getMovies, deleteMovie, updateMovie, getMovie } = require("../controllers/movies");


router.post("/", auth,addMovie);

router.get("/",auth, getMovies);

router.get("/:id", auth,getMovie);


router.delete("/:id", auth,deleteMovie);

router.patch("/:id",auth, updateMovie)


module.exports= router;