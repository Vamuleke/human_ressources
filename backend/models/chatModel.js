import mongoose from 'mongoose'
import moment from 'moment'
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
        type: String,
        default: moment().format('h:mm a')
    }
  })
const Chat = mongoose.model('messagecontent', chatSchema)

export default Chat
