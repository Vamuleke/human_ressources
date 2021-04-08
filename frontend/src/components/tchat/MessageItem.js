import React from 'react'
import './MessageItem.css'
export default function MessageItem({data,user,room,room1}) {
    
    return (
        <div className="messageLine" style={{justifyContent:user._id ===data.sender ? 'flex-end':'flex-start'}}>
       
      {data.room === room || data.room === room1 ?
        <div className="messageItem"
        style={{backgroundColor:user._id === data.sender ? '#dcf8c6':'#fff'}}
        >
        <div className="messageText">{data.text}</div>
        <div className="messageDate">20:30</div>
       </div>
       :
       null
      }       
            
        </div>
    )
}
