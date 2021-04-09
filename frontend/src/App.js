import React from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AgentHome from "./components/agents/AgentHome";
import AgentCreate from "./components/agents/AgentCreate";
import ProfileHome from "./components/profile/ProfileHome";
import ProfileCreate from "./components/profile/ProfileCreate";
import AgentDetails from "./components/agents/AgentDetails";
import Register from "./components/Register";
import ProjectHome from "./components/projects/ProjectHome";
import PageNotFound from "./components/PageNotFound";
import ProjectCreate from "./components/projects/ProjectCreate";
import NavAgent from "./components/agents/NavAgent";
import SideBarAgent from "./components/agents/SideBarAgent";
import FooterAgent from "./components/agents/FooterAgent";
import MyInfos from "./components/agents/MyInfos";
import ProjectsAgent from "./components/agents/ProjectsAgent";

const App = () => {
  return (
    <div>
      <Router>
        {/* <Route
          path="/admin"
          component={() => (
            <>
              <Nav /> <SideBar /> <Footer />
            </>
          )}
        /> */}
        <Route path="/admin" component={Nav} />
        <Route path="/admin" component={SideBar} />
        <Route path="/admin" component={Footer} />

        <Route path="/agent" component={NavAgent} />
        <Route path="/agent" component={SideBarAgent} />
        <Route path="/agent" component={FooterAgent} />

        <Switch>

          {/* ============ ADMIN ========== */}

          <Route path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />

          <Route exact path="/admin/agents" component={AgentHome} />
          <Route path="/admin/agents/create" component={AgentCreate} />
          <Route path="/admin/agents/:id" component={AgentDetails} />

          <Route path="/admin/users/register" component={Register} />
          <Route exact path="/admin/users/profile" component={ProfileHome} />
          <Route path="/admin/users/profile/:id" component={ProfileCreate} />

          <Route exact path="/admin/projects" component={ProjectHome} />
          <Route path="/admin/projects/create" component={ProjectCreate} />

          {/* ============ AGENT ADMIN ========== */}
          <Route path="/agent/myinfos" component={MyInfos} />
          <Route path="/agent/projects" component={ProjectsAgent} />

          {/* ============ 404 ========== */}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
