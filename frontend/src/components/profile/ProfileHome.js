import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../LoadingBox'

const ProfileHome = () => {
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  const userDetail = useSelector(state => state.userDetail)
  const { users,loading } = userDetail
const dispatch=useDispatch;

 return (
    <div className='main'>
      <div className='main-content'>
        <div className='col-md-3'></div>
     
      {loading ? <LoadingBox></LoadingBox>:(
        <div className='text-center col-md-6' style={{ marginTop: '30px' }}>
          <img
            src={  userInfo.photo}
            className='rounded-circle'
            width='150'
            height='150'
            alt=""
          />
          <div className='h3'>{userInfo.name}</div>
          <div className='h4'>{userInfo.email}</div>
          <div className='h4'>
            {userInfo.isAdmin ? 'Administatreur' : 'Utilisateur'}
          </div>

          {/* <button className="btn btn-primary btn-block">Modifier mon profil</button> */}
          <Link
            to={`/admin/users/profile/${userInfo._id}`}
            className='btn btn-primary btn-block'
          >
            Modifier mon profil
          </Link>
        </div>
        )}
      </div>
    </div>
  )
}

export default ProfileHome
