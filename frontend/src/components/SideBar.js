import React from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

const SideBar = () => {
  return (
    <div id="sidebar-nav" className="sidebar">
      <div className="sidebar-scroll">
        <nav>
          <ul className="nav">
            <li>
              <Link to="/admin/dashboard" className="active">
                <i className="lnr lnr-home"></i>
                <span>Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/agents">
                <i className="lnr lnr-users"></i>
                <span>Agents</span>
              </Link>
            </li>

            <li>
              <a href="#chat" alt="">
              <i className="lnr lnr-bubble"></i> <span>Chat</span>
              </a>
            </li>
            <li>
              <a href="#subPages" data-toggle="collapse" className="collapsed">
                <i className="lnr lnr-cog"></i> <span>Actions</span>{" "}
                <i className="icon-submenu lnr lnr-chevron-left"></i>
              </a>
              <div id="subPages" className="collapse ">
                <ul className="nav">
                  <li>
                    <Link to="#newProject" alt="">
                      Créer un projet
                    </Link>
                  </li>
                  <li>
                    <Link to="agents/create" alt="">
                      Créer un agent
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#help" alt="">
                <i className="lnr lnr-question-circle"></i> <span>Aide</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
