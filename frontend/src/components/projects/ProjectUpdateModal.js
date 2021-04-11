import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { getProjectInfos, updateProject } from "../../actions/projectActions";

toast.configure();

const ProjectUpdateModal = ({ project }) => {
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectDeadline, setProjectDeadline] = useState(moment(project.projectDeadline).format("YYYY-MM-DD"));
  const [projectCreateDate, setProjectCreateDate] = useState(
    moment(project.projectCreateDate).format("YYYY-MM-DD")
  );
  const [tasks, setTasks] = useState(project.tasks);
  const [projectResponsible, setProjectResponsible] = useState(project.projectResponsible.name);
  

  const dispatch = useDispatch();
  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !projectName ||
      !projectDeadline ||
      !projectCreateDate ||
      !tasks ||
      !projectResponsible
    ) {
      alert("Veuillez remplir tous les champs !");
    } else {
      // VALIDATION DES PEOPLE TO CALL
      for (let i = 0; i < tasks.length; i++) {
        if (
          tasks[i].tasks === "" ||
          tasks[i].taskDeadline === ""
        ) {
          alert(
            'Veuillez remplir toutes données du champ "Tâche + Deadline"'
          );
          return false;
        }
      }


      // DISPATCH DE L'ACTION DE MISE A JOUR
      const projectData = {
        projectName: projectName,
        projectDeadline: projectDeadline,
        projectCreateDate: projectCreateDate,
        tasks: tasks,
        projectResponsible: projectResponsible._id
      };

      dispatch (updateProject(project._id, projectData));
        toast.success("Projet modifié avec succès", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
  };

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


  return (
    <div
      className="modal fade"
      id={`projectUpdateModal-${project._id}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="row">
              <div className="col-md-6">
                <h4 className="modal-title font-weight-lighter">
                  Modifier le projet {project.projectName}
                </h4>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="projectName">Nom du project</label>
                    <input
                      type="text"
                      id="projectName"
                      className="form-control"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectCreateDate">Date de création</label>
                    <input
                      type="date"
                      id="projectCreateDate"
                      className="form-control"
                      value={projectCreateDate}
                      onChange={(e) => setProjectCreateDate(e.target.value)}
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

                  <div className="form-group">
                    <label htmlFor="projectResponsible">Responsable</label>
                    <input
                      type="text"
                      id="projectResponsible"
                      className="form-control"
                      value={projectResponsible}
                      onChange={(e) => setProjectResponsible(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="peopleToCall" className="d-block">
                      Tâche + Deadline
                    </label>
                    <br />

                    {tasks.map((task, key) => {
                      return (
                        <div className="row" key={key}>
                          <div className="col-sm-5">
                            <input
                              type="text"
                              id="peopleToCall"
                              name="taskName"
                              className="form-control form-control-sm mb-1"
                              placeholder="Nom..."
                              value={task.taskName}
                              onChange={(e) => addTaskHandler(e, key)}
                            />
                          </div>
                          <div className="col-sm-5">
                            <input
                              type="date"
                              name="taskDeadline"
                              className="form-control form-control-sm mb-1"
                              placeholder="Deadline..."
                              value={moment(task.taskDeadline).format("YYYY-MM-DD")}
                              onChange={(e) => addTaskHandler(e, key)}
                            />
                          </div>

                          <div className="col-sm-2 pl-3 text-right">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
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
                      onClick={() => addTaskRow()}
                    >
                      <i className="fa fa-plus font-weight-bold d-block"></i>
                    </button>
                  </div>

                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Mettre à jour
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-md-6 text-left">
                {/* <img
                  src={photo}
                  width="35"
                  height="35"
                  className="text-left"
                  alt=""
                /> */}
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpdateModal;
