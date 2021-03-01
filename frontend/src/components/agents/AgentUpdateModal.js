import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAgent, updateAgent } from '../../actions/agentActions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'

toast.configure()

const AgentUpdateModal = ({ agent }) => {

    const [name, setName] = useState(agent.name)
    const [email, setEmail] = useState(agent.email)
    const [birthday, setBirthday] = useState(moment(agent.birthday).format("YYYY-MM-DD"))
    const [sex, setSex] = useState(agent.sex)
    const [nationality, setNationality] = useState(agent.nationality)
    const [civilStatus, setCivilStatus] = useState(agent.civilStatus)
    const [skills, setSkills] = useState(agent.skills)
    const [photo, setPhoto] = useState(agent.photo)

    const dispatch = useDispatch()

    // SUBMIT HANDLER
    const submitHandler = (e) => {
        e.preventDefault()

        if (!name || !email || !birthday || !sex || !nationality || !civilStatus || !skills || !photo) {
            alert('Veuillez remplir tous les champs !')
        } else {

            dispatch(updateAgent(agent._id, {name : name, email : email, birthday : birthday, sex : sex, nationality : nationality, civilStatus : civilStatus, skills : skills, photo : photo}))

            toast.success('Agent modifié avec succès', { position: toast.POSITION.BOTTOM_RIGHT })

        }

    }


    // FONCTION POUR GERER L'UPLOD DE L'IMAGE
    const uploadPhotoHandler = (e) => {
        e.preventDefault()

        const selectedFile = e.target.files[0]
        const allowed_types = ['image/png', 'image/jpeg', 'image/jpg']

        if (selectedFile && allowed_types.includes(selectedFile.type)) {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(selectedFile)
            fileReader.onloadend = () => {
                setPhoto(fileReader.result)
            }
        } else {
            alert("Format de l'image invalide.")
        }

    }

    return (
        <div className="modal fade" id={`agentUpdateModal-${agent._id}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="modal-title font-weight-lighter">Modifier l'agent {agent.name}</h4>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Adresse email</label>
                                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brithday">Date de naissance</label>
                                        <input type="date" id="brithday" className="form-control" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sex">Sexe</label>
                                        <select id="sex" className="form-control" value={sex} onChange={(e) => setSex(e.target.value)}>
                                            <option>M</option>
                                            <option>F</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nationality">Nationnalité</label>
                                        <input type="text" id="nationality" className="form-control" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="civilStatus">État civil</label>
                                        <select id="civilStatus" className="form-control" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)}>
                                            <option>Célibataire</option>
                                            <option>Marié</option>
                                            <option>Divorcé</option>
                                            <option>Veuf</option>
                                            <option>Autre</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="skills">Compétences</label>
                                        <input type="text" id="skills" className="form-control" placeholder="Séparez les compétences par une virgule..." value={skills} onChange={(e) => setSkills(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="photo">Photo</label>
                                        <input type="file" id="photo" className="form-control" onChange={uploadPhotoHandler} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Mettre à Jour</button>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-6 text-left">
                                <img src={photo} width="35" height="35" className="text-left" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentUpdateModal