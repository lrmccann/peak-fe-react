import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from '../../utils/Context';
import peakIcon from "../../images/peak-new-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import API from "../../utils/API";

export default function NavbarTop() {
  const history = useHistory();
  const location = useLocation().pathname;
  const { user } = useContext(UserContext);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [homeNavLink, setHomeNavLink] = useState();
  const [bookmarkNavLink, setBookmarkNavLink] = useState();
  const [createPostNavLink, setCreatePostNavLink] = useState();
  const [accountNavLink, setAccountNavLink] = useState();
  const [navShown, setNavShown] = useState('visible');

// use effect to set state of user icon
useEffect(() => {
  const loadUserIcon = async () => {
  if(iconLoaded === false) {
    await API.getUserInfo(user.id).then((res) => {
      if(res.status === 200){
        setUserIcon(`${res.data.icon}`);
      }else{
        setInterval(() => {
          if(userIcon === null){
          loadUserIcon(user.id);
          } else{
            setIconLoaded(true);
          }
        }, 2 * 1200)
      }
    })
  }else if(iconLoaded === true){
    setUserIcon(`${user.icon}`)
  }
}
loadUserIcon();
}, [iconLoaded])

useEffect(() => {
  if(Object.keys(user).length){
    setIconLoaded(true);
  }else{
    setIconLoaded(false);
  }
},[user])
//
useEffect(() => {
  if(clicked === null){
    setHomeNavLink(<FontAwesomeIcon className="active-route-icon" icon={faHome}></FontAwesomeIcon>);
    setBookmarkNavLink(<FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>);
    setCreatePostNavLink(<p>Write</p>);
  } else if(clicked === false) {
      return uncheckRoute(location);
  } else if(clicked === true){
    return checkRoute(location);
  }
}, [clicked])

const checkRoute = (path) => {
  if (path === undefined || path === null) {
    alert('Error, please refresh page and try again');
  } else {
      if(path === '/home'){
            setHomeNavLink(<FontAwesomeIcon className="active-route-icon" icon={faHome}></FontAwesomeIcon>)
          } else if(path === '/indepthpost'){
            setHomeNavLink(<FontAwesomeIcon className="active-route-icon" icon={faHome}></FontAwesomeIcon>);
            setBookmarkNavLink(<FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>);
            setCreatePostNavLink(<p>Write</p>);
          } else if(path === '/createPost'){
            setCreatePostNavLink(<p className= "active-write-btn">Write</p>);
          } else if(path === 'myaccount'){
              setNavShown('hidden');
          } else if(path === '/bookmarks'){
              setBookmarkNavLink(<FontAwesomeIcon id='' className="active-route-icon" icon={faBookmark}></FontAwesomeIcon>)
          }
}
}

const uncheckRoute = (oldPath) => {
  if(oldPath === '/home'){

  } else if(oldPath === '/indepthpost'){

  } else if(oldPath === '/createPost'){

  } else if(oldPath === 'myaccount'){

  } else if(oldPath === '/bookmarks'){
    
  }
}

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
      <main className="nav-cont container-fixed" style={{visibility : `${navShown}`}}>
        <div>
          <div className="logo-cont">
            <img src={peakIcon} alt="Peak Icon"></img>
          </div>
          {/* <div className="search-cont">
            <FontAwesomeIcon className="search-btn" icon={faSearch}></FontAwesomeIcon>
            <input className="search-input"></input>
          </div> */}
          <div className="btn-cont container-fixed">
            <button 
              className="nav-button"
              id="home-btn"
              onClick={navHome}
            >
              {homeNavLink}
            </button>
            <button
              className="nav-button"
              id="bookmark-btn"
              onClick={navBookmarks}
            >
              {bookmarkNavLink}
            </button>
            <button
              className="nav-button"
              id="write-btn"
              onClick={navCreatePost}
            >
              {createPostNavLink}
            </button>
            <button 
            className="nav-button" 
            id="act-btn"
            onClick={navAccount}
            >
              <img src={userIcon} alt={"Your Profile"}></img>
            </button>
            {/* <button id="nav-button" onClick={navLogout}>
              <p>Log Out</p>
            </button> */}
          </div>
        </div>
      </main>
    );
}
