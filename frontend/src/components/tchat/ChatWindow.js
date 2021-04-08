import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import avatarImage from './image/avatarImage.jpg'
import Search from '@material-ui/icons/Search'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import MessageItem from './MessageItem'

import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, getPrivateConversation } from '../../actions/chatAction'
import io from 'socket.io-client'
import './chatWindow.css'
export default function ChatWindow ({ user, data }) {
  let recognition = null
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }
  let socket

//Swap HelperFunction
function swap(input, value_1, value_2) {
  var temp = input[value_1];
  input[value_1] = input[value_2];
  input[value_2] = temp;
}

  const body = useRef()

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')
  const [room, setRoom] = useState('')
  const [room1, setRoom1] = useState('')
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [messageArray, setMessageArray] = useState([])
  const [listening, setListening] = useState(false)
  const getMessage = useSelector(state => state.getMessage)
  const { message,loading } = getMessage
   
  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji)
  }
  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }
  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {
   
    setSender(user._id)
    setReceiver(data._id)
    const idroom=user._id +"."+ data._id
    let tempArr = idroom.split(".")
    setRoom(idroom)
    swap(tempArr, 0, 1)
    let tempRoom2 = tempArr[0] + '.' + tempArr[1]
    setRoom1(tempRoom2)
    dispatch(getPrivateConversation())

  //   socket.on("new Message", (data) => {
  //     setMessageArray([...messageArray, data])
  // })

  // return () => {
  //     socket.emit('disconnect')
  //     socket.off()
  // }

  }, [data._id, user._id])
   
  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true)
      }
      recognition.onend = () => {
        setListening(false)
      }
      recognition.onresult = e => {
        setText(e.results[0][0].transcript)
      }
      recognition.start()
    }
  }

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight
    }
  }, [])

  const handleSendClick = () => {
    let messageObj = {
      sender,
      room,
      text,
      receiver
    }
    dispatch(sendMessage(messageObj))
setText('')
setEmojiOpen(false)
    console.log(text, +'' + sender + '' + receiver)
    
  }
  const handleInputKeyUp = e => {
    if (e.keyCode === 13) {
      handleSendClick()
    }
  }
  
  return (
    <div className='chatWindow'>
      <div className='chatWindow--header'>
        <div className='chatWindow--headerinfo'>
          <img className='chatWindow--avatar' src={data.photo} alt='' />
          <div className='chatWindow--name'>{data.name}</div>
        
        </div>
        <div className='chatWindow--headerbuttons'>
          <div className='chatWindow--btn'>
            <Search />
          </div>
        </div>
      </div>
      <div ref={body} className='chatWindow--body'>
      {loading ? <span></span>:(
       message.map((item, key) => (
         
          <MessageItem key={key} data={item} user={user} room={room} room1={room1} />
        ))) }  
      </div>
      <div
        className='chatWindow--emojiarea'
        style={{ height: emojiOpen ? '200px' : '0px' }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>
      <div className='chatWindow--footer'>
        <div className='chatWindow--pre'>
          <div
            className='chatWindow--btn'
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: '#919191' }} />
          </div>

          <div className='chatWindow--btn' onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? '#009688' : '#919191' }}
            />
          </div>
        </div>

        <div className='chatWindow--inputarea'>
          <input
            className='chatWindow--input'
            type='text'
            placeholder='Entrer un message'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className='chatWindow--pos'>
          {text !== '' && (
            <div className='chatWindow--btn' onClick={handleSendClick}>
              <SendIcon style={{ color: '#919191' }} />
            </div>
          )}
          {text === '' && (
            <div className='chatWindow--btn ' onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? '#126ece' : '#919191' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
