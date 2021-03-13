import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentInfos } from "../actions/agentActions";
import { getProjectInfos } from "../actions/projectActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const projectInfos = useSelector((state) => state.projectInfos);
  const { loading, error, project } = projectInfos;

  const agentInfos = useSelector((state) => state.agentInfos);
  const { loading: loadingAgent, error: errorAgent, agent } = agentInfos;

  useEffect(() => {
    dispatch(getProjectInfos());
    dispatch(getAgentInfos());
  }, [dispatch]);

  const projectsOnHold =
    !loading && !error && project.filter((proj) => proj.status === "onHold");

  const projectsInProgress =
    !loading &&
    !error &&
    project.filter((proj) => proj.status === "inProgress");

  const projectsFinished =
    !loading && !error && project.filter((proj) => proj.status === "finished");

  const projectsDelivered =
    !loading && !error && project.filter((proj) => proj.status === "finished");

  const allAgentsMale =
    !loadingAgent && !errorAgent && agent.filter((ag) => ag.sex === "M");

  const allAgentsFemale =
    !loadingAgent && !errorAgent && agent.filter((ag) => ag.sex === "F");

  console.log("AGENT !!!", allAgentsFemale);
  console.log("ON HOLD !!!", projectsOnHold.length);
  console.log("IN PROGRESS !!!", projectsInProgress);
  console.log("FINISHED !!!", projectsFinished);
  console.log("DELIVERED !!!", projectsDelivered);

  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-md-4">
                <div
                  className="card text-white bg-primary mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Agents Masculins</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{allAgentsMale.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card text-white bg-info mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Agents Féminins</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{allAgentsFemale.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card text-white bg-danger mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Projets en Attente</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{projectsOnHold.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-4">
                <div
                  className="card text-white bg-warning mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Projets en Cours</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{projectsInProgress.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card text-white bg-success mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Projets Terminés</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{projectsFinished.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card text-white bg-dark mb-3"
                  style={{ maxWidth: "40rem" }}
                >
                  <div className="card-header text-center pb-3"><h3>Projets Livrés</h3></div>
                  <div className="card-body">
                    <div className="card-text text-center pb-3 display-1">{projectsDelivered.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
