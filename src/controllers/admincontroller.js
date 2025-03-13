const User = require("../models/usermodel")
const bcrypt = require("bcryptjs")


exports.addUser = async (req, res) => {
    try {
        console.log(req.body)

        const { name, email, password, role } = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const newuser = new User({ name, email, password: hashedpassword, role, createdBy: req.user.id })
        console.log(newuser)

        await newuser.save()
        res.status(200).json({ message: "user added successfully" })

    } catch (error) {

        res.status(500).json({ message: "User creation failed", error: error.message })

    }
}

//view users

exports.viewUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user)
            return res.status(400).json({ message: "not found" })
        return res.status(200).json({ message: "success", user })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })

    }
}

//view listuser


exports.listUser = async (req, res) => {
    try {
        const user = await User.find()

        if (!user)
            return res.status(400).json({ message: "not found" })
        return res.status(200).json({ message: "success", user })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })

    }
}

//update user

exports.updateUser= async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!user)
            return res.status(404).json({ message: "user not found" })
        res.status({ message: "user updated successfully", user })


    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
   
    }
}

//DELETE USER

exports.deleteUser=async(req,res)=>{
    try {
        const user= await User.findByIdAndDelete(req.params.id);
        if(!user)
            return res.status(404).json({ message: "user not found" })
        res.status({ message: "user deleted successfully", user })

        
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })

    }
}