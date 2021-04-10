import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true, dropDups:true},
    password:{type:String,required:true},
    photo:{type:String,required:false},
    isAdmin:{type:Boolean,required:false}
})
const userModel = mongoose.model("User",userSchema);
export default  userModel;