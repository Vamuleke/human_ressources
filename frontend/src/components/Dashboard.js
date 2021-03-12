import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import { getProjectInfos } from '../actions/projectActions'

const Dashboard = () => {
   
    const dispatch = useDispatch ()
    const projectInfos = useSelector (state => state.projectInfos)
    const {loading, error, project} = projectInfos

    useEffect (() => {
        dispatch (getProjectInfos ())
    }, [dispatch])

    const projectsOnHold = !loading && !error && project.filter (proj => proj.status === 'onHold')
    const projectsInProgress = !loading && !error && project.filter (proj => proj.status === 'inProgress')
    const projectsFinished = !loading && !error && project.filter (proj => proj.status === 'finished')
    const projectsDelivered = !loading && !error && project.filter (proj => proj.status === 'finished')

    console.log ("ON HOLD !!!", projectsOnHold.length)
    console.log ("IN PROGRESS !!!", projectsInProgress)
    console.log ("FINISHED !!!", projectsFinished)
    console.log ("DELIVERED !!!", projectsDelivered)

    return (
        <>
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Tableau de bord</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard