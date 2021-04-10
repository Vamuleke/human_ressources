import React from 'react'
import avatarImage from './image/cresChat.png'
import './chatIntro.css'
export default function ChatIntro() {
    return (
        <div className="chatIntro">
            <img src={avatarImage} alt=""/>
            <h1>Bienvenu </h1>
            <h2>Commencer avec la discussion</h2>
        </div>
    )
}
