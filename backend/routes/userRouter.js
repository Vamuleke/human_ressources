import express from "express";
import User from "../models/userModel.js";
import { getToken, isAuth } from "../util.js";
import expressAsyncHandler from 'express-async-handler'
const router = express.Router();
router.get("/profile", async (req,resp)=>{
  const users= await User.find({});
  resp.send(users)
  })
  router.post('/signin',expressAsyncHandler(async (req,resp)=>{
  const signinUser = await User.findOne({
    email : req.body.email,
    password : req.body.password
  })
  if(signinUser){
resp.send({
  _id:signinUser.id,
  name:signinUser.name,
  email:signinUser.email,
  password:signinUser.password,
  photo:signinUser.photo,
  isAdmin:signinUser.isAdmin,
  token:getToken(signinUser)
})
  }else{
          resp.status(401).send({message:"nom d'utilisateur ou mot de passe incorrect"})
  }
}))
router.post('/register',expressAsyncHandler(async (req,resp)=>{
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    resp.status(401).send({message:"Email existe deja Veuillez vous connecter ou entrer un autres adresse Email"});
  }else{
  const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    photo:req.body.photo,
    isAdmin:req.body.isAdmin
  
  });
const newUser = await user.save();
  if(newUser){
resp.send({
  _id:newUser.id,
  name:newUser.name,
  email:newUser.email,
  password:newUser.password,
  photo:newUser.photo,
  isAdmin:newUser.isAdmin,
  token:getToken(newUser)
})
  }else{
          resp.status(401).send({message:"invalid user data"})
  }
}})
)
//


router.put('/profile/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.newpassword || user.password;
    user.photo = req.body.photo || user.photo;
    console.log(req.body.password)
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      photo: updatedUser.photo,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "l'utilisateur n'existe pas !" });
  }
});


router.get('/profile/:id',expressAsyncHandler(async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id })
  if (user) {
    resp.send(user)
  } else {
    resp.status(404).send({ message: 'Erreur ' })
  }
})
)


export default router