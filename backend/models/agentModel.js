import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema ({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    birthday : {type : Date, required : true},
    nationality : {type : String, required : true},
    civilStatus : {type : String, required : true},
    skills : { type : Array, default : []},
    sex : {type : String, required : true},
    photo : {type : String, required : true},
    address : {type : String, required : true},
    serviceTaking : {type : Date, required : true},
    baseSalary : {type : Number, required : true},
    fonction : {type : String, required : true},
    confidentiality : {type : Boolean, required : true, default : true},
    socialClub : {type : String, required : true},
    phone : {type : String, required : true},
    peopleToCall : { type : Array, default : []},
    eligibilityDate : {type : Date, required : true},
}, {
    timestamps : true
})

const Agent = mongoose.model ('Agent', agentSchema)

export default Agent