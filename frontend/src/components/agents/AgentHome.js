import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAgentInfos } from '../../actions/agentActions'
import LoadingBox from '../LoadingBox'
import MessageBox from '../MessageBox'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactPaginate from 'react-paginate'

const AgentHome = () => {

    const agentInfos = useSelector(state => state.agentInfos)
    const { agent, loading, error } = agentInfos
    const dispatch = useDispatch()
    let n = 0
   
    const [pageNumber, setPageNumber] = useState(0)
    const agentsPerPage = 5
    const pagesVisited = pageNumber * agentsPerPage
    const pageCount = !loading && !error ? Math.ceil(agent.length / agentsPerPage) : ''
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    useEffect(() => {
        dispatch(getAgentInfos())
    }, [dispatch])

    const dispayAgents = loading ? <LoadingBox /> : error ? <MessageBox>Test</MessageBox> : agent.slice(pagesVisited, pagesVisited + agentsPerPage)
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
                                <a className="dropdown-item" href="#"><i className="fa fa-trash"></i> &nbsp;Supprimer</a>
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentHome