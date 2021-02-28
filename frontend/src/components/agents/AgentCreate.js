import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createAgent } from '../../actions/agentActions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure ()

const AgentCreate = (props) => {

  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [birthday, setBirthday] = useState ('')
  const [sex, setSex] = useState ('M')
  const [nationality, setNationality] = useState ('')
  const [civilStatus, setCivilStatus] = useState ('Célibataire')
  const [skills, setSkills] = useState ('')
  const [photo, setPhoto] = useState ('')

  const dispatch = useDispatch ()


  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault ()

    if (!name || !email || !birthday || !sex || !nationality || !civilStatus || !skills || !photo) {
      alert ('Veuillez remplir tous les champs !')
    }else {

      dispatch (createAgent (name, email, birthday, sex, nationality, civilStatus, skills, photo))
  
      toast.success ('Agent crée avec succès', {position : toast.POSITION.BOTTOM_RIGHT})
  
      clearFields ()
    }

  }

  // FONCTION POUR NETTOYER LES CHAMPS
  const clearFields = () => {
    setName ('')
    setEmail ('')
    setBirthday ('')
    setNationality ('')
    setSkills ('')
    setPhoto ('')
  }


  // FONCTION POUR GERER L'UPLOD DE L'IMAGE
  const uploadPhotoHandler = (e) => {
    e.preventDefault ()
   
    const selectedFile = e.target.files [0]
    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg']

    if (selectedFile && allowed_types.includes(selectedFile.type)) {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(selectedFile)
      fileReader.onloadend = () => {
        setPhoto(fileReader.result)
      }
    } else {
      alert ("Format de l'image invalide.")
    }

  }


  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="col-md-12">
            <div className="card mt-4">
              <div className="card-header">
                <div className="row py-2">
                  <div className="col-md-6 mt-1">
                    <span className="font-weight-light h3">Créer un nouvel agent</span>
                  </div>

                  <div className="col-md-6 text-right mt-1">
                    <Link className="btn btn-primary" to="/admin/agents"><i className="fa fa-list"></i> &nbsp;Liste des agents</Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Nom (s)</label>
                        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName (e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Adresse email</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail (e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="brithday">Date de naissance</label>
                        <input type="date" id="brithday" className="form-control" value={birthday} onChange={(e) => setBirthday (e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="sex">Sexe</label>
                        <select id="sex" className="form-control" value={sex} onChange={(e) => setSex (e.target.value)}>
                          <option>M</option>
                          <option>F</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="nationality">Nationnalité</label>
                        <input type="text" id="nationality" className="form-control" value={nationality} onChange={(e) => setNationality (e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="civilStatus">État civil</label>
                        <select id="civilStatus" className="form-control" value={civilStatus} onChange={(e) => setCivilStatus (e.target.value)}>
                          <option>Célibataire</option>
                          <option>Marié</option>
                          <option>Divorcé</option>
                          <option>Veuf</option>
                          <option>Autre</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="skills">Compétences</label>
                        <input type="text" id="skills" className="form-control" placeholder="Séparez les compétences par une virgule..." value={skills} onChange={(e) => setSkills (e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input type="file" id="photo" className="form-control" onChange={uploadPhotoHandler}/>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Valider</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgentCreate