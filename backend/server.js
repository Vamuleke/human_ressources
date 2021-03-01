import express from 'express';
import config from "./config.js"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import userRoote from './routes/userRouter.js'
import adminRoute from './routes/adminRouter.js'
import mongoose from 'mongoose'
import agentRouter from './routes/agentRouter.js';
dotenv.config();
const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error => console.log(error.reason))
const app = express();
//utilisation du middleware body-parser
app.use(bodyParser.json({ limit: '50mb' }))
//--end of body-parser
app.use('/api/users',userRoote)
app.use('/api/admin/profile/create',adminRoute)
app.use('/api/agents',agentRouter)
app.use((error, req, resp, next) => {
    resp.status(500).send({ message: error.message })
})
app.listen(5000,()=>{console.log("server run in the port http://localhost:5000")});