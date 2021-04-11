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
    const projects = await Project.find ({}).populate ('projectResponsible')

    res.status (200).send (projects)
}))

projectRouter.post ('/', expressAsyncHandler (async (req, res) => {
    const {projectName, projectDeadline, projectCreationDate, projectResponsible, tasks} = req.body

    const createdProject = await Project.create ({projectName, projectDeadline, projectCreationDate, projectResponsible, tasks})

    res.status (201).send (createdProject)
}))

// SUPPRESSION D'UN PROJET
projectRouter.delete ('/:id', expressAsyncHandler (async (req, res) => {
    const project = await Project.findById (req.params.id)

    if (project) {
        await Project.deleteOne ({_id : req.params.id}, (err) => {
            if (err) {
                response.send ({message : "Project non supprimé. Il y a eu une erreur."})
            }
        })
        res.send (project)
    } else {
        res.status (400).send ({message : "Ce project n'existe pas."})
    }
}))

// MISE A JOUR DU PROJET
projectRouter.put ('/:id', expressAsyncHandler (async (req, res) => {
    const project = await Project.findById (req.params.id)

    if (project) {
        await Project.updateOne ({_id : req.params.id}, req.body, (err, res) => {
            if (err) throw err
        })

        const updatedProject = await Project.findById (req.params.id)
        res.send (updatedProject)

    } else {
        res.status (404).send ({message : "Cet project n'existe pas."})
    }
}))

// AFFICHAGE D'UN SINGLE PROJECT
projectRouter.get ('/:id', expressAsyncHandler (async (req, res) => {
    const project = await Project.findById (req.params.id).populate ('projectResponsible')

    if (project) {
        res.send (project)
    } else {
        res.status (404).send ({message : "Ce projet n'existe pas."})
    }
}))

// projectRouter.get ('/:status', expressAsyncHandler (async (req, res) => {
//     const project = await Project.find ({status : req.params.status}).populate ('projectResponsible')

//     if (project.length > 0) {
//         res.status (200).send (project)
//     } else {
//         res.status (404).send ({message : "Aucun project n'a ce statut."})
//     }
// }))

export default projectRouter