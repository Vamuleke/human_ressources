import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProjectSingleDetails } from "../../actions/projectActions";
import moment from "moment";

const ProjectDetails = (props) => {
  const agentId = props.match.params.id;
  const projectSingleDetails = useSelector(
    (state) => state.projectSingleDetails
  );
  const { loading, error, project } = projectSingleDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectSingleDetails(agentId));
  }, [dispatch, agentId]);

  console.log("PROJECT !!!!!", project);

  return (
    <div className="main">
      <div className="main-content">
        <div className="container-fluid">
          {error ? (
            <h2 className="text-center">Aucune donnée à afficher</h2>
          ) : (
            !loading && (
              <div className="card mt-4">
                <div className="card-header">
                  <div className="row py-2">
                    <div className="col-md-6 mt-1">
                      <span className="font-weight-light h3">
                        Details du project {project.projectName}
                      </span>
                    </div>

                    <div className="col-md-6 text-right mt-1">
                      <Link className="btn btn-primary" to="/admin/projects">
                        <i className="fa fa-list"></i> &nbsp;Liste de projets
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-6 h4">Nom du projet :</div>
                        <div className="col-md-6 h4 font-weight-light text-right">
                          {project.projectName}
                        </div>

                        <div className="col-md-6 h4">Date de création :</div>
                        <div className="col-md-6 h4 font-weight-light text-right">
                          {moment(project.projectCreateDate).format(
                            "DD/MM/YYYY"
                          )}
                        </div>

                        <div className="col-md-6 h4">Date d'échéance :</div>
                        <div className="col-md-6 h4 font-weight-light text-right">
                          {moment(project.projectDeadline).format("DD/MM/YYYY")}
                        </div>

                        <div className="col-md-6 h4">Responsable :</div>
                        <div className="col-md-6 h4 font-weight-light text-right">
                          {project.projectResponsible.name}
                        </div>

                        <div className="col-md-6 h4">Statut :</div>
                        <div className="col-md-6 h4 font-weight-light text-right">
                          {project.status === "onHold"
                            ? "En attente"
                            : project.status === "inProgress"
                            ? "En cours"
                            : project.status === "finished"
                            ? "Terminé"
                            : project.status === "delivered"
                            ? "Livré"
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-12 h4">Tâches :</div>
                      <div className="col-md-12 h4 font-weight-light">
                          <ul>
                        {project.tasks.map ((task, index) => {
                            return (
                                <li key={index}>{task.taskName} ({moment(task.taskDeadline).format("DD/MM/YYYY")})</li>
                            )
                        })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
