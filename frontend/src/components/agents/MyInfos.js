import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { getAgentSingleDetails } from "../../actions/agentActions";
import LoadingBox from "../LoadingBox";
// import MessageBox from "../MessageBox";
import moment from "moment";

const MyInfos = (props) => {
  // const agentId = props.match.params.id;
  // const agentSingleDetails = useSelector((state) => state.agentSingleDetails);
  // const { loading, error, agent } = agentSingleDetails;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAgentSingleDetails(agentId));
  // }, [dispatch, agentId]);

  // const userInfo = !loading && !error && agent;
const userSignin = useSelector (state => state.userSignin)
const {loading, userInfo, error} = userSignin

  return (
    <div className="main">
      <div className="main-content">
        <div className="col-md-12">
          {error ? (
            <h2>Aucune donnée à afficher</h2>
          ) : (
            <div className="card mt-4 mb-5">
              <div className="card-header">
                <div className="row py-2">
                  <div className="col-md-6 mt-1">
                    <span className="font-weight-light h3">
                      {userInfo.name}
                    </span>
                  </div>
                  {/* <div className="col-md-6 text-right mt-1">
                    <Link className="btn btn-primary" to="/admin/agents">
                      <i className="fa fa-list"></i> &nbsp;Liste des agents
                    </Link>
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    {loading && <LoadingBox />}
                    <img
                      src={userInfo.photo}
                      className="rounded"
                      width="300"
                      height="433"
                      alt=""
                    />
                  </div>

                  <div className="col-md-4 bg-light">
                    <span className="font-weight-bold h3">
                      <u>Identité :</u>
                    </span>
                    <div className="row mt-2">
                      <div className="col-md-6 h5">Nom(s)</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.name}
                      </div>

                      <div className="col-md-6 h5">Email</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.email}
                      </div>

                      <div className="col-md-6 h5">Naissance</div>
                      <div className="col-md-6 h5 text-right">
                        {moment(userInfo.birthday).format("DD/MM/YYYY")}
                      </div>

                      <div className="col-md-6 h5">Nationalité</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.nationality}
                      </div>

                      <div className="col-md-6 h5">État civil</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.civilStatus}
                      </div>

                      <div className="col-md-6 h5">Sexe</div>
                      <div className="col-md-6 h5 text-right">
                      {userInfo.sex === "M" ? "Masculin" : "Féminin"}
                      </div>

                      <div className="col-md-6 h5">Téléphone</div>
                      <div className="col-md-6 h5 text-right">
                      {userInfo.phone}
                      </div>

                      <div className="col-md-6 h5">Adresse</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.address}
                      </div>
                      <hr className="text-dark"/>
                      <div className="col-md-6 h5">Prise de service</div>
                      <div className="col-md-6 h5 text-right">
                        {moment(userInfo.serviceTaking).format("DD/MM/YYYY")}
                      </div>

                      <div className="col-md-6 h5">Date d'adminisibilité</div>
                      <div className="col-md-6 h5 text-right">
                        {moment(userInfo.eligibilityDate).format("DD/MM/YYYY")}
                      </div>

                      <div className="col-md-6 h5">Salaire de base</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.baseSalary}$
                      </div>

                      <div className="col-md-6 h5">Fonction</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.fonction}
                      </div>

                      <div className="col-md-6 h5">Club social</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.socialClub}
                      </div>

                      <div className="col-md-6 h5">Personnes à appeler</div>
                      <div className="col-md-6 h5 text-right">

                        {!loading && !error && userInfo.peopleToCall.map (ptc => {
                          return (
                            <h6 className="p-0 m-0" key={ptc._id}>{ptc.nameCall} ({ptc.phoneCall})</h6>
                          )
                        })}
        
                      </div>

                      <div className="col-md-6 h5">Confidentialité</div>
                      <div className="col-md-6 h5 text-right">
                        {userInfo.confidentiality ? "Accepté" : "Refusé"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <span className="font-weight-bold h3">
                      <u>Compétences :</u>
                    </span>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        {loading ? (
                          <LoadingBox />
                        ) : (
                          userInfo.skills.map((item) => {
                            return (
                              <>
                                <small>{item.skill}</small>
                                <div className="progress">
                                  <div
                                    className={
                                      item.step <= 25
                                        ? "progress-bar bg-danger"
                                        : item.step <= 50
                                        ? "progress-bar bg-warning"
                                        : item.step <= 75
                                        ? "progress-bar bg-primary"
                                        : "progress-bar bg-success"
                                    }
                                    role="progressbar"
                                    style={{ width: `${item.step}%` }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInfos;
