import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { data } from '../data.js'
import Project from '../models/projectModel.js'

const projectRouter = express.Router ()

projectRouter.get ('/seed', expressAsyncHandler (async (req, res) => {
    await Project.deleteMany ({})
    const projects = await Project.insertMany (data.projects)

    res.send (projects)
}))

projectRouter.get ('/', expressAsyncHandler ( async (req, res) => {
    const projects = await Project.find ({})

    res.status (200).send (projects)
}))

projectRouter.post ('/', expressAsyncHandler (async (req, res) => {
    const {projectName, projectDeadline, projectResponsible, tasks} = req.body

    const createdProject = await Project.create ({projectName, projectDeadline, projectResponsible, tasks})

    res.status (201).send (createdProject)
}))

export default projectRouter