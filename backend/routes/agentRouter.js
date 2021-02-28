import express, { request, response } from 'express'
import {data} from '../data.js'
import Agent from '../models/agentModel.js'
import expressAsyncHandler from 'express-async-handler'

const agentRouter = express.Router ()

agentRouter.get ('/seed', expressAsyncHandler ( async (request, response) => {
    await Agent.deleteMany ({})
    const createdAgents = await Agent.insertMany (data.agents)

    response.send (createdAgents)
}))

agentRouter.get ('/', expressAsyncHandler (async (request, response) => {
    const agents = await Agent.find ({})

    response.send (agents)
}))

agentRouter.post ('/', expressAsyncHandler (async (request, response) => {
    const createdAgent = await Agent.insertMany (request.body)

    response.send (createdAgent)
}))

agentRouter.get ('/:id', expressAsyncHandler (async (request, response) => {
    const agent = await Agent.findById (request.params.id)

    if (agent) {
        response.send (agent)
    } else {
        response.status (404).send ({message : "Cet agent n'existe pas."})
    }
}))

agentRouter.delete ('/:id', expressAsyncHandler (async (request, response) => {
    const agent = await Agent.findById (request.params.id)

    if (agent) {
        Agent.deleteOne ({_id : request.params.id}, (err) => {
            if (err) {
                response.send ({message : "Agent non supprimé. Il y a eu une erreur."})
            }
        })
        response.send (agent)
    } else {
        response.status (404).send ({message : "Cet agent n'existe pas."})
    }
}))

export default agentRouter