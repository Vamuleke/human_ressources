import React, { useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import './newChat.css'
import avatarImage from './image/avatarImage.jpg'
import './chatList.css'
export default function NewChat ({ user, chatlist, show, setShow }) {
  const [list, setList] = useState([
    { id: 1234, name: 'valere', avatar: avatarImage },
    { id: 1234, name: 'valere', avatar: avatarImage },
    { id: 1234, name: 'valere', avatar: avatarImage },
    { id: 1234, name: 'valere', avatar: avatarImage }
  ])
  const handleClose = () => {
    setShow(false)
  }
  return (
    <div className='newChat' style={{ left: show ? 0 : -415 }}>
      <div className='newChat--head'>
        <div onClick={handleClose} className='newChat--backbutton'>
          <ArrowBackIcon style={{ color: '#fff' }} />
        </div>
        <div className='newChat--headtitle'>Nouvelle converation</div>
      </div>
      <div className='newChat--list'>
        {list.map((item, key) => (
          <div className='newChat--item' key={key}>
            <img className='newChat--itemavatar' src={item.avatar} alt="" />
            <div className='newChat--itemname'>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
