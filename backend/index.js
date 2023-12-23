const express = require('express');
const app = express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const path=require("path")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// Route imports
const user = require("./routes/userRoute");
const invoice = require('./routes/invoice');

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
const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../frontend/dist")
app.use(express.static(buildpath));
app.use(cors({origin:"http://localhost:8800",credentials:true}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/v1",user);
app.use("/api/invoice", invoice);
app.get("/*",function(req,res){
    res.sendFile(
        path.join(__dirname,"../frontend/dist/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    );
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log("app is running on port "+PORT)
}) 