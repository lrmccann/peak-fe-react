import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../components/Loading/index";
import API from "../utils/API";

export default function CreatePost() {
  // state to update text in file select input
  const [fileName, setFileName] = useState();
  // state for selected file to convert to base 64 and send
  const [selectedFile, setSelectedFile] = useState();
  // state to load preview image of blog img
  const [imgSelected, setImgSelected] = useState(null);
  const [imgVisibility, setImgVisibility] = useState("hidden");
  const [imgSrc, setImgSrc] = useState("");
  // loading state for page
  const [loading, setLoading] = useState(false);
  // state to reset blog input refs on successful blog post
  const [blogPosted, setBlogPosted] = useState(false);
  // refs for blog input
  const imgHeader = useRef(null);
  const blogTitle = useRef(null);
  const blogBody = useRef(null);
  const inputFile = useRef(null);

  useEffect(() => {
    if (imgSelected === true) {
      return setImgVisibility("visible");
    } else {
      setImgSrc("");
      return setImgVisibility("hidden");
    }
  }, [imgSelected]);

  useEffect(() => {
    if (blogPosted === true) {
        setImgVisibility("hidden");
        setImgSrc("");
        setFileName("")
    }
  }, [blogPosted]);

  const retrieveFile = () => {
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      const fileList = this.files;
      if (fileList.length === 0 || fileList === null) {
          setImgSelected(false);
        return alert("Error Loading File, Please Try Again");
      } else {
        let dataUrl = URL.createObjectURL(fileList[0]);
        setImgSrc(dataUrl);
        setImgSelected(true);
        setFileName(fileList[0].name);
        return setSelectedFile(fileList[0]);
      }
    }
  };
  const openDialogue = () => {
    inputFile.current.click();
    retrieveFile();
  };

  // Blog Image Functions - Send and Receive from AWS
  const savePostToSQL = async (imgUrl, blogObj) => {
    const userId = localStorage.getItem("loggedInUserId");
    const finalBlogObj = {
      headerImg: imgUrl,
      blogTitle: blogObj.blogTitleToSend,
      blogBody: blogObj.blogBodyToSend,
      userId: userId,
    };
    await API.postNewBlog(finalBlogObj).then((res) => {
      if (res.status === 200) {
        setBlogPosted(true);
        alert("Blog created successfully!");
        return setLoading(false);
      }else{
          setBlogPosted(false);
      }
    });
  };

  const sendImgToPost = async (titleNoSpaces, fileType , fileData, blogObj) => {
    if (fileData === null) {
      setTimeout(() => {
        checkFileType(blogObj);
      }, 2 * 500);
    } else {
      const base64Data = new Buffer.from(
        fileData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      await API.postBlogImg(base64Data, fileType, titleNoSpaces).then(
        (response) => {
          if (response === undefined) {
            setTimeout(() => {
              if (response.status !== 200) {
                alert("There was an error uploading your image");
              } else if (response.status === 200) {
                savePostToSQL(response.data, blogObj);
              }
            }, 2 * 800);
          } else {
            if (response.status !== 200) {
              alert("There was an error uploading your image");
            } else if (response.status === 200) {
              savePostToSQL(response.data, blogObj);
            }
          }
        }
      );
    }
  };

  const checkFileType = async (blogObj) => {
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      let fileTypeAfterReplace = `${selectedFile.type}`.replace("image/", "");
      let blogTitleNoSpaces = `${blogObj.blogTitleToSend}`.replace(/\s/g, "");
      if (fileTypeAfterReplace === null) {
        return alert("file did not de stringify");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function () {
          sendImgToPost(blogTitleNoSpaces, fileTypeAfterReplace , reader.result, blogObj);
        };
        reader.onerror = function () {
          return console.log(reader.error, "on error load");
        };
      }
    } else {
      alert("Please Select From png, jpg, jpeg, or pdf");
    }
  };

  const handleBlogPost = async () => {
    let imgHeaderToSend = imgHeader.current.value;
    let blogTitleToSend = blogTitle.current.value;
    let blogBodyToSend = blogBody.current.value;

    let blogInfoToCheck = {
      imgHeaderToSend,
      blogTitleToSend,
      blogBodyToSend,
    };
    if (
      blogInfoToCheck.blogBodyToSend === null ||
      blogInfoToCheck.blogBodyToSend === "" ||
      blogInfoToCheck.imgHeaderToSend === null ||
      blogInfoToCheck.imgHeaderToSend === ""
    ) {
      alert("Please fill out all forms to post a blog!")
    } else {
      setLoading(true);
      checkFileType(blogInfoToCheck);
    }
  };

  if (loading) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <div>
        <div className="modal-background container">
          <div className="new-post-modal">
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
            <img
              src={imgSrc}
              alt="Selected File"
              style={{
                visibility: imgVisibility,
                height: "200px",
                width: "200px",
              }}
            ></img>
            <input
              id="modal-input"
              ref={imgHeader}
              type="text"
              className="imgInput"
              defaultValue={fileName}
            ></input>
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
      </div>
    );
  }
}
