import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHome = () => {
    return (
        <div className="main">
            <div className="main-content">

                <div className="col-md-3 bg-dark"></div>
            
                <div className="text-center col-md-6" style={{marginTop : "30px"}}>
                    <img src={process.env.PUBLIC_URL + "/assets/images/user-medium.png"} className="rounded" style={{border : "2px solid white", borderRadius : "500px"}} width="150" height="150"/>
                    <div className="h3">Donatien Vamuleke</div>
                    <div className="h4">donatien@yahoo.fr</div>
                    <div className="h4">Administrateur</div>

                    {/* <button className="btn btn-primary btn-block">Modifier mon profil</button> */}
                    <Link to='/admin/profile/create' className="btn btn-primary btn-block">Modifier mon profil</Link>
                </div>

                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default ProfileHome