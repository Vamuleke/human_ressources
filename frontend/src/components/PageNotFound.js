import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="text-center" style={{ marginTop: "100px" }}>
        <i className="fas fa-frown fa-7x"></i>

        <h1 className="mt-5">Oups... Erreur 404</h1>

        <h2 className="font-weight-light">
          La page à laquelle vous souhaitez accéder est introuvable.
        </h2>

        <h4 className="mt-4">
          <Link to="/admin/dashboard">
            <i className="fas fa-arrow-left"></i> Revenir à l'accueil
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default PageNotFound;
