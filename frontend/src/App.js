import React from 'react'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Nav from './components/Nav'
import SideBar from './components/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Agent from './components/Agent'

const App = () => {
    return (
        <>
            <Router>
                <Nav/>
                <SideBar/>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/agents" component={Agent} />
                    </Switch>
                <Footer/>
            </Router>
        </>
    )
}

export default App