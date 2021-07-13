const User = require("../models/user");



module.exports.signUp = async(req,res,next)=>{

    const user = await User.create(req.body)
    try {
      const token = await user.generateAuthToken()
      await user.save()
      
      res.status(201).send({ user, token })
    
    } catch (e) {
      res.status(500).send(e)
    }
}


module.exports.signIn = async(req,res,next)=>{
    console.log("enter signin",req.body.email)

    try {
        const {user} = await User.findByCredentials(req.body.email, req.body.password)
        console.log("user", user)
        if(!user){
          res.status(204).send({error: "Invalid credentials"})
          return
        }
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
      } catch (e) {
        res.status(500).send({error: "Server Error"})
      }

}

module.exports.signOut = async(req,res,next)=>{

    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
      } catch (e) {
        res.status(500).send()
      }
}


module.exports.signOutAll = async(req,res,next)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
      } catch (e) {
        res.status(500).send()
      }
}

module.exports.deleteUser = async (req,res,next)=>{


    try {
        await req.user.remove()
        res.status(200).send(req.user)
      } catch (e) {
        res.status(500).send()
      }
}