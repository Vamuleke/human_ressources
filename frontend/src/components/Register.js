import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import MessageBox from './MessageBox'
//import avatar from '../image/users.png'

const Register = (props) => {
 
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [errorM, setError] = useState('')
  const [photo, setPhoto] = useState(process.env.PUBLIC_URL + "/assets/images/user-default.png")

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
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();
  //submit
  const SubmitHandler = e => {
    e.preventDefault();
    dispatch(registerUser(name, email, password,photo,isAdmin));
  
  };

  return (
    <>
      <div className='main'>
        <div className='main-content'>
          <div className='container'>
            <div className='card col-md-6'>
              <div className='card-header h2 text-center'>
                Créer un  compte
              </div>
              {error && <MessageBox type='danger'>{error}</MessageBox>}
              <div className='card-body'>
                <form onSubmit={SubmitHandler}>
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
                    <label htmlFor='password'>Mot de passe</label>
                    <input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type='password'
                      id='password'
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Position</label>
                   <input type="checkbox" value={isAdmin} defaultChecked={e=>setIsAdmin(e.target.checked)}/>
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

export default Register
