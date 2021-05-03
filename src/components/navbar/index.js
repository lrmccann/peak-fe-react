import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import UserContext from "../../utils/Context";
import photoThree from "../../images/profile-icon-def.png";
import peakIcon from "../../images/peak-new-icon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHome } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

export default function NavbarTop() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [newBlogOpen, setNewBlogOpen] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState("Welcome");
  // Refs for new blog post
  const imgHeader = useRef(null);
  const blogTitle = useRef(null);
  const blogBody = useRef(null);
  // Screen nav
  const navHome = () => {
    history.push("/home");
  };
  const navBookmarks = () => {
    history.push("/bookmarks")
  }
  const navAccount = () => {
    history.push("/myaccount");
  };
  const navLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  // open new blog modal
  const openBlog = () => {
    setNewBlogOpen(true);
  };
  const closeBlog = () => {
    setNewBlogOpen(false);
  };

  useEffect(()=> {
    setTimeout(() => {
        setWelcomeMsg(" ");
    }, 2 * 2000)
  })

  const handleBlogPost = async (e) => {
    e.preventDefault();
    var resultsInFullScope = {};
    var imgHeaderToSend = imgHeader.current.value;
    var blogTitleToSend = blogTitle.current.value;
    var blogBodyToSend = blogBody.current.value;
    var userIdToSend = localStorage.getItem("loggedInUserId");


    var blogInfoToSend = {
      imgHeaderToSend,
      blogTitleToSend,
      blogBodyToSend,
      userIdToSend,
    };

    console.log(blogInfoToSend, "blog info to send to server")
    await API.postNewBlog({ blogInfoToSend }).then((res) => {
      resultsInFullScope = res;
    });
    if (resultsInFullScope.status === 202) {
      setNewBlogOpen(false);
    } else {
      alert(
        "An error occurred while posting your blog, please try again later."
      );
    }
  };

  if (newBlogOpen === false) {
    return (
      <div className="navbar-cont">
        <div className="logo-cont">
          <img src={peakIcon} alt="Peak Icon"></img>
          <h1>{welcomeMsg}</h1>
        </div>
        {/* <div className="new-post-btn">
          <button className="postBtnForReal" onClick={openBlog}>
            <h3>New Post</h3>
          </button>
        </div> */}
        <div className="nav-btn-cont">
          <button style={{fontSize: "32.5px"}} id="nav-button" onClick={navHome}>
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          </button>
          <button style={{fontSize: "30px"}} id="nav-button" onClick={navBookmarks}>
            <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
          </button>
          <button style={{marginRight: "1%"}} id="nav-button" onClick={openBlog}>
            <p>Write</p>
          </button>
          <button id="nav-button" onClick={navAccount}>
            <img src={photoThree} alt={"Your Profile"}></img>
          </button>
          {/* <button id="nav-button" onClick={navLogout}>
            <p>Log Out</p>
          </button> */}
        </div>
      </div>
    );
  } else if (newBlogOpen === true) {
    return (
      <div className="modal-background container">
        <div className="new-post-modal">
          <button className="close-modal-btn" onClick={closeBlog}>
            X
          </button>
          <button className="open-dialog-btn">
            <i className="fas fa-search"></i>
          </button>
          <h6 style={{ marginTop: "2%" }} id="category-text">
            Image Header
          </h6>
          <input id="modal-input" ref={imgHeader} className="imgInput"></input>
          <h6 className="category-text">Title</h6>
          <input
            id="modal-input"
            ref={blogTitle}
          ></input>
          <h6 style={{ marginLeft: "8%" }}>Body</h6>
          <textarea
            id="modal-input"
            ref={blogBody}
            className="body-input"
          ></textarea>
          <button
            style={{ cursor: "pointer" }}
            onClick={handleBlogPost}
            className="submit-blog-btn"
          >
            Create Post
          </button>
        </div>
      </div>
    );
  }
}
