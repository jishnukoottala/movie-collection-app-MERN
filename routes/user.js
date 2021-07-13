const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
const { signUp, signIn, signOut,signOutAll,deleteUser } = require("../controllers/user")


router.post("/", signUp);

router.post("/signin", signIn);

router.post("/signout",auth, signOut);


router.post("/signoutAll",auth, signOutAll);

router.delete("/me",auth,deleteUser)





module.exports= router;