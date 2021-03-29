import React, { useContext, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from '../utils/Context';
import photo from "../images/peak-blogspace-icon.png";
import '../stylesheets/login.css';

// if(process.env.NODE_ENV === "production"){
//     import API from "main.968702f6.chunk.js";
// }

const Login = () => {

    const history = useHistory();

    const { getUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const rememberMeRef = useRef(null);


    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    const checkCredentialValidity = e => {
        e.preventDefault();
        if (usernameRef.current.value === "") {
            alert("Please Enter Username")
        } else if (usernameRef.current.value < 8 || usernameRef.current.value > 20) {
            alert("Please Meet Username Requirements")
        } else if (passwordRef.current.value === "") {
            alert("Please Enter Password")
        } else if (passwordRef.current.value < 8 || passwordRef.current.value > 20) {
            alert("Please Meet Password Requirements")
        } else {
            checkSqlForUser()
        }
    }
    const checkSqlForUser = async (username, password) => {
        await API.loginUser(
            username = usernameRef.current.value,
            password = passwordRef.current.value
        )
            .then(async function (res) {
                if (res.data === "Invalid Username or Password") {
                    alert("Invalid Username or Password, Please Try Again")
                    return
                } else {
                    getUser(res.data.results)
                    history.push('/home')
                }
            })
    }
    const navSignup = () => {
        history.push('/signup')
    }
    if (show === false) {
        return (
            <div className="login-page container">
                <div className="div-left">
                </div>
                <div className="icon-div">
                    <img src={photo} alt="Peak Icon"></img>
                </div>
                <div className="intro-text-cont">
                    <h1>Peak Blog Space</h1>
                    <div className="line"></div>
                    <h4>Lorem ipsum dolor sit amet, conse ctetur adipis cing elit. Pellen tesque pretium enim at nisl luctus effic itur.</h4>
                </div>
                <div className="btn-holder">
                    <button className="loginBtn">
                        <h2 className="loginBtnText" onClick={showModal}>Login</h2>
                    </button>
                    <button className="signupBtn">
                        <h2 className="signupBtnText" onClick={navSignup}>Sign up</h2>
                    </button>
                </div>
            </div>
        )
    } else if (show === true) {
        return (
            <div className="container-fluid login-page">
                <div className="loginModalTwo">
                    <div className="loginModalHeader">
                        <h2>Sign In</h2>
                        <button className="closeModalBtn" onClick={hideModal}>
                            <h1 className="modalXBtn">X</h1>
                        </button>
                    </div>
                    <div className="loginModalBody">
                        <div className="inputFields">
                            <input type="text" className="userNameInput" id="inputLoginText" ref={usernameRef} placeholder="Username(8-20 Characters)"></input>
                            <input type="password" className="passwordInput" id="inputLoginText" ref={passwordRef} placeholder="Password(8-20 Characters)"></input>
                        </div>
                        <label className="rememberMeDiv">
                            <div className="rememberMeCont">
                                <h4>Remember me</h4>
                                <input type="checkbox" ref={rememberMeRef}></input>
                            </div>
                            <button className="forgotPasswordBtn">
                                <p className="forgotPassBtn">Forgot Password?</p>
                            </button>
                        </label>
                        <div className="myCont">
                            <button className="modalLogin" onClick={checkCredentialValidity}>
                                <h3 className="modalFinalLoginBtn">Login</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;