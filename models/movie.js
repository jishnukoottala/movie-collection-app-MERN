const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true
    },
    releasedYear:{
        type: Number,
        
    },
    rating:{
        type:Number
    },
    review:{
        type:String
    },
    coverImage:{
        type:String
    },
    genre:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    director:{
        type:String
    },
    musicDirector:{
        type: String
    },
    cinematography:{
        type:String
    },
    language:{
        type:String
    },
    availableIn:[String],
    isTrending:{
        type:Boolean,
        default:false,
    },
    isRecommended:{
        type:Boolean,
        default:false,
    },
    isUpcoming:{
        type:Boolean,
        default:false,
    },
    trailerUrl:{
        type:String
    },
    isClassic:{
        type:Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }


},{
    timestamps:true
})


module.exports = mongoose.model('Movie',movieSchema)