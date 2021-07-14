const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Movie = require('./movie')

/** ----User Schema --------- */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7
  },
  role:{
    type:String,
    default:"user"
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
})

// Virtual relationship
userSchema.virtual('movies', {
  ref: 'Movie',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject
}

// accessign single user method
userSchema.methods.generateAuthToken = async function () {
  const user = this
  // generate a json web token
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET,{ expiresIn: "1d"})
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// user schema .statics for the whole collection
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    return {
      user: null,
      message:"Credentials not matching"
    }
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
   return {
     user: null,
     message:"Credentials not matching"
   }
  }

  return {user}
}

/** ------Middlewares ---------- */
userSchema.pre('save', async function (next) {
  const user = this
  // Hash the password here ---

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next() // to process the next that is save user here
})

// --- Delete user tasks whrn user is removed

userSchema.pre('remove', async function (next) {
  const user = this
  await Movie.deleteMany({
    owner: user._id
  })

  next()
})

/** ----- USER MODEL ----- */
const User = mongoose.model('User', userSchema)

module.exports = User

