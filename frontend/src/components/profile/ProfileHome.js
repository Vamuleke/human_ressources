import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHome = () => {
    return (
        <div className="main">
            <div className="main-content">

                <div className="col-md-3"></div>
            
                <div className="text-center col-md-6 mt-5">
                    <img src={process.env.PUBLIC_URL + "/assets/images/belle.jpg"} className="rounded-circle" width="200" height="200"/>
                    <div className="h3">Donatien Vamuleke</div>
                    <div className="h4">donatien@yahoo.fr</div>
                    <div className="h4">Administrateur</div>

                    <Link to='/admin/profile/create' className="btn btn-primary btn-block">Modifier mon profil</Link>
                </div>

                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default ProfileHome