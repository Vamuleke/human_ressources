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
                <Route path="/admin" component={() => <><Nav/> <SideBar/> <Footer/></>} />
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/agents" component={Agent} />
                    <Route exact path="/" component={Login} />
                </Switch>
            </Router>
        </>
    )
}

export default App