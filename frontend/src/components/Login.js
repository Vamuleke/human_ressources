import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LoadingBox} from  './containts/loadingBox'
import {MessageBox} from  './containts/messageBox'

const Login = (props) => {

     //
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('')
    // const userSignin = useSelector(state=>state.userSignin)
    // const {loading,userInfo,error}= userSignin

    //   const dispatch = useDispatch()
    // useEffect(()=>{
    //    if(userInfo){
    //        //rediriger a la page --------------d'acceuil
    //       props.history.push('/')
    //    }
    //    return () => {
        
    //   }
    // },[userInfo, props.history])


const submitHandler=(e)=>{
    e.preventDefault();
    // dispatch(signin(email,password))
}

    return (
        <>
            <div className="container">
                <div className="row" style={{ "margin-top": "50px" }}>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-center">Connexion</h1>
                         {/* <div>
                        
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
            </div> */}
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                    <input type="email" className="form-control" placeholder="Adresse email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-unlock-alt"></i></span>
                                    <input type="password" className="form-control" placeholder="Mot de passe..." value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block">Se connecter</button>
                        </form>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login