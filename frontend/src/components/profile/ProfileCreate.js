import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsUsers, listUser, signin, update, UpdateProfil } from '../../actions/userActions.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Link } from 'react-router-dom'
const ProfileCreate = (props) => {
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  const [errorM, setError] = useState('')
  const [photo, setPhoto] = useState('')
  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.userDetail)
  const updateProfil = useSelector(state => state.updateProfil)
  const { error, loading: sucessLoading, success: sucessSave } = updateProfil

  const submitHandler = e => {
    e.preventDefault()
    if (password !== password_confirmation) {
      alert('Entrer un mot de passe valide  !', {
        position: toast.POSITION.TOP_RIGHT
      })
    } else {
     
      dispatch(
        update({ userId: userInfo._id, name, email, password,photo })
         )
      
      if (errorM) {
        toast.error(errorM, { position: toast.POSITION.TOP_RIGHT })
      } else {
        toast.success('Profil modifier avec success !', {
          position: toast.POSITION.TOP_RIGHT
          
        })
       
      }
     
    }
  
  }
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.email)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
      setPhoto(userInfo.photo);
    } 

   
   
  }, [userInfo,dispatch])
 
  const imageHandler = e => {
    e.preventDefault()
    const selected = e.target.files[0]
    const ALLOWER_TYPE = ['image/png', 'image/jpeg', 'image/jpg']
    if (selected && ALLOWER_TYPE.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result)
      }
      reader.readAsDataURL(selected)
    } else {
      alert('Format de la photo non valide.')
      // toast.error("Format de la photo non valide", {
      // position: toast.POSITION.TOP_RIGHT
      // })
    }
  }
  return (
    <>
      <div className='main'>
        <div className='main-content'>
          <div className='container'>
            <div className='card col-md-6'>
              <div className='card-header h2 text-center'>
                Mettre à jour mon profil
              </div>
              <div className='card-body'>
                <form onSubmit={submitHandler}>
                  <div className='form-group'>
                    <label htmlFor='name'>Nom (s)</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type='text'
                      id='name'
                      className='form-control'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email'>Adresse email</label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type='email'
                      id='email'
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='mot de passe'>Mot de passe</label>
                    <input
                      value={password_confirmation}
                      onChange={e => setPassword_confirmation(e.target.value)}
                      type='password'
                      id='password_confirmation'
                      className='form-control'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='photo'>Photo</label>
                    <input
                      onChange={imageHandler}
                      type='file'
                      id='photo'
                      className='form-control'
                    />
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='changePassword'>
                        Voulez vous changer le mot de passe ?
                      </label>
                      <br />
                      <Toggle
                        name='changePassword'
                        id='changePassword'
                        defaultChecked={changePassword}
                        onChange={e => setChangePassword(e.target.checked)}
                      />
                    </div>
                  </div>
                  {changePassword ? (
                    <React.Fragment>
                      <div className='col-sm-6'>
                        <div className='form-group'>
                          <label>Nouveau mot de passe </label>
                          <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={newpassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder='Nouveau mot de passe'
                          />
                        </div>
                      </div>
                      <div className='col-sm-6'></div>
                    </React.Fragment>
                  ) : null}

                  <button type='submit' className='btn btn-primary btn-block'>
                    Valider
                  </button>
                </form>
              </div>
            </div>

            <div className='col-md-6 text-right'>
              <div className='card-body text-right'>
                <div className='col-md-3'></div>
                <div
                  className='text-right col-md-6'
                  style={{ marginTop: '30px' }}
                >
                  <img
                    src={photo}
                    alt=''
                    className='rounded'
                    style={{ border: '2px solid white', borderRadius: '500px' }}
                    width='250'
                  />
                </div>

                <div className='col-md-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCreate
