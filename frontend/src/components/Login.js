import React from 'react'

const Login = () => {
    return (
        <>
            <div className="container">
                <div className="row" style={{ "margin-top": "50px" }}>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-center">Connexion</h1>
                        <form>
                            <div className="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon"><i className="fa fa-envelope"></i></span>
                                    <input type="email" class="form-control" placeholder="Adresse email..." />
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon"><i className="fa fa-unlock-alt"></i></span>
                                    <input type="password" class="form-control" placeholder="Mot de passe..."/>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block">Se connecter</button>
                        </form>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login