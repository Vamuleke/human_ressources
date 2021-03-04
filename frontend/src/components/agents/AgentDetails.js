import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAgentSingleDetails } from "../../actions/agentActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import moment from "moment";

const AgentDetails = (props) => {
  const agentId = props.match.params.id;
  const agentSingleDetails = useSelector((state) => state.agentSingleDetails);
  const { loading, error, agent } = agentSingleDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentSingleDetails(agentId));
  }, [dispatch, agentId]);

  const agentDetails = !loading && !error && agent;

  return (
    <div className="main">
      <div className="main-content">
        <div className="col-md-12">
          <div className="card mt-4 mb-5">
            <div className="card-header">
              <div className="row py-2">
                <div className="col-md-6 mt-1">
                  <span className="font-weight-light h3">
                    Détails de l'agent {agentDetails.name}
                  </span>
                </div>
                <div className="col-md-6 text-right mt-1">
                  <Link className="btn btn-primary" to="/admin/agents">
                    <i className="fa fa-list"></i> &nbsp;Liste des agents
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {loading && <LoadingBox />}
                  <img
                    src={agentDetails.photo}
                    className="rounded"
                    width="300"
                    height="433"
                    alt=""
                  />
                </div>

                <div className="col-md-6">
                  <h2 className="font-weight-bold">
                    <u>Identité :</u>
                  </h2>
                  <div className="row mt-2">
                    <div className="col-md-6 h4">Nom(s)</div>
                    <div className="col-md-6 h4 text-right">
                      {agentDetails.name}
                    </div>

                    <div className="col-md-6 h4">Email</div>
                    <div className="col-md-6 h4 text-right">
                      {agentDetails.email}
                    </div>

                    <div className="col-md-6 h4">Naissance</div>
                    <div className="col-md-6 h4 text-right">
                      {moment(agentDetails.birthday).format("DD/MM/YYYY")}
                    </div>

                    <div className="col-md-6 h4">Nationalité</div>
                    <div className="col-md-6 h4 text-right">
                      {agentDetails.nationality}
                    </div>

                    <div className="col-md-6 h4">État civil</div>
                    <div className="col-md-6 h4 text-right">
                      {agentDetails.civilStatus}
                    </div>

                    <div className="col-md-6 h4">Sexe</div>
                    <div className="col-md-6 h4 text-right">
                      {agentDetails.sex === "M" ? "Masculin" : "Féminin"}
                    </div>
                  </div>
                  <h2 className="font-weight-bold">
                    <u>Compétences :</u>
                  </h2>
                  <div className="row">
                    <div className="col-md-12">
                      {/* <h4>{JSON.stringify (agentDetails.skills)}</h4> */}
                      {loading ? (
                        <LoadingBox />
                      ) : error ? (
                        <MessageBox type="danger">{error}</MessageBox>
                      ) : (
                        agentDetails.skills.map((item) => {
                          return (
                            <>
                              <h5>{item.skill}</h5>
                              <div className="progress">
                                <div
                                  className={item.step <= 25 ? 'progress-bar bg-danger' : item.step <= 50 ? 'progress-bar bg-warning' : item.step <= 75 ? 'progress-bar bg-primary' : 'progress-bar bg-success'}
                                  role="progressbar"
                                  style={{"width": `${item.step}%`}}
                                  aria-valuenow={item.step}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {item.step}%
                                </div>
                              </div>
                            </>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
