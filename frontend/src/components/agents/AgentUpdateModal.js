import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAgent } from "../../actions/agentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

toast.configure();

const AgentUpdateModal = ({ agent }) => {
  const [name, setName] = useState(agent.name);
  const [email, setEmail] = useState(agent.email);
  const [birthday, setBirthday] = useState(
    moment(agent.birthday).format("YYYY-MM-DD")
  );
  const [sex, setSex] = useState(agent.sex);
  const [nationality, setNationality] = useState(agent.nationality);
  const [civilStatus, setCivilStatus] = useState(agent.civilStatus);
  const [skills, setSkills] = useState(agent.skills);
  const [photo, setPhoto] = useState(agent.photo);

  const dispatch = useDispatch();

  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !birthday ||
      !sex ||
      !nationality ||
      !civilStatus ||
      !skills ||
      !photo
    ) {
      alert("Veuillez remplir tous les champs !");
    } else {
      // VALIDATION DES SKILLS
      for (let i = 0; i < skills.length; i++) {
        if (
          skills[i].step <= 0 ||
          skills[i].step > 100 ||
          skills[i].step === "" ||
          skills[i].skill === ""
        ) {
          alert(
            'Veuillez mettre une valeur comprise entre 1 et 100 au niveau du champ "Compétences + Niveau"'
          );
          return false;
        }
      }

    //DISPATCH DE L'ACTION DE MISE A JOUR
      dispatch(
        updateAgent(agent._id, {
          name: name,
          email: email,
          birthday: birthday,
          sex: sex,
          nationality: nationality,
          civilStatus: civilStatus,
          skills: skills,
          photo: photo,
        })
      );

      toast.success("Agent modifié avec succès", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  // FONCTION POUR GERER L'UPLOD DE L'IMAGE
  const uploadPhotoHandler = (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    const allowed_types = ["image/png", "image/jpeg", "image/jpg"];

    if (selectedFile && allowed_types.includes(selectedFile.type)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onloadend = () => {
        setPhoto(fileReader.result);
      };
    } else {
      alert("Format de l'image invalide.");
    }
  };

  // FONCTIONS POUR AJOUTER/SUPPRIMER UN CHAMP SKILLS
  const addSkill = () => {
    setSkills([...skills, { skill: "", step: "" }]);
  };

  const addSkillHandler = (e, key) => {
    const values = [...skills];
    values[key][e.target.name] = e.target.value;
    setSkills(values);
  };

  const removeSkillHandler = (e, key) => {
    const values = [...skills];
    values.splice(key, 1);
    setSkills(values);
  };

  return (
    <div
      className="modal fade"
      id={`agentUpdateModal-${agent._id}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="row">
              <div className="col-md-6">
                <h4 className="modal-title font-weight-lighter">
                  Modifier l'agent {agent.name}
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Nom (s)</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="brithday">Date de naissance</label>
                    <input
                      type="date"
                      id="brithday"
                      className="form-control"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sex">Sexe</label>
                    <select
                      id="sex"
                      className="form-control"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option>M</option>
                      <option>F</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input
                      type="file"
                      id="photo"
                      className="form-control"
                      onChange={uploadPhotoHandler}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="nationality">Nationnalité</label>
                    <input
                      type="text"
                      id="nationality"
                      className="form-control"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="civilStatus">État civil</label>
                    <select
                      id="civilStatus"
                      className="form-control"
                      value={civilStatus}
                      onChange={(e) => setCivilStatus(e.target.value)}
                    >
                      <option>Célibataire</option>
                      <option>Marié</option>
                      <option>Divorcé</option>
                      <option>Veuf</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="skill" className="d-block">
                      Compétences + Niveau
                    </label>
                    <br />

                    {skills.map((sk, key) => {
                      return (
                        <div className="row" key={key}>
                          <div className="col-sm-6">
                            <input
                              type="text"
                              id="skill"
                              name="skill"
                              className="form-control form-control-sm mb-1"
                              placeholder={`Compétence ${key + 1}`}
                              value={sk.skill}
                              onChange={(e) => addSkillHandler(e, key)}
                            />
                          </div>
                          <div className="col-sm-5">
                            <input
                              type="number"
                              name="step"
                              className="form-control form-control-sm mb-1"
                              placeholder="Niveau %"
                              value={sk.step}
                              onChange={(e) => addSkillHandler(e, key)}
                            />
                          </div>

                          <div className="col-sm-1 pl-1">
                            <i
                              className="fa fa-trash text-danger"
                              onClick={(e) => removeSkillHandler(e, key)}
                            ></i>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-1"
                      onClick={() => addSkill()}
                    >
                      <i className="fa fa-plus font-weight-bold d-block"></i>
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Mettre à Jour
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-md-6 text-left">
                <img
                  src={photo}
                  width="35"
                  height="35"
                  className="text-left"
                  alt=""
                />
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

export default AgentUpdateModal;
