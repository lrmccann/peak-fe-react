import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import photoThree from "../../images/profile-icon-def.png";
import peakIcon from "../../images/peak-new-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faFile,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {awsConfigBlog} from '../../utils/awsCongif';
import "./style.css";
import { dirname } from "path";

const { S3Client, PutObjectCommand } = require("aws-sdk/clients/s3");
const path = require("path");
const fs = require("fs");


const REGION = awsConfigBlog.region;

// var AWS = require('aws-sdk');

export default function NavbarTop() {
  const history = useHistory();
  const [newBlogOpen, setNewBlogOpen] = useState(false);
  const [awsLinkToSend, setAwsLinkToSend] = useState();
  const [newFileInput, setNewFileInput] = useState();
  // const [welcomeMsg, setWelcomeMsg] = useState("Welcome");

  // Refs for new blog post
  const imgHeader = useRef(null);
  const blogTitle = useRef(null);
  const blogBody = useRef(null);
  const inputFile = useRef(null);

  // const s3 = new AWS.S3({
  //   signatureVersion : 'v4',
  //   region: awsConfigBlog.region
  // })


  // Screen nav
  const navHome = () => {
    history.push("/home");
  };
  const navBookmarks = () => {
    history.push("/bookmarks");
  };
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

  // Blog Image Functions - Send and Receive from AWS

  const checkFileType = (files) => {
    // console.log(files);
    if(files.type === "application/pdf" || files.type === "image/jpg" || files.type === "image/png" || files.type === "image/jpeg"){
      // var savePostWithFile = files
        setNewFileInput(files.name);
      return setAwsLinkToSend(files);
    }else{
      alert("Please Select From png, jpg, jpeg, or pdf");
    }
  }

  const retrieveFile = () => {
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      const fileList = this.files;
      if(fileList.length === 0 || fileList === null){
        alert("Error Loading File, Please Try Again")
      }else{
          checkFileType(fileList[0])
      }
    }
  };
  const openDialogue = () => {
    inputFile.current.click();
    retrieveFile();
  };

  //

  const tryAwsPost = async (dataSend) => {
    const s3 = new S3Client({region : REGION})

    try {
      const data = await s3.send(new PutObjectCommand(dataSend));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
    }
  }

  const handleBlogPost = async () => {
    let ext = path.extname(newFileInput)
    console.log(ext);
    let keyToSend = `${__dirname}/${newFileInput}`;
    console.log(keyToSend)
    // const fileStream = fs.createReadStream(keyToSend)
    const uploadParams = {
      Bucket : awsConfigBlog.bucketName,
      Key: newFileInput,
      Body: awsLinkToSend
    }
    console.log(uploadParams, "upload params");
      tryAwsPost(awsLinkToSend);
  }

  const sendAwsToBucket = async (e) => {
    // e.preventDefault();
    var resultsInFullScope = {};
    // var imgHeaderToSend = imgHeader.current.value;
    var imgHeaderToSend = awsLinkToSend;
    var blogTitleToSend = blogTitle.current.value;
    var blogBodyToSend = blogBody.current.value;
    var userIdToSend = localStorage.getItem("loggedInUserId");

    var blogInfoToSend = {
      imgHeaderToSend,
      blogTitleToSend,
      blogBodyToSend,
      userIdToSend,
    };

    // console.log(blogInfoToSend, "blog info to send to server");
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
            onClick={openBlog}
          >
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
          <button className="open-dialog-btn" onClick={openDialogue}>
            <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
            <input
              type="file"
              id="input"
              ref={inputFile}
              style={{ display: "none" }}
            ></input>
          </button>
          <h6 style={{ marginTop: "2%" }} id="category-text">
            Image Header
          </h6>
          <input id="modal-input" ref={imgHeader} className="imgInput" defaultValue={newFileInput}></input>
          <h6 className="category-text">Title</h6>
          <input id="modal-input" ref={blogTitle}></input>
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
