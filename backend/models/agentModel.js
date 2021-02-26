import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema ({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    birthday : {type : Date, required : true},
    nationality : {type : String, required : true},
    civilStatus : {type : String, required : true},
    skills : {type : String, required : false},
    sex : {type : String, required : true},
    photo : {type : String, required : true},
}, {
    timestamps : true
})

const Agent = mongoose.model ('Agent', agentSchema)

export default Agent