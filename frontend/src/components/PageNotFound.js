import React from "react";

const PageNotFound = () => {
  return (
    <div className="text-center mt-5">
      <i className="fas fa-frown fa-7x"></i>

      <h1 className="mt-5">Oups... Erreur 404</h1>

      <h2 className="font-weight-light">
        La page à laquelle vous souhaitez accéder est introuvable.
      </h2>
    </div>
  );
};

export default PageNotFound;
