import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAgentInfos } from "../../actions/agentActions";

const ProjectCreate = () => {
  const [tasks, setTasks] = useState([
    { taskName: "", taskDeadline: "", taskStatus: false },
  ]);

  // AJOUT/SUPPRESSION D'UN TASK - DYNAMIC FORM FIELDS
  const addTaskRow = () => {
    setTasks([...tasks, { taskName: "", taskDeadline: "", taskStatus: false }]);
  };

  const addTaskHandler = (e, key) => {
    const values = [...tasks];
    values[key][e.target.name] = e.target.value;
    setTasks(values);
  };

  const removeTaskHandler = (e, key) => {
    const values = [...tasks];

    if (tasks.length > 1) {
      values.splice(key, 1);
    }

    setTasks(values);
  };

  // USESTATE & DISPATCH & USEEFFECT
  const dispatch = useDispatch ()
  const agentInfos = useSelector (state => state.agentInfos)
  const {loading, error, agent} = agentInfos

  useEffect (() => {
    dispatch (getAgentInfos ())
  }, [])

  console.log("AGENT INFOS !!!", agent);

  return (
    <div className="main">
      <div className="main-content">
        <div className="container-fluid">
          <div className="card mt-4">
            <div className="card-header">
              <div className="row py-2">
                <div className="col-md-6 mt-1">
                  <span className="font-weight-light h3">
                    Créer un nouveau projet
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
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Nom du projet</label>
                      <input type="text" id="name" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deadline">Date d'échéance</label>
                      <input
                        type="date"
                        id="deadline"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="responsible">Responsable</label>
                      <select
                        type="date"
                        id="responsible"
                        className="form-control"
                      >
                        <option>Sélectionner...</option>
                        {
                          !loading && agent.map (ag => {
                            return (
                              <option value={ag._id} key={ag._id}>{ag.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="#task">Tâche + Deadline</label>
                      {tasks.map((task, key) => {
                        return (
                          <div className="row" key={key}>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control mb-1"
                                name="taskName"
                                placeholder="Nom"
                                value={task.taskName}
                                onChange={(e) => addTaskHandler(e, key)}
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                type="date"
                                className="form-control"
                                name="taskDeadline"
                                value={task.taskDeadline}
                                onChange={(e) => addTaskHandler(e, key)}
                              />
                            </div>
                            <div className="col-md-2 pl-2">
                              <button
                                type="button"
                                className={
                                  tasks.length > 1
                                    ? "btn btn-danger btn-sm"
                                    : "btn btn-danger btn-sm disabled"
                                }
                                onClick={(e) => removeTaskHandler(e, key)}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        onClick={addTaskRow}
                      >
                        <i className="fa fa-plus font-weight-bold d-block"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Valider
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
