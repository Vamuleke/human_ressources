import express from 'express'
import config from './config.js'
import dotenv from 'dotenv'
import userRoote from './routes/userRouter.js'
import cors from 'cors'
import mongoose from 'mongoose'
import agentRouter from './routes/agentRouter.js'
import projectRouter from './routes/projectRouter.js'
import routerChat from './routes/chatRouter.js'

import  http  from "http"
import {Server} from 'socket.io';
dotenv.config()

const mongodbUrl = config.MONGODB_URL
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(error => console.log(error.reason))

//pusher
const app = express()
const server = http.createServer(app);
const io = new Server(server);



//utilisation du middleware body-parser
app.use(express.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: false 
}));

app.use(express.json({
  limit: '5mb'
}));
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

io.on('connection', socket => {
    // socket.on('join room', ({room}) => {
    //     socket.join(room)
    // })
  //   console.log("Server runing in well")
  //   socket.on("private message", (message) => {
  //       io.to(message.room).emit('new Message', {
  //           message: message.message,
  //           sender: message.sender
  //       });
  //  })
    console.log("the ws has connected")
    socket.on('disconnect',  ()=> {
      io.emit('message','disconnected')
    })
 
})

//--end of body-parser
app.get('/', (req, resp) => resp.send('server run !!!'))
app.use('/api/users', userRoote)
app.use('/api/agents', agentRouter)
app.use('/api/projects', projectRouter)
app.use('/api/chat', routerChat)
app.use((error, req, resp, next) => {
  resp.status(500).send({ message: error.message })
})
server.listen(8095, () =>
  console.log('Server runs on port : http://localhost:8095')
)
