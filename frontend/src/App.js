import React from 'react'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Nav from './components/Nav'
import SideBar from './components/SideBar'

const App = () => {
    return (
        <>
            <Nav/>
            <SideBar/>
            <Dashboard/>
            <Footer/>
        </>
    )
}

export default App