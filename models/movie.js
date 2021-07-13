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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }


},{
    timestamps:true
})


module.exports = mongoose.model('Movie',movieSchema)