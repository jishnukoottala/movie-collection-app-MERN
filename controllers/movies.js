const Movie = require("../models/movie");


exports.addMovie = async  (req,res, next)=>{
    try {
        const { title, releasedYear,review,rating,coverImage, genre } = req.body;
        console.log("title",title)
    
        const movie = await Movie.create({...req.body, owner: req.user._id});
      
        return res.status(201).json({
          success: true,
          data: movie
        }); 
      } catch (err) {
        if(err.name === 'ValidationError') {
          const messages = Object.values(err.errors).map(val => val.message);
    
          return res.status(400).json({
            success: false,
            error: messages
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
        }
      }
}


exports.getMovies = async (req,res,next)=> {
    try {

        const match = {}
        const sort = {}
        await req.user
        .populate({
          path: 'movies',
          match,
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
          }
        })
        .execPopulate()
      res.status(200).send({ data: req.user.movies, success: true})
        // const movies = await Movie.find();
    
        // return res.status(200).json({
        //   success: true,
        //   count: movies.length,
        //   data: movies
        // });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
}

exports.getMovie = async (req,res,next)=> {
    const _id = req.params.id
    console.log("inside get movie  -",_id)
    debugger

    try {
       const movie = await Movie.findOne({_id,owner: req.user._id})
     
      if (!movie) {
        return res.status(404).send()
      }
      res.status(200).json({
          success:true,
          data:movie
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        error: 'Server Error'+e.toString()
      })
    }
}


exports.updateMovie = async (req,res,next)=> {
    const updates = Object.keys(req.body)
  try {
    
    const movie = await Movie.findOne({_id:req.params.id,owner: req.user._id})
    if (!movie) {
      res.status(404).send()
    }
    updates.forEach(update => (movie[update] = req.body[update]))
    await movie.save()
  

    res.status(200).json({
        success:true,
        data:movie
    })
  } catch (e) {
    res.status(500).json({
        success: false,
        error: 'Server Error'+e.toString()
      })
  }
}


exports.deleteMovie = async (req,res,next)=> {
    try{
        const movie = await Movie.findOneAndDelete({_id:req.params.id,owner: req.user._id});
        if(!movie){
            return res.status(401).json({
                success:false,
                error:"No movie found"
            })

        }
        movie.remove()

        return res.status(200).json({
            success:true,
            data:[]
        })
    }catch(err){

        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}