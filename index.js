require('dotenv').config()  //applistening
const cors = require("cors");
const express=require('express')
const connectDb=require('./src/config/Db')
const authroute=require('./src/routes/authroutes')
const adminroute=require('./src/routes/adminroutes')
const serviceRoutes = require("./src/routes/serviceRoutes");
const bookingRoutes = require("./src/routes/bookingroutes");
// const paymentRoutes = require("./src/routes/paymentroutes");
// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });


const app=express()
connectDb()

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use(express.json());
app.use(cors());



app.use('/api/auth',authroute)       //  /api/auth ennu vannal auth routine vilikan parayunnu
app.use('/api/admin',adminroute)

// app.use("/api/payment", paymentRoutes);


// Import and use service routes
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
// const vehicleRoutes = require("./src/routes/vehicleRoutes"); // Matches actual file name
// app.use("/api/vehicles", vehicleRoutes);





port=process.env.PORT
console.log(port)

app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
    
})
