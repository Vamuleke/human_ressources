import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    // name:{type:String,required:true},
    // email:{type:String,required:true, unique:true, dropDups:true},
    // password:{type:String,required:true},
    // photo:{type:String,required:false},
    // isAdmin:{type:Boolean,required:false}
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    birthday : {type : Date, required : true},
    nationality : {type : String, required : true},
    civilStatus : {type : String, required : true},
    skills : { type : Array, default : []},
    sex : {type : String, required : true},
    photo : {type : String, required : false},
    address : {type : String, required : true},
    serviceTaking : {type : Date, required : true},
    baseSalary : {type : Number, required : true},
    fonction : {type : String, required : true},
    confidentiality : {type : Boolean, required : true, default : true},
    socialClub : {type : String, required : true},
    phone : {type : String, required : true},
    peopleToCall : { type : Array, default : []},
    eligibilityDate : {type : Date, required : true},
    isAdmin:{type:Boolean, required:true, default : false},
    password:{type:String, required:true, default : "1234"},
})

const userModel = mongoose.model("User",userSchema);
export default  userModel;