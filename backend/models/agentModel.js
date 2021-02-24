import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema ({
    name : {type : String, required : true},
    email : {type : String, required : true},
    birthday : {type : Date, required : true},
    sex : {type : String, required : true},
    photo : {type : String, required : true},
})

const Agent = mongoose.model ('Agent', agentSchema)

export default Agent