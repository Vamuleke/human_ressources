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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceTaking, setServiceTaking] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [fonction, setfonction] = useState("");
  const [confidentiality, setConfidentiality] = useState(false);
  const [socialClub, setSocialClub] = useState("");
  const [peopleToCall, setPeopleToCall] = useState([
    { nameCall: "", phoneCall: "" },
  ]);
  const [eligibilityDate, setEligibilityDate] = useState("");

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
      // VALIDATION DES PEOPLE TO CALL
      for (let i = 0; i < peopleToCall.length; i++) {
        if (
          peopleToCall[i].nameCall === "" ||
          peopleToCall[i].phoneCall === ""
        ) {
          alert(
            'Veuillez remplir toutes données du champ "Personnes à appeler"'
          );
          return false;
        }
      }

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

      // VALIDATION DE LA CONFIDENTIALITE
      if (confidentiality === false) {
        alert(
          "L'agent doit obligatoirement accepter la politique de confidentialité."
        );
        return false;
      }

      // DISPATCH DE L'ACTION DE MISE A JOUR
      const agentData = {
        name: name,
        email: email,
        birthday: birthday,
        sex: sex,
        nationality: nationality,
        civilStatus: civilStatus,
        skills: skills,
        photo: photo,
        address: address,
        serviceTaking: serviceTaking,
        baseSalary: baseSalary,
        fonction: fonction,
        confidentiality: confidentiality,
        socialClub: socialClub,
        phone: phone,
        peopleToCall: peopleToCall,
        eligibilityDate: eligibilityDate,
      };

      dispatch(createAgent(agentData));
      clearFields();
      toast.success("Agent crée avec succès", {
        position: toast.POSITION.BOTTOM_RIGHT,
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
    setAddress("");
    setServiceTaking("");
    setBaseSalary("");
    setfonction("");
    setConfidentiality(false);
    setSocialClub("");
    setPhone("");
    setPeopleToCall([{ nameCall: "", phoneCall: "" }]);
    setEligibilityDate("");
  };

  // FONCTION POUR GERER L'UPLOAD DE L'IMAGE
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
  const addSkillRow = () => {
    setSkills([...skills, { skill: "", step: "" }]);
  };

  const addSkillHandler = (e, key) => {
    const values = [...skills];
    values[key][e.target.name] = e.target.value;
    setSkills(values);
  };

  const removeSkillHandler = (e, key) => {
    const values = [...skills];

    if (values.length > 1) {
      values.splice(key, 1);
    }

    setSkills(values);
  };

  // FONCTIONS POUR AJOUTER/SUPPRIMER UN CHAMP PEOPE TO CALL
  const addPeopleToCallRow = () => {
    setPeopleToCall([...peopleToCall, { nameCall: "", phoneCall: "" }]);
  };

  const addPeopleToCallHandler = (e, key) => {
    const values = [...peopleToCall];
    values[key][e.target.name] = e.target.value;
    setPeopleToCall(values);
  };

  const removePeopleToCallHandler = (e, key) => {
    const values = [...peopleToCall];

    if (values.length > 1) {
      values.splice(key, 1);
    }
    setPeopleToCall(values);
  };

  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="col-md-12">
            <div className="card mt-4 mb-5">
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
                        <label htmlFor="phone">Téléphone</label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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
                        <label htmlFor="birthday">Date de naissance</label>
                        <input
                          type="date"
                          id="birthday"
                          className="form-control"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="serviceTaking">Prise de service</label>
                        <input
                          type="date"
                          id="serviceTaking"
                          className="form-control"
                          value={serviceTaking}
                          onChange={(e) => setServiceTaking(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="eligibilityDate">
                          Date d'adminisibilité
                        </label>
                        <input
                          type="date"
                          id="eligibilityDate"
                          className="form-control"
                          value={eligibilityDate}
                          onChange={(e) => setEligibilityDate(e.target.value)}
                        />
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

                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          id="confidentiality"
                          className="form-check-input"
                          checked={confidentiality}
                          onChange={(e) => setConfidentiality(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          for="confidentiality"
                        >
                          &nbsp; Accepter la politique de confidentialité
                        </label>
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
                        <label htmlFor="fonction">Fonction</label>
                        <input
                          type="text"
                          id="fonction"
                          className="form-control"
                          value={fonction}
                          onChange={(e) => setfonction(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="baseSalary">Salaire de base</label>
                        <input
                          type="number"
                          id="baseSalary"
                          className="form-control"
                          value={baseSalary}
                          onChange={(e) => setBaseSalary(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="socialClub">Club social</label>
                        <input
                          type="text"
                          id="socialClub"
                          className="form-control"
                          value={socialClub}
                          onChange={(e) => setSocialClub(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="peopleToCall" className="d-block">
                          Personnes à appeler
                        </label>
                        <br />

                        {peopleToCall.map((ptc, key) => {
                          return (
                            <div className="row" key={key}>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  id="peopleToCall"
                                  name="nameCall"
                                  className="form-control form-control-sm mb-1"
                                  placeholder="Nom(s)"
                                  value={ptc.nameCall}
                                  onChange={(e) =>
                                    addPeopleToCallHandler(e, key)
                                  }
                                />
                              </div>
                              <div className="col-sm-4">
                                <input
                                  type="tel"
                                  name="phoneCall"
                                  className="form-control form-control-sm mb-1"
                                  placeholder="Téléphone"
                                  value={ptc.phoneCall}
                                  onChange={(e) =>
                                    addPeopleToCallHandler(e, key)
                                  }
                                />
                              </div>

                              <div className="col-sm-2 pl-2">
                                <button
                                  type="button"
                                  className={
                                    peopleToCall.length > 1
                                      ? "btn btn-danger btn-sm"
                                      : "btn btn-danger btn-sm disabled"
                                  }
                                  onClick={(e) =>
                                    removePeopleToCallHandler(e, key)
                                  }
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
                          onClick={() => addPeopleToCallRow()}
                        >
                          <i className="fa fa-plus font-weight-bold d-block"></i>
                        </button>
                      </div>

                      <div className="form-group">
                        <label htmlFor="skill" className="d-block">
                          Compétence + Niveau
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
                              <div className="col-sm-4">
                                <input
                                  type="number"
                                  name="step"
                                  className="form-control form-control-sm mb-1"
                                  placeholder="Niveau en %"
                                  value={sk.step}
                                  onChange={(e) => addSkillHandler(e, key)}
                                />
                              </div>

                              <div className="col-sm-2 pl-2">
                                <button
                                  type="button"
                                  className={
                                    skills.length > 1
                                      ? "btn btn-danger btn-sm"
                                      : "btn btn-danger btn-sm disabled"
                                  }
                                  onClick={(e) => removeSkillHandler(e, key)}
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
                          onClick={() => addSkillRow()}
                        >
                          <i className="fa fa-plus font-weight-bold d-block"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Créer
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
