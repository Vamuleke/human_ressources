import React from "react";
import { Link } from "react-router-dom";

const ProjectHome = () => {
  return (
    <div className="main">
      <div className="main-content">
        <div className="container-fluid">
          <div className="card mt-4">
            <div className="card-header">
              <div className="row py-2">
                <div className="col-md-6 mt-1">
                  <span className="font-weight-light h3">Tous les projets</span>
                </div>

                <div className="col-md-6 text-right mt-1">
                  <Link className="btn btn-primary" to="#newProject">
                    <i className="fa fa-plus"></i> &nbsp;Créer nouveau projet
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHome;
