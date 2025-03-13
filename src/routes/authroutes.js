const express=require('express')
const router=express.Router()
const {register,login,logout}=require('../controllers/authcontroller')
const { signup, signin } = require("../controllers/authcontroller");
router.post('/register',register)         //register cheyunnath controller vechanu, so auth controller create cheyuka
router.post('/login',login)
router.post("/logout",logout);

router.post("/signup", signup);
router.post("/signin", signin);

module.exports=router;