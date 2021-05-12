import React, { useState, useRef, useContext, useEffect } from "react";
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
import "./style.css";

export default function NavbarTop() {
  const history = useHistory();
  // const [newBlogOpen, setNewBlogOpen] = useState(false);
  // const [fileName, setFileName] = useState();
  // const [selectedFile, setSelectedFile] = useState();
  // const [imgVisibility , setImgVisibility] = useState('hidden');
  // const [imgSrc , setImgSrc] = useState("");
  // const [imgSelected , setImgSelected] = useState(false);
  // const [welcomeMsg, setWelcomeMsg] = useState("Welcome");

  // Refs for new blog post
  // const imgHeader = useRef(null);
  // const blogTitle = useRef(null);
  // const blogBody = useRef(null);
  // const inputFile = useRef(null);

//   useEffect(() => {
//     if(imgSelected === true){
//       setImgSrc()
//       return setImgVisibility('visible');
//     }else{
//       console.log("use effect else")
//       // setImgSrc("");
//       // return setImgVisibility('hidden');
//     }
//   }, [imgSelected])

//   // Screen nav
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
  const navLogout = () => {
    localStorage.clear();
    history.push("/");
  };
//   // open new blog modal
//   const openBlog = () => {
//     setNewBlogOpen(true);
//   };
//   const closeBlog = () => {
//     setNewBlogOpen(false);
//   };

//   const retrieveFile = () => {
//     const inputElement = document.getElementById("input");
//     inputElement.addEventListener("change", handleFiles, false);
//     function handleFiles() {
//       const fileList = this.files;
//       if(fileList.length === 0 || fileList === null){
//         alert("Error Loading File, Please Try Again")
//       }else{
//         let dataUrl = URL.createObjectURL(fileList[0]);
//           setImgSrc(dataUrl);
//           setImgSelected(true);
//           setFileName(fileList[0].name);
//           return setSelectedFile(fileList[0]);
//       }
//     }
//   };
//   const openDialogue = () => {
//     inputFile.current.click();
//     retrieveFile();
//   };

// // Blog Image Functions - Send and Receive from AWS
// const savePostToSQL = async (imgUrl, blogObj) => {
//   const userId = localStorage.getItem("loggedInUserId")
//   const finalBlogObj = {
//       "headerImg" : imgUrl,
//       "blogTitle" : blogObj.blogTitleToSend,
//       "blogBody" : blogObj.blogBodyToSend,
//       "userId" : userId
//   }
//   await API.postNewBlog(finalBlogObj).then((res) => {
//     if(res.status === 202){
//       alert("Blog created successfully!");
//       setNewBlogOpen(false);
//     }
//   })
// }

// const sendImgToPost = async (titleNoSpaces, something, blogObj) => {
//   if(something === null){
//     setTimeout(() => {
//         sendImgToPost(titleNoSpaces);
//         console.log("failed data url =" , titleNoSpaces)
//     }, 2 * 500);
//   }else{
//   const imageType = (selectedFile.type.replace("image/", ""));
//   const base64Data = new Buffer.from(something.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//     await API.postBlogImg(base64Data, imageType, titleNoSpaces).then((error , response) => { 
//     if(error === undefined){
//       setTimeout(() => {
//         if(error.status !== 202){
//           alert("There was an error uploading your image")
//         }else if(error.status === 202){
//           savePostToSQL(error.data , blogObj)
//         }
//       }, 2 * 1200);
//     }else{
//       if(error.status !== 202){
//         alert("There was an error uploading your image")
//       }else if(error.status === 202){
//         savePostToSQL(error.data , blogObj )
//       }
//     }
//     })
//   }
// }
 
//   const checkFileType = async (blogObj) => {
//     if(selectedFile.type === "application/pdf" || selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === "image/jpeg"){
//       let fileTypeAfterReplace = ((`${selectedFile.type}`).split("/").pop());
//       let blogTitleNoSpaces = ((`${blogObj.blogTitleToSend}`).replace(/\s/g, ''));
//       if(fileTypeAfterReplace === null){
//         return console.log("file did not de stringify")
//       }else{
//         const reader = new FileReader();
//       reader.readAsDataURL(selectedFile);
//       reader.onload =  function(){
//         sendImgToPost(blogTitleNoSpaces, reader.result , blogObj);
//       }
//       reader.onerror = function(){
//         console.log(reader.error, "on error load")
//       }
//       }
//     }else{
//       alert("Please Select From png, jpg, jpeg, or pdf");
//     }
//   }

//   const handleBlogPost = async () => {
//     var imgHeaderToSend = imgHeader.current.value;
//     var blogTitleToSend = blogTitle.current.value;
//     var blogBodyToSend = blogBody.current.value;

//         var blogInfoToCheck = {
//       imgHeaderToSend,
//       blogTitleToSend,
//       blogBodyToSend
//     };
//     if(blogInfoToCheck.blogBodyToSend === null || blogInfoToCheck.blogBodyToSend === "" || blogInfoToCheck.imgHeaderToSend === null || blogInfoToCheck.imgHeaderToSend === "" ){
//       console.log("blog obj not full")
//     }else{
//       checkFileType(blogInfoToCheck);
//     }
//     }

  // if (newBlogOpen === false) {
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
            // onClick={openBlog}
            onClick={navCreatePost}
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
  // } 
  // else if (newBlogOpen === true) {
  //   return (
  //     <div className="modal-background container">
  //       <div className="new-post-modal">
  //         <button className="close-modal-btn" onClick={closeBlog}>
  //           X
  //         </button>
  //         <button className="open-dialog-btn" onClick={openDialogue}>
  //           <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
  //           <input
  //             type="file"
  //             id="input"
  //             ref={inputFile}
  //             style={{ display: "none" }}
  //           ></input>
  //         </button>
  //         <h6 style={{ marginTop: "2%" }} id="category-text">
  //           Image Header
  //         </h6>
  //         <img src={imgSrc} alt="Selected File" style={{visibility : imgVisibility , height: '200px' , width: '200px' }} ></img>
  //         <input id="modal-input" ref={imgHeader} type="text" className="imgInput" defaultValue={fileName}></input>
  //         <h6 className="category-text">Title</h6>
  //         <input id="modal-input" ref={blogTitle}></input>
  //         <h6 style={{ marginLeft: "8%" }}>Body</h6>
  //         <textarea
  //           id="modal-input"
  //           ref={blogBody}
  //           className="body-input"
  //         ></textarea>
  //         <button
  //           style={{ cursor: "pointer" }}
  //           onClick={handleBlogPost}
  //           className="submit-blog-btn"
  //         >
  //           Create Post
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
}
