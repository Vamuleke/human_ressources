import mongoose from 'mongoose'
const chatSchema = new mongoose.Schema(
  {
  text: {
        type: String
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  })
const Chat = mongoose.model('messagecontent', chatSchema)

export default Chat
