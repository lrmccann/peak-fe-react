import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/Context";
import photo from "../images/peak-blogspace-icon.png";
import "../stylesheets/login.css";

export default function Login () {
  const history = useHistory();
  const { getUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const checkCredentialValidity = (e) => {
    e.preventDefault();
    if (usernameRef.current.value === "") {
      alert("Please Enter Username");
    } else if (
      usernameRef.current.value < 8 ||
      usernameRef.current.value > 20
    ) {
      alert("Please Meet Username Requirements");
    } else if (passwordRef.current.value === "") {
      alert("Please Enter Password");
    } else if (
      passwordRef.current.value < 8 ||
      passwordRef.current.value > 20
    ) {
      alert("Please Meet Password Requirements");
    } else {
      checkSqlForUser();
    }
  };
  const checkSqlForUser = async (username, password) => {
    await API.loginUser(
      (username = usernameRef.current.value),
      (password = passwordRef.current.value)
    ).then(async function (res) {
      if (res.data === "Invalid Username or Password") {
        alert("Invalid Username or Password, Please Try Again");
        return;
      } else {
        getUser(res.data);
        localStorage.setItem("loggedInUserId" , res.data.id)
        history.push("/home");
      }
    });
  };
  const navSignup = () => {
    history.push("/signup");
  };
  if (show === false) {
    return (
      <div className="login-page container">
        <div className="div-left"></div>
        <div className="icon-div">
          <img src={photo} alt="Peak Icon"></img>
        </div>
        <div className="intro-text-cont">
          <h1>Peak Blog Space</h1>
          <div className="line"></div>
          <h4>
            Lorem ipsum dolor sit amet, conse ctetur adipis cing elit. Pellen
            tesque pretium enim at nisl luctus effic itur.
          </h4>
        </div>
        <div className="btn-holder">
          <button className="login-btn">
            <h2 onClick={showModal}>Login</h2>
          </button>
          <button className="signup-btn">
            <h2 onClick={navSignup}>Sign up</h2>
          </button>
        </div>
      </div>
    );
  } else if (show === true) {
    return (
      <div className="login-page container-fluid">
        <div className="login-modal">
          <div className="login-modal-header">
            <h2>Sign In</h2>
            <button className="close-modal-btn" onClick={hideModal}>
              <h1>X</h1>
            </button>
          </div>
          <div className="login-modal-body">
            <div className="input-fields">
              <input
                type="text"
                id="input-text"
                ref={usernameRef}
                placeholder="Username(8-20 Characters)"
              ></input>
              <input
                type="password"
                id="input-text"
                ref={passwordRef}
                placeholder="Password(8-20 Characters)"
              ></input>
            </div>
            <label className="login-options-cont">
              <div>
                <h4>Remember me</h4>
                <input type="checkbox" ref={rememberMeRef}></input>
              </div>
              <button className="forgot-pass-btn">
                <p className="forgotPassBtn">Forgot Password?</p>
              </button>
            </label>
            <div className="login-modal-btn">
              <button onClick={checkCredentialValidity}>
                <h3>Login</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
