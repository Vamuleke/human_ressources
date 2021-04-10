import React from "react";
import { Link } from "react-router-dom";
import { setActive } from "../../helpers/Helpers";


const SideBarAgent = (props) => {

  //console.log ("HOURAA !!", props.location.pathname)
  const propsLocation = props.location.pathname

  return (
    <div id="sidebar-nav" className="sidebar">
      <div className="sidebar-scroll">
        <nav>
          <ul className="nav">
            {/* <li>
              <Link to="/admin/dashboard" className={setActive (propsLocation, "/admin/dashboard")}>
                <i className="lnr lnr-home"></i>
                <span>Tableau de bord</span>
              </Link>
            </li> */}
            <li>
              <Link to="/agent/myinfos" className={setActive (propsLocation, "/agent/myinfos")}>
                <i className="lnr lnr-users"></i>
                <span>Mes infos</span>
              </Link>
            </li>

            <li>
              <Link to="/agent/chat" className={setActive (propsLocation, "/admin/chat")}>
                <i className="lnr lnr-bubble"></i>
                <span>Chat</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/agent/projects" className={setActive (propsLocation, "/agent/projects")}>
                <i className="lnr lnr-layers"></i>
                <span>Projets</span>
              </Link>
            </li> */}

            {/* <li>
              <a href="#subPages" data-toggle="collapse" className="collapsed">
                <i className="lnr lnr-cog"></i> <span>Actions</span>{" "}
                <i className="icon-submenu lnr lnr-chevron-left"></i>
              </a>
              <div id="subPages" className="collapse">
                <ul className="nav">
                  <li>
                    <Link to="/admin/projects/create" alt="">
                      Créer un projet
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/agents/create" alt="">
                      Créer un agent
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}
            {/* <li>
              <Link to="/admin/help" className={setActive (propsLocation, "/admin/help")}>
                <i className="lnr lnr-question-circle"></i>
                <span>Aide</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBarAgent;
