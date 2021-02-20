import express from 'express';
import config from "./config.js"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import userRoote from './rootes/userRoote.js'
import mongoose from 'mongoose'
dotenv.config();
const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error => console.log(error.reason))
const app = express();
//utilisation du middleware body-parser
app.use(bodyParser.json())
//--end of body-parser
app.use('/api/users',userRoote)
app.use((error, req, resp, next) => {
    resp.status(500).send({ message: error.message })
})
app.listen(8070,()=>{console.log("server run in the port http://localhost:8070")});