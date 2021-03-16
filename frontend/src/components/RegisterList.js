import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from './LoadingBox'
import { listUsers } from '../actions/userActions'
import ReactPaginate from 'react-paginate'
const RegisterList = props => {
  const userDetail = useSelector(state => state.userDetail)
  const { loading, users, error } = userDetail
  const [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 8
  const pageVisited = pageNumber * userPerPage
  const displayUser = loading ? (
    <LoadingBox />
  ) : (
    users.slice(pageVisited, pageVisited + userPerPage).map(items => {
      return (
        <div className='col-sm-3' key={items._id}>
          <div
            className='card border'
            style={{ marginTop: '20px', height: '180px' }}
          >
            <div className='card-body text-center'>
              <img
                className=' rounded-circle'
                width='70'
                height='70'
                src={items.photo}
                alt=''
              />
              <h4 className='card-text'>{items.name}</h4>
              <h4 className='card-text'>{items.email}</h4>
              <h4 className='card-text'>
                {items.isAdmin ? 'Admin' : 'Utilisateur'}
              </h4>
            </div>
          </div>
        </div>
      )
    })
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  return (
    <>
      <div className='main'>
        <div className='main-content'>
          <h4 className='h1 text-center font-weight-bold'>Liste des Utilisateurs</h4>

          <>
            <div className='row'>
              {displayUser}
              {loading ? (
                <LoadingBox />
              ) : (
                <div className="text-right">
                <ReactPaginate
                  previousLabel='Précédent'
                  nextLabel='Suivant'
                  pageCount={Math.ceil(users.length / userPerPage)}
                  onPageChange={({ selected }) => setPageNumber(selected)}
                  containerClassName='pagination'
                  previousClassName='page-link'
                  nextClassName='page-link'
                  activeClassName='font-weight-bold'
                />
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default RegisterList
