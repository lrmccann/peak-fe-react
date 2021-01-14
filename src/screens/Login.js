import React, { useContext, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import '../stylesheets/loginOutput.css';
import UserContext from '../utils/Context';


 const Login = () => {
    
    // console.log(process.env)
    const history = useHistory();

    const {getUser} = useContext(UserContext);

    const [show, setShow] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const rememberMeRef = useRef(null);


    const showModal = () => {
        setShow(true);
        console.log(show)
    }

    const hideModal = () => {
        setShow(false);
    }

    const checkCredentialValidity = e => {
        e.preventDefault();
        if(usernameRef.current.value === ""){
            alert("Please Enter Username")
        }else if(usernameRef.current.value < 8 || usernameRef.current.value > 20 ){
            alert("Please Meet Username Requirements")
        }else if(passwordRef.current.value === "") {
            alert("Please Enter Password")
        }else if(passwordRef.current.value < 8 || passwordRef.current.value > 20) {
            alert("Please Meet Password Requirements")
        }else{
            checkSqlForUser()
        }
        // const data = {
        //     username: usernameRef.current.value,
        //     password: passwordRef.current.value,
        //     rememberMe: rememberMeRef.current.value
        // }
    }
    const checkSqlForUser = async (username , password) => {
        await API.loginUser(
            username = usernameRef.current.value,
            password = passwordRef.current.value
        )
        .then(async function(res){
            console.log(res)
            if(res.data === "Invalid Username or Password" ){
                alert("Invalid Username or Password, Please Try Again")
                return
            }else{
                getUser(res.data.results)
                history.push('/home')
            }
        })
    }
    if (show === false) {

        return (
            <div className="container-fluid loginPage">
                <div className="navBar">
                    <div className="navCont-flex">
                        <button className="loginBtn" style={{ cursor: "pointer" }} id="navBtn" onClick={showModal}>
                            <p id="navBarBtnText">Login</p>
                        </button>
                        <button className="signUpBtn" id="navBtn">
                            <p id="navBarBtnText">Sign Up</p>
                        </button>
                        <button className="donateBtn" id="navBtn">
                            <p id="navBarBtnText">Donate</p>
                        </button>
                        <button className="aboutUsBtn" id="navBtn">
                            <p id="navBarBtnText">About Us</p>
                        </button>
                        <div className="myInfoDiv">
                            <h2 id="navBarBtnTextTwo">Logan McCann</h2>
                            <h3 id="navBarBtnTextTwo">Web Dev</h3>
                        </div>
                    </div>
                </div>
                <div className="flexColumnCont">
                    <div className="quoteCont">
                        <h1 className="quoteText">"Blogging is a conversation, not a code"</h1>
                        <p className="quoteTextTwo"> - Mike Butcher</p>
                    </div>
                </div>
            </div>
        )
    } else if (show === true) {
        return (
            <div className="container-fluid loginPage">
                <div className="navBar">
                    <div className="navCont-flex">
                        <button className="loginBtn" style={{ cursor: "pointer" }} id="navBtn">
                            <p id="navBarBtnText">Login</p>
                        </button>
                        <button className="signUpBtn" id="navBtn">
                            <p id="navBarBtnText">Sign Up</p>
                        </button>
                        <button className="donateBtn" id="navBtn">
                            <p id="navBarBtnText">Donate</p>
                        </button>
                        <button className="aboutUsBtn" id="navBtn">
                            <p id="navBarBtnText">About Us</p>
                        </button>
                        <div className="myInfoDiv">
                            <h2 id="navBarBtnTextTwo">Logan McCann</h2>
                            <h3 id="navBarBtnTextTwo">Web Dev</h3>
                        </div>
                    </div>
                </div>
                <div className="flexColumnCont">
                    <div className="quoteCont">
                        <h1 className="quoteText">"Blogging is a conversation, not a code"</h1>
                        <p className="quoteTextTwo"> - Mike Butcher</p>
                    </div>
                </div>
                <div className="loginModalTwo">
                    <div className="loginModalHeader">
                        <button className="closeModalBtn" onClick={hideModal}>
                            <h1 className="modalXBtn">X</h1>
                        </button>
                    </div>
                    <div className="loginModalBody">
                        <input type="text" className="userNameInput" id="inputLoginText" ref={usernameRef} placeholder="Username(8-20 Characters)"></input>
                        <input type="password" className="passwordInput" id="inputLoginText" ref={passwordRef} placeholder="Password(8-20 Characters)"></input>
                        <label className="rememberMeDiv">
                            <h4>Remember me</h4>
                            <input type="checkbox" ref={rememberMeRef}></input>
                        </label>
                        <button className="forgotPasswordBtn">
                            <p className="forgotPassBtn">Forgot Password?</p>
                        </button>
                        <button className="modalLogin" onClick={checkCredentialValidity}>
                            <h3 className="modalFinalLoginBtn">Login</h3>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;