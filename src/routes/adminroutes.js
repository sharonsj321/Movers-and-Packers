const express=require('express')
const router=express.Router()
const {auth,adminOnly}=require('../middlewares/authMiddleware')
const { addUser, viewUser, listUser, updateUser, deleteUser } = require('../controllers/admincontroller')
// const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");


router.post('/adduser',auth,adminOnly,addUser)
router.get('/listusers',auth,adminOnly,listUser)
router.get('/viewuser/:id',auth,adminOnly,viewUser)
router.put('/updateuser/:id',auth,adminOnly,updateUser)
router.delete('/deleteuser/:id',auth,adminOnly,deleteUser)

// router.post("/manage", verifyToken, verifyRole(["admin"]), async (req, res) => {
//     res.json({ success: true, message: "Admin action successful" });
//   });
  


module.exports=router;