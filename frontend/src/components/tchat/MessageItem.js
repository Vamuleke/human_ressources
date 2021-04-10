import React from 'react'
import './MessageItem.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
export default function MessageItem({data,user,room,room1}) {
    const handleClick=(e)=>{
      console.log(e.button);
    }
    return (
        <div className="messageLine" style={{justifyContent:user._id ===data.sender ? 'flex-end':'flex-start'}}>
       
      {data.room === room || data.room === room1 ?
        <div className="messageItem"
        style={{backgroundColor:user._id === data.sender ? '#dcf8c6':'#fff'}}
         >
         {/* <ArrowDropDownIcon onClick={handleClick}></ArrowDropDownIcon> */}
        <div className="messageText">{data.text}</div>
        <div className="messageDate">{data.createdAt}</div>
       </div>
       
       :
       null
      }       
          
        </div>
    )
}
