import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAgent, getAgentInfos } from '../../actions/agentActions'
import LoadingBox from '../LoadingBox'
import MessageBox from '../MessageBox'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const AgentHome = (props) => {

    const agentInfos = useSelector(state => state.agentInfos)
    const { agent, loading, error } = agentInfos
    const dispatch = useDispatch()
    let n = 0

    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const agentsPerPage = 5
    const pagesVisited = pageNumber * agentsPerPage
    const pageCount = !loading && !error && agent && Math.ceil(agent.length / agentsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    // SUPPRESSION DE L'AGENT
    const agentDelete = (agentId, agentName) => {

        if (window.confirm(`Voulez-vraiment supprimer l'agent ${agentName} ?`)) {
            dispatch(deleteAgent(agentId))
            toast.success(`Agent ${agentName} supprimé avec succès`, { position: toast.POSITION.BOTTOM_RIGHT });
            //dispatch(getAgentInfos())

            //props.history.replace ("/admin/agents")
        }

    }

    useEffect(() => {
        dispatch(getAgentInfos())
    }, [dispatch])

    console.log("AGENT :", typeof agent)

    const dispayAgents = loading ? <LoadingBox /> : error ? <MessageBox type="danger">{error}</MessageBox> : agent.slice(pagesVisited, pagesVisited + agentsPerPage)
        .map(ag => {

            return (
                <tr key={ag._id}>
                    <th scope="row">{++n}</th>
                    <td><img src={ag.photo} width="35" height="30" /></td>
                    <td>{ag.name}</td>
                    <td>{ag.email}</td>
                    <td>{moment(ag.birthday).format("DD-MM-YYYY")}</td>
                    <td>{ag.nationality}</td>
                    <td>{ag.civilStatus}</td>
                    <td>{ag.sex == 'M' ? "Masculin" : "Féminin"}</td>
                    <td>
                        <div className="dropup">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div className="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                                <Link to={`/admin/agents/${ag._id}`} className="dropdown-item"><i className="fa fa-info"></i> &nbsp;&nbsp;&nbsp;&nbsp;Détails</Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="fa fa-edit"></i> &nbsp;Modifier</a>
                                <div className="dropdown-divider"></div>
                                {/* <a className="dropdown-item" href="#delete" onClick={
                                    
                                    (e) => {
                                        e.preventDefault ();
                                        window.confirm (`Voulez-vraiment supprimer l'agent ${ag.name} ?`) && dispatch (deleteAgent (ag._id))
                                        toast.success (`Agent ${ag.name} supprimé avec succès`, {position : toast.POSITION.BOTTOM_RIGHT})
                                        // props.history.push ('/admin/dashboard')
                                        //window.location.href = "/admin/agents"
                                        test = true
                                    }
                                    
                                }>
                                <i className="fa fa-trash"></i> &nbsp;Supprimer</a> */}
                                <a className="dropdown-item" href="#delete" onClick={() => agentDelete(ag._id, ag.name)}><i className="fa fa-trash"></i> &nbsp;Supprimer</a>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })


    return (
        <>
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">

                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="row py-2">
                                    <div className="col-md-6 mt-1">
                                        <span className="font-weight-light h3">Liste des agents</span>
                                    </div>

                                    <div className="col-md-6 text-right mt-1">
                                        <Link className="btn btn-primary" to="agents/create"><i className="fa fa-plus"></i> &nbsp;Créer un nouvel agent</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {
                                    !loading && !error && agent.length !== 0 ? (
                                        <>
                                            <table id="" className="table text-nowrap table-striped table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Photo</th>
                                                        <th scope="col">Nom(s)</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Date de naissance</th>
                                                        <th scope="col">Nationalité</th>
                                                        <th scope="col">État civil</th>
                                                        <th scope="col">Sexe</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dispayAgents}
                                                </tbody>
                                            </table>
                                            <div className="text-right">
                                                <ReactPaginate
                                                    previousLabel="Précédent"
                                                    nextLabel="Suivant"
                                                    pageCount={pageCount}
                                                    onPageChange={changePage}
                                                    containerClassName="pagination"
                                                    previousClassName="page-link"
                                                    nextClassName="page-link"
                                                    activeClassName="font-weight-bold"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <h3 className="text-center font-weight-lighter">Aucune donnée à afficher.</h3>
                                    )
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentHome