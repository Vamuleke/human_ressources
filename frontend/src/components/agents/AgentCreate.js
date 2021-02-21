import React from 'react'
import profil from '../../image/essaie.jpg'

const AgentCreate = () => {
    return (
        <>
            <div className="main">
                <div className="main-content">
                    <div className="container">
                        <div className="card col-md-6">
                            <div className="card-header h2 text-center">
                                Créer un nouvel agent
                            </div>
                            <div className="card-body">
                              <form>
                                  <div className="form-group">
                                    <label htmlFor="name">Nom (s)</label>
                                    <input type="text" id="name" className="form-control"/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="email">Adresse email</label>
                                    <input type="email" id="email" className="form-control"/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="brithday">Date de naissance</label>
                                    <input type="date" id="brithday" className="form-control"/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="sex">Sexe</label>
                                    <select id="sex" className="form-control">
                                        <option>M</option>
                                        <option>F</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="brithday">Photo</label>
                                    <input type="file" id="brithday" className="form-control"/>
                                  </div>

                                  <button className="btn btn-primary btn-block">Valider</button>
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