import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/userActions'
const Nav = props => {
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  if (!userInfo) {
    window.location.href = '/'
  }
 
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <nav className='navbar navbar-default navbar-fixed-top'>
      <div className='brand'>
        <Link to='/admin/dashboard'>
          <img
            src={process.env.PUBLIC_URL + '/assets/images/logo-dark.png'}
            alt='CRES Pro App'
            className='img-responsive logo'
          />
        </Link>
      </div>
      <div className='container-fluid'>
        <div className='navbar-btn'>
          <button type='button' className='btn-toggle-fullwidth'>
            {/* <i className='lnr lnr-arrow-left-circle'></i> */}
            <span class="lnr lnr-menu"></span>
          </button>
        </div>
        {/* <form className='navbar-form navbar-left'>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Rechercher...'
            />
            <span className='input-group-btn'>
              <button type='button' className='btn btn-primary'>
                <i className='lnr lnr-magnifier'></i>
              </button>
            </span>
          </div>
        </form> */}
        <div className='navbar-btn navbar-btn-right'>
          <a
            className='btn btn-success update-pro'
            href='#'
            title='Projets'
          >
            
            <Link to="/admin/projects/"><span className="text-white"><i className='fa fa-layer-group text-white'></i>&nbsp; PROJETS</span></Link>
            
          </a>
        </div>
        <div id='navbar-menu'>
          <ul className='nav navbar-nav navbar-right'>
            <li className='dropdown'>
              <a
                href='#'
                className='dropdown-toggle icon-menu'
                data-toggle='dropdown'
              >
                {/* <i className='lnr lnr-home'></i> */}
               
                {/* <span className='badge bg-danger'>5</span> */}
              </a>
              {/* <ul className='dropdown-menu notifications'>
                <li>
                  <a href='#' className='notification-item'>
                    <span className='dot bg-warning'></span>Notification 1
                  </a>
                </li>
                <li>
                  <a href='#' className='notification-item'>
                    <span className='dot bg-danger'></span>Notification 1
                  </a>
                </li>
                <li>
                  <a href='#' className='more'>
                    Voir toutes les notifications
                  </a>
                </li>
              </ul> */}
            </li>
            {/* <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                <i className='lnr lnr-question-circle'></i> <span>Aide</span>{' '}
                <i className='icon-submenu lnr lnr-chevron-down'></i>
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <a href='#'>Utilisation basique</a>
                </li>
                <li>
                  <a href='#'>Sécurité</a>
                </li>
              </ul>
            </li> */}
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                <img src={userInfo.photo} className='img-circle' alt='Avatar' />{' '}
                <span>{userInfo.name}</span>{' '}
                <i className='icon-submenu lnr lnr-chevron-down'></i>
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <Link to='/admin/users/profile'>
                    <i className='lnr lnr-user'></i> <span>Mon Profil</span>
                  </Link>
                </li>
                {/* <li>
                  <a href='#'>
                    <i className='lnr lnr-cog'></i> <span>Paramètres</span>
                  </a>
                </li> */}
                <li>
                  <Link to='/#signout' onClick={signoutHandler}>
                    <i className='lnr lnr-exit'></i> <span>Déconnexion</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to='/admin/users/register' >
                    <i className='lnr lnr-exit'></i> <span>S'enregistrer</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to='/admin/users/list' >
                    <i className='lnr lnr-exit'></i> <span>Liste des utilisateurs</span>
                  </Link>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
