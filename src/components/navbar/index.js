import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../../utils/Context';
import peakIcon from "../../images/peak-new-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function NavbarTop() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [userIcon, setUserIcon] = useState(null);

// use effect to set state of user icon
useEffect(() => {
  console.log(userIcon, "look here")
  if(iconLoaded === false) {
    return setUserIcon("")
  }else if(iconLoaded === true){
    setUserIcon(`${user.icon}`)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [iconLoaded])

useEffect(() => {
  if(Object.keys(user).length){
    setIconLoaded(true);
  }else{
    setIconLoaded(false);
  }
},[user])
//
// Screen nav
  const navHome = () => {
    history.push("/home");
  };
  const navBookmarks = () => {
    history.push("/bookmarks");
  };
  const navCreatePost = () => {
    history.push("/createPost");
  };
  const navAccount = () => {
    history.push("/myaccount");
  };
  // const navLogout = () => {
  //   localStorage.clear();
  //   history.push("/");
  // };
//
    return (
      <div className="navbar-cont">
        <div className="logo-cont">
          <img src={peakIcon} alt="Peak Icon"></img>
          {/* <h1>{welcomeMsg}</h1> */}
        </div>
        <div className="nav-btn-cont">
          <button
            style={{ fontSize: "32.5px" }}
            id="nav-button"
            onClick={navHome}
          >
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          </button>
          <button
            style={{ fontSize: "30px" }}
            id="nav-button"
            onClick={navBookmarks}
          >
            <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
          </button>
          <button
            style={{ marginRight: "1%" }}
            id="nav-button"
            onClick={navCreatePost}
          >
            <p>Write</p>
          </button>
          <button id="nav-button" onClick={navAccount}>
            <img src={userIcon} alt={"Your Profile"}></img>
          </button>
          {/* <button id="nav-button" onClick={navLogout}>
            <p>Log Out</p>
          </button> */}
        </div>
      </div>
    );
}
