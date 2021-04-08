import React,{useEffect, useState} from 'react'
import avatarImage from './image/avatarImage.jpg'
import './App.css'
import ChatIcon from '@material-ui/icons/Chat'
import {Search} from '@material-ui/icons'
import ChatListItems from './chatListItems'
import ChatWindow from './ChatWindow'
import ChatIntro from './ChatIntro'
import NewChat from './NewChat'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import LoadingBox from '../LoadingBox'
export default function AppChat ({user,data}) {

  const userDetail = useSelector(state => state.userDetail)
  const { loading, users, error } = userDetail

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo,loading:loadingUser } = userSignin

  
    const [activeChat,setActiveChat]=useState({});
     
       const [showNewChat,setShowNewChat]=useState(false);
  const handleNewCHat=()=>{
    setShowNewChat(true)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

       return (
        <div className='main'>
        <div className='main-content'>
    <div className='app-window'>
      <div className='sidebars'>
      <NewChat 
        
      />
        <header>
          <img className='header--avatar' src={userInfo.photo} alt=""/>
          <div className='header--buttons'>
            <div onClick={handleNewCHat} className='header-btn'>
                <ChatIcon style={{color:'#919191'}}/>
            </div>
          </div>
        </header>

        <div className='search'>
            <div className="search--input">
                <Search fontSize="small" style={{color:'#919191'}}/>
            <input type="search" placeholder="Rechercher"/>
            </div>
        </div>{loading ? <LoadingBox/>:(
          <div className='chatlist'>
            {users.map((item,key)=>(
                    <ChatListItems
                    data={item} 
                    active={activeChat._id === users[key]._id}key={key} 
                    onClick={()=>setActiveChat(users[key])}
                    user={userInfo}
                    />
                  
            )
             )}
        </div>
        )}
        
      </div>
      <div className='contentarea'>
         
             {activeChat._id  !== undefined && <ChatWindow user={userInfo} data={activeChat}/>}
          {activeChat._id  === undefined && <ChatIntro/>}
      </div>
    </div>
    </div>
    </div>
  )
}
