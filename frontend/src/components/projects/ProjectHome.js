import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { getProjectInfos } from "../../actions/projectActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const ProjectHome = () => {
  const dispatch = useDispatch();
  const projectInfos = useSelector((state) => state.projectInfos);
  const { loading, error, project } = projectInfos;

  useEffect(() => {
    dispatch(getProjectInfos());
  }, [dispatch]);

  const columns = useMemo(() => [
    // {
    //   name: <h4>#</h4>,
    //   selector: (row, index) => {
    //     return <span>{index + 1}</span>;
    //   },
    //   sortable: true,
    // },
    {
      name: <h4>Nom du Projet</h4>,
      selector: (row, index) => {
        return <h5>{row.projectName}</h5>;
      },
      sortable: true,
    },
    {
      name: <h4>Responsable</h4>,
      selector: (row, index) => {
        return <h5>{row.projectResponsible.name}</h5>;
      },
      sortable: true,
    },
    {
      name: <h4>Statut</h4>,
      selector: (row, index) => {
        return row.status === "onHold" ? (
          <span className="btn btn-danger btn-sm small">En attente</span>
        ) : row.status === "inProgress" ? (
          <span className="btn btn-info btn-sm small">En cours</span>
        ) : row.status === "finished" ? (
          <span className="btn btn-success btn-sm small">Terminé</span>
        ) : row.status === "delivered" ? (
          <span className="btn btn-primary btn-sm small">Livré</span>
        ) : (
          ""
        );
      },
      sortable: false,
    },
    {
      name: <h4>Actions</h4>,
      cell: (row, index) => {
        return (
          <>
            <Link
              to="#view"
              className="dropdown-item text-secondary"
              data-toggle="tooltip"
              data-placement="left"
              title="Détails"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to="#update"
              className="dropdown-item text-primary"
              title="Modifier"
            >
              <i className="fa fa-edit" data-toggle="tooltip"></i>
            </Link>
            <Link
              to="#delete"
              className="dropdown-item text-danger"
              data-toggle="tooltip"
              data-placement="left"
              title="Supprimer"
            >
              <i className="fa fa-trash"></i>
            </Link>
          </>
        );
      },
    },
  ]);

  return (
    <div className="main">
      <div className="main-content">
        <div className="container-fluid">
          <div className="card mt-4">
            <div className="card-header">
              <div className="row py-2">
                <div className="col-md-6 mt-1">
                  <span className="font-weight-light h3">Tous les Projets</span>
                </div>

                <div className="col-md-6 text-right mt-1">
                  <Link className="btn btn-primary" to="/admin/projects/create">
                    <i className="fa fa-plus"></i> &nbsp;Créer un nouveau projet
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox type="danger">{error}</MessageBox>
              ) : (
                <DataTable
                  columns={columns}
                  data={project}
                  pagination={true}
                  paginationPerPage={5}
                  noHeader={true}
                  paginationComponentOptions={{
                    rowsPerPageText: "Lignes par page :",
                    rangeSeparatorText: "sur",
                    noRowsPerPage: false,
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Tous",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHome;
