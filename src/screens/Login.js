import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/Context";
import photo from "../images/peak-new-icon.png";
import LoadingPage from "../components/Loading/index";
import "../stylesheets/login.css";

export default function Login() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState("hidden");

  const usernameRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  // verifying credentials with sql and argon2
  const checkSqlForUser = async (username, password) => {
    await API.loginUser(
      (username = usernameRef.current.value),
      (password = passwordRef.current.value)
    )
      .then(async function (res) {
        console.log(res, "REPSONSE IF ERROR MAYBE");
        if (res.status === 200) {
          document.cookie = res.data.sessToken;
          setUser(res.data.userData);
          localStorage.setItem("loggedInUserId", res.data.userData.id);
          //////  maybe set something here for app auth
          history.push("/home");
        }
      })
      .catch(() => {
        setInvalidInfo("visible");
        setTimeout(() => {
          setLoading(false);
          showModal();
        }, 2 * 600);
      });
  };

  // checking input values to validate that all have been filled
  const checkCredentialValidity = (e) => {
    e.preventDefault();
    setLoading(true);
    if (usernameRef.current.value === "") {
      setLoading(false);
      return alert("Please Enter Username");
    } else if (
      usernameRef.current.value < 8 ||
      usernameRef.current.value > 20
    ) {
      setLoading(false);
      return alert("Please Meet Username Requirements");
    } else if (passwordRef.current.value === "") {
      setLoading(false);
      return alert("Please Enter Password");
    } else if (
      passwordRef.current.value < 8 ||
      passwordRef.current.value > 20
    ) {
      setLoading(false);
      return alert("Please Meet Password Requirements");
    } else {
      return checkSqlForUser();
    }
  };

  const navSignup = () => {
    history.push("/signup");
  };

  if (loading === true) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    if (!show) {
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
    } else {
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
                <p
                  style={{
                    color: "red",
                    textDecoration: "underline",
                    alignSelf: "center",
                    visibility: invalidInfo,
                  }}
                >
                  Incorrect Username or Password
                </p>
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
  }
}
