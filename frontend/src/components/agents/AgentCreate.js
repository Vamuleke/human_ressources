import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAgent } from "../../actions/agentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AgentCreate = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("M");
  const [nationality, setNationality] = useState("");
  const [civilStatus, setCivilStatus] = useState("Célibataire");
  const [skills, setSkills] = useState([{ skill: "", step: "" }]);
  const [photo, setPhoto] = useState("");

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
   
      skills.forEach((item, index) => {
        if (item.step <= 0 || item.step > 100 || item.step === "") {
          alert('Veuillez mettre une valeur comprise entre 1 et 100 pour le champ "Compétences + Niveau"');
          return
        } //else {
        //   // dispatch(
        //   //   createAgent(
        //   //     name,
        //   //     email,
        //   //     birthday,
        //   //     sex,
        //   //     nationality,
        //   //     civilStatus,
        //   //     skills,
        //   //     photo
        //   //   )
        //   // );

        //   // toast.success("Agent crée avec succès", {
        //   //   position: toast.POSITION.BOTTOM_RIGHT,
        //   // });

        //   //clearFields();
        // }
        toast.success("Agent crée avec succès", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    }
  };

  // FONCTION POUR NETTOYER LES CHAMPS
  const clearFields = () => {
    setName("");
    setEmail("");
    setBirthday("");
    setNationality("");
    setSkills([{ skill: "", step: "" }]);
    setPhoto("");
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

  // FONCTION POUR AJOUTER/SUPPRIMER UN CHAMP SKILLS
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

  console.log(skills);

  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="col-md-12">
            <div className="card mt-4">
              <div className="card-header">
                <div className="row py-2">
                  <div className="col-md-6 mt-1">
                    <span className="font-weight-light h3">
                      Créer un nouvel agent
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
                              <div className="col-sm-8">
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
                              <div className="col-sm-3">
                                <input
                                  type="number"
                                  name="step"
                                  className="form-control form-control-sm mb-1"
                                  placeholder="Niveau"
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
                    Valider
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentCreate;
