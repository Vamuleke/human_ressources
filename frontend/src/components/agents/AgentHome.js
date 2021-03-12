import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAgent, getAgentInfos } from "../../actions/agentActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgentUpdateModal from "./AgentUpdateModal";
import DataTable from "react-data-table-component";

toast.configure();

const AgentHome = (props) => {
  const agentInfos = useSelector((state) => state.agentInfos);
  const { agent, loading, error } = agentInfos;
  const dispatch = useDispatch();

  // ON CONSTUIT LES COLONNES POUR LE DATATABLE
  const columns = useMemo(
    () => [
      {
        name: <h4>#</h4>,
        selector: (row, index) => {
          return <span>{index + 1}</span>;
        },
        sortable: true,
      },
      {
        name: <h4>Photo</h4>,
        selector: (row, index) => {
          return <img src={row.photo} width="35" height="30" alt="" />;
        },
        sortable: false,
      },
      {
        name: <h4>Nom(s)</h4>,
        selector: (row, index) => {
          return <h5>{row.name}</h5>;
        },
        sortable: true,
      },
      {
        name: <h4>Email</h4>,
        selector: (row, index) => {
          return <h5>{row.email}</h5>;
        },
        sortable: true,
      },
      {
        name: <h4>Naissance</h4>,
        selector: (row, index) => {
          return <h5>{moment(row.birthday).format("DD-MM-YYYY")}</h5>;
        },
        sortable: true,
      },
      {
        name: <h4>Sexe</h4>,
        selector: (row, index) => {
          return <h5>{row.sex}</h5>;
        },
        sortable: true,
      },
      {
        name: <h4>Actions</h4>,
        cell: (row, index) => {
          return (
            <>
              <Link
                to={`/admin/agents/${row._id}`}
                className="dropdown-item text-secondary"
                data-toggle="tooltip"
                data-placement="left"
                title="Détails"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to="#update"
                className="dropdown-item text-primary"
                data-toggle="modal"
                data-target={`#agentUpdateModal-${row._id}`}
                data-placement="left"
                title="Modifier"
              >
                <i className="fa fa-edit" data-toggle="tooltip"></i>
              </Link>
              <Link
                to="#delete"
                onClick={() => agentDelete(row._id, row.name)}
                className="dropdown-item text-danger"
                data-toggle="tooltip"
                data-placement="left"
                title="Supprimer"
              >
                <i className="fa fa-trash"></i>
              </Link>

              <AgentUpdateModal
                agent={{
                  _id: row._id,
                  name: row.name,
                  email: row.email,
                  birthday: row.birthday,
                  nationality: row.nationality,
                  skills: row.skills,
                  civilStatus: row.civilStatus,
                  sex: row.sex,
                  photo: row.photo,
                  address: row.address,
                  serviceTaking: row.serviceTaking,
                  baseSalary: row.baseSalary,
                  fonction: row.fonction,
                  confidentiality: row.confidentiality,
                  socialClub: row.socialClub,
                  phone: row.phone,
                  peopleToCall: row.peopleToCall,
                  eligibilityDate: row.eligibilityDate,
                }}
              />
            </>
          );
        },
        sortable: false,
      },
    ],
    []
  );

  // SUPPRESSION DE L'AGENT
  const agentDelete = (agentId, agentName) => {
    if (window.confirm(`Voulez-vraiment supprimer l'agent ${agentName} ?`)) {
      dispatch(deleteAgent(agentId));
      dispatch(getAgentInfos());
      toast.success(`Agent ${agentName} supprimé avec succès`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    
    }
  };

  useEffect(() => {
    dispatch(getAgentInfos());
  }, [dispatch]);

  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="container-fluid">
            <div className="card mt-4">
              <div className="card-header">
                <div className="row py-2">
                  <div className="col-md-6 mt-1">
                    <span className="font-weight-light h3">
                      Liste des agents
                    </span>
                  </div>

                  <div className="col-md-6 text-right mt-1">
                    <Link className="btn btn-primary" to="agents/create">
                      <i className="fa fa-plus"></i> &nbsp;Créer un nouvel agent
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <LoadingBox />
                ) : error ? (
                  <MessageBox type="danger">{error}</MessageBox>
                ) : (
                  <DataTable
                    columns={columns}
                    data={agent}
                    pagination={true}
                    paginationPerPage={5}
                    noHeader={true}
                    paginationComponentOptions={{
                      rowsPerPageText: "Lignes par page :",
                      rangeSeparatorText: "sur",
                      noRowsPerPage: false,
                      selectAllRowsItem: true,
                      selectAllRowsItemText: "Tous",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentHome;
