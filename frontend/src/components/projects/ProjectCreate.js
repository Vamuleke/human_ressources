import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAgentInfos } from "../../actions/agentActions";
import { createProject, getProjectInfos } from "../../actions/projectActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectCreate = () => {
  const [tasks, setTasks] = useState([
    { taskName: "", taskDeadline: "", taskStatus: false },
  ]);
  const [projectName, setProjectName] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectResponsible, setProjectResponsible] = useState("");
  const [projectCreationDate, setProjectCreationDate] = useState("");

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

  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    // VALIDATTION
    if (
      !projectName ||
      !projectDeadline ||
      !projectResponsible ||
      projectResponsible === ""
    ) {
      alert("Veuillez remplir tous les champs !");
      return false;
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskName === "" || tasks[i].taskDeadline === "") {
        alert(
          'Veuillez renseigner toutes les valeurs du champ "Tâche + Deadline"'
        );
        return false;
      }
    }

    // SI TOUT DE PASSE BIEN, ON DISPATCH L'ACTION POUR CREER LE PROJET

    const project = {
      projectName: projectName,
      projectDeadline: projectDeadline,
      ProjectCreationDate: projectCreationDate,
      projectResponsible: projectResponsible,
      tasks: tasks,
    };

    dispatch(createProject(project));
    clearFields();
    toast.success("Projet crée avec succès", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  // FONCTION POUR VIDER LES CHAMPS
  const clearFields = () => {
    setProjectName("");
    setProjectDeadline("");
    setProjectResponsible("");
    setTasks([{ taskName: "", taskDeadline: "", taskStatus: false }]);
  };

  // USESTATE & DISPATCH & USEEFFECT
  const dispatch = useDispatch();
  const agentInfos = useSelector((state) => state.agentInfos);
  const { loading, agent } = agentInfos;

  const projectInfos = useSelector((state) => state.projectInfos);
  const { project } = projectInfos;

  useEffect(() => {
    dispatch(getAgentInfos());
    dispatch(getProjectInfos());
  }, [dispatch]);

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
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="projectName">Nom du projet</label>
                      <input
                        type="text"
                        id="projectName"
                        className="form-control"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="projectDeadline">Date de création</label>
                      <input
                        type="date"
                        id="projectCreationDate"
                        className="form-control"
                        value={projectCreationDate}
                        onChange={(e) => setProjectCreationDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="projectDeadline">Date d'échéance</label>
                      <input
                        type="date"
                        id="projectDeadline"
                        className="form-control"
                        value={projectDeadline}
                        onChange={(e) => setProjectDeadline(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="projectResponsible">Responsable</label>
                      <select
                        type="date"
                        id="projectDeadline"
                        className="form-control"
                        value={projectResponsible}
                        onChange={(e) => setProjectResponsible(e.target.value)}
                      >
                        <option value="">Sélectionner...</option>
                        {!loading &&
                          agent.map((ag) => {
                            return (
                              <option value={ag._id} key={ag._id}>
                                {ag.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
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
