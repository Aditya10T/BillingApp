const express = require('express');
const app = express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const path=require("path")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

dotenv.config()

// Database connection
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

// Middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())

// Route imports
const user = require("./routes/userRoute");
const invoice = require('./routes/invoice');

app.use("/api/v1",user);
app.use("/api/invoice", invoice);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log("app is running on port "+PORT)
}) 