import React from 'react'

const ProfileCreate = () => {
    return (
        <>
            <div className="main">
                <div className="main-content">
                    <div className="col-md-6">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h3 className="font-weight-light text-center">Mettre à jour mon profil</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Nom(s)</label>
                                        <input type="text" id="name" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Adresse email</label>
                                        <input type="email" id="email" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brithday">Photo</label>
                                        <input type="file" id="brithday" className="form-control" />
                                    </div>

                                    <button className="btn btn-primary btn-block">Valider</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 text-right">

                        <div className="card-body text-right">
                            <div className="col-md-3"></div>
                            <div className="text-right col-md-6 mt-5">
                                <img src={process.env.PUBLIC_URL + "/assets/images/user-medium.png"} className="rounded-circle" width="250" />
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCreate