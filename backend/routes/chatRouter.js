import express from 'express';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js'
const router = express.Router()
router.get('/', async (req, res) => {
        try {
          

            const allMessage = await Chat.find({})
            
            res.send(allMessage);
        }
        catch (err) {
            console.log("errr in getting private chat server side", err.message)

        }
    } )

router.post('/new', async (req, res) => {
        try {
            const {  sender, room,
                text,receiver } = req.body
            const newMessage = await new Chat({
              sender,
                room,
                text,
                receiver,
                createdAt: new Date()
            })
            await newMessage.save()
        }
        catch (err) {
            console.log("Error in post private chat", err.message)
        }
    })

router.get('/chat/newerChats/:receiverName', async (req, res, next) => {
        try {
            const { receiverName } = req.params
            const newChatsTemp = await Message.find({ senderName: receiverName })
            // if (newChatsTemp.length === 0) {
            //    return res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObjTemp = newChatsTemp.map(obj => {
                let filteredObjTemp = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObjTemp
            })
            let filteredListTemp = [...new Set(filteredObjTemp.map(JSON.stringify))].map(JSON.parse)

            // const { receiverName } = req.params
            const newChats = await Message.find({ receiverName })
            // if (newChats.length === 0) {
            //    return res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObj = newChats.map(obj => {
                let filteredObj = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObj
            })
            let filteredListPro = [...new Set(filteredObj.map(JSON.stringify))].map(JSON.parse)
            for (var i = 0; i < filteredListPro.length; i++) {
                for (var j = 0; j < filteredListTemp.length; j++) {
                    if (filteredListPro[i].senderName === filteredListTemp[j].receiverName) {
                        filteredListPro.splice(i, 1)

                    }
                }
            }
            res.status(200).json({ result: filteredListPro })
        }
        catch (err) {
            console.log("Error in getting different chats", err.message)
        }
    })
    
router.get('/chat/previousChats/:senderName', async (req, res, next) => {
        try {
            const { senderName } = req.params
            const newChats = await Message.find({ senderName })
            // if (newChats.length === 0) {
            //     res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObj = newChats.map(obj => {
                let filteredObj = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObj
            })
            var filteredList = [...new Set(filteredObj.map(JSON.stringify))].map(JSON.parse)
            console.log("filterdList",filteredList)
            res.status(200).json({ result: filteredList })
        }
        catch (err) {
            console.log("Error in getting previous chats", err.message)
        }
    })

export default router