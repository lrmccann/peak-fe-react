import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import UserContext from "../../utils/Context";
import peakIcon from "../../images/peak-blogspace-icon.png";
import "./style.css";

export default function NavbarTop() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [newBlogOpen, setNewBlogOpen] = useState(false);
  // Refs for new blog post
  const imgHeader = useRef(null);
  const blogTitle = useRef(null);
  const blogBody = useRef(null);
  // Screen nav
  const navHome = () => {
    history.push("/home");
  };
  const navAccount = () => {
    history.push("/myaccount");
  };
  const navMyPosts = () => {
    history.push("/myposts");
  };
  const navLogout = () => {
    history.push("/");
  };
  // open new blog modal
  const openBlog = () => {
    setNewBlogOpen(true);
  };
  const closeBlog = () => {
    setNewBlogOpen(false);
  };

  const handleBlogPost = async (e) => {
    e.preventDefault();
    var resultsInFullScope = {};
    var imgHeaderToSend = imgHeader.current.value;
    var blogTitleToSend = blogTitle.current.value;
    var blogBodyToSend = blogBody.current.value;
    var userIdToSend = await user[0].id;

    var blogInfoToSend = {
      imgHeaderToSend,
      blogTitleToSend,
      blogBodyToSend,
      userIdToSend,
    };
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
        </div>
        <div className="new-post-btn">
          <button className="postBtnForReal" onClick={openBlog}>
            <h3>New Post</h3>
          </button>
        </div>
        <div className="nav-btn-cont">
          <button id="nav-button" onClick={navHome}>
            <p>Home</p>
          </button>
          <button id="nav-button" onClick={navAccount}>
            <p>Account</p>
          </button>
          <button id="nav-button" onClick={navLogout}>
            <p>Log Out</p>
          </button>
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
