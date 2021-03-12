import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  detailsUsers,
  listUser,
  signin,
  update,
  UpdateProfil,
} from "../../actions/userActions.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Link } from "react-router-dom";
import LoadingBox from "../LoadingBox.js";
import MessageBox from "../MessageBox.js";
const ProfileCreate = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();
  const updateProfil = useSelector((state) => state.updateProfil);
  const { error, loading: sucessLoading, success: successSave } = updateProfil;
useEffect(()=>{
  if(successSave){
    
  }
},[successSave])
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      alert("Entrer un mot de passe valide  !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {

      if (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      } else {
        dispatch(update({ userId: userInfo._id, name, email, newpassword, photo }));
        toast.success("Profil modifier avec success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
      setPhoto(userInfo.photo);
    }
  }, [userInfo, dispatch]);

  const imageHandler = (e) => {
    e.preventDefault();
    const selected = e.target.files[0];
    const ALLOWER_TYPE = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWER_TYPE.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      alert("Format de la photo non valide.");
      // toast.error("Format de la photo non valide", {
      // position: toast.POSITION.TOP_RIGHT
      // })
    }
  };
  return (
    <>
      <div className="main">
        <div className="main-content">
          <div className="container-fluid">
            <div className="card mt-4">
              <div className="card-header text-center">
                {/* <span className="font-weight-light h3">
                  Mettre à jour mon profil
                </span> */}
                <div className="row py-2">
                  <div className="col-md-12 mt-1">
                    <span className="font-weight-light h3">
                      Modifier mon profil
                    </span>
                  </div>
                </div>
              </div>
              {sucessLoading && <LoadingBox></LoadingBox> }
              {error && <MessageBox type='danger'>{error}</MessageBox>}
              <div className="card-body">
                <div className="col-md-6">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="name">Nom (s)</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Adresse email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mot de passe">Mot de passe</label>
                      <input
                        value={password_confirmation}
                        onChange={(e) =>
                          setPassword_confirmation(e.target.value)
                        }
                        type="password"
                        id="password_confirmation"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="photo">Photo</label>
                      <input
                        onChange={imageHandler}
                        type="file"
                        id="photo"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <div
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Changer le mot de passe"
                      >
                        <Toggle
                          name="changePassword"
                          id="changePassword"
                          className="form-check-input"
                          defaultChecked={changePassword}
                          onChange={(e) => setChangePassword(e.target.checked)}
                        />
                      </div>
                    </div>

                    {changePassword ? (
                      <>
                        <div className="form-group">
                          <label>Nouveau mot de passe </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={newpassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nouveau mot de passe..."
                          />
                        </div>
                      </>
                    ) : null}

                    <button type="submit" className="btn btn-primary btn-block">
                      Valider
                    </button>
                  </form>
                </div>

                <div className="col-md-6 text-center pt-5">
                  <img
                    src={photo}
                    alt=""
                    className="rounded-circle mx-auto"
                    width="300"
                    height="300"
                  />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCreate;
