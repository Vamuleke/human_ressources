import React from 'react'
import './chatList.css'
export default function ChatListItems ({ onClick, active, data,user }) {
  return (
    data._id !==user._id && <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
    <img className='chatListItem--avatar' src={data.photo} alt='' />
  
    
    <div className='chatListItem--lines'>
      <div className='chatListItem--line'>
        <div className='chatListItem--name'>{data.name}</div>
        <div className='chatListItem--date'>19:00</div>
      </div>
      <div className='chatListItem--line'>
        <div className='chatListItem--lastMsg'>
          <p>last message... </p>
        </div>
      </div>
    </div>
  </div> 
  )
}
