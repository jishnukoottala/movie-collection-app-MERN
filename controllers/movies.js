const Movie = require("../models/movie");


exports.addMovie = async  (req,res, next)=>{
    try {
        
        const movieObj = req.body
        console.log("movie object ",movieObj)
        if(req.user.role!=="admin"){
          delete movieObj.isRecommended;
          delete movieObj.isTrending;
        }
    
        const movie = await Movie.create({...movieObj, owner: req.user._id});
      
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
            error: 'Server Error'+err.toString()
          });
        }
      }
}


exports.getMovies = async (req,res,next)=> {
    try {

      const isAdmin = req.user.role === "admin"
        const match = {}
        const sort = {}
        !isAdmin && await req.user
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

        const movies = isAdmin ? await Movie.find().populate({
          path:'owner',
          select:'name email',
          match,
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
          }
        }) : []

      const resultData = isAdmin ? movies:  req.user.movies;
      if(movies.length==0 && isAdmin){
        res.status(204).send({ data: [], success: true})
        return;
      }
      if(req.user.movies && req.user.movies.length==0 && !isAdmin){
        res.status(204).send({ data: [], success: true})
        return;
      }
      return res.status(200).send({ data: resultData, success: true});
        // const movies = await Movie.find();
    
        // return res.status(200).json({
        //   success: true,
        //   count: movies.length,
        //   data: movies
        // });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'+err.toString()
        });
      }
}

exports.getTrendingMovies = async (req,res,next) => {
  try {
   // const trendingMovies = await Movie.find().or([{ isTrending: true}, { isRecommended: true},{ isUpcoming: true}]).limit(3);
   const trendingMovies = await Movie.find({
     $or:[{ isTrending: true},{ isUpcoming: true}]
   }).limit(6);
    return res.status(200).json({
      success: true,
      data: trendingMovies
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'+err.toString()
    });
  }
}

exports.getMovie = async (req,res,next)=> {
    const _id = req.params.id
    const isAdmin = req.user.role === "admin"

    try {
       const movie = isAdmin ? await Movie.findOne({_id}).populate({
        path:'owner',
        select:'name email'
      }) :await Movie.findOne({_id,owner: req.user._id})
     
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