import React, { useContext, useEffect, useRef, useState } from "react";
import API from "../utils/API";
import profIcon from "../images/profile-icon-def.png";
import UserContext from "../utils/Context";
import "../stylesheets/inDepthPost.css";

export default function InDepthPost() {
  const { detailedPost, getDetailedPost } = useContext(UserContext);
  const [loading, isLoading] = useState(true);
  const [visibilityCond, setVisibility] = useState("visible");

  var commentArr = [];
  var authName = "";
  var postMapped = "";

  let newObj = {
    authUsername: "",
    postData: "",
    commentArr: [],
  };

  const runMe = async () => {
    await detailedPost.forEach((index, myKey) => {
      if ("commentBody" in index && !commentArr.includes(index)) {
        return newObj.commentArr.push(index);
      } else if ("post_title" in index) {
        return (newObj.postData = index);
      } else if ("username" in index) {
        return (newObj.authUsername = index);
      }
    });
  };
  (() => {
    let checkForEmptyObj = Object.keys(detailedPost).length;
    if (checkForEmptyObj) {
      runMe();
    } else {
      console.log("object empty?");
      let blogToReload = localStorage.getItem("recentPostId");
      (async () => {
        await API.getPostDetails(blogToReload).then((res) =>
          getDetailedPost(res.data)
        );
      })();
    }
  })();
  // console.log(newObj, "object to map");

  // return loading ? (
  return (
    //   <div>
    //   <p>Loading</p>
    // </div>
    // ) : (
    <div className="indepth-post-page container-fluid ">
      <div className="blog-post-cont">
        <div className="blog-img-cont">
          <div
            style={{ backgroundImage: `url(${newObj.postData.blog_img})` }}
          ></div>
        </div>
        <div className="author-pub-info">
          <h1>{newObj.postData.post_title}</h1>
          <h2>{newObj.authUsername.username}</h2>
          <i className="far fa-heart"></i>
          {/* <h1 className="indepth-blog-likes">{index.blog_likes}</h1> */}
          {/* <h1 className="indepth-blog-pd">{index.publish_date}</h1> */}
        </div>
        <p className="blog-body-text">{newObj.postData.post_body}</p>
      </div>
      <div
        className="comments-cont container-fixed"
        style={{ visibility: `${visibilityCond}` }}
      >
        <span className="comments-header">
          <h1>Comments</h1>
        </span>
        {newObj.commentArr.map((index, key) => (
          <div className="each-comment">
            <div className="comment-auth-info">
              <img src={profIcon} alt="Profile Icon"></img>
              <h4>{index.username}</h4>
            </div>
            <div className="comment-text">
              <h6>{index.commentBody}</h6>
              <p>{index.commentRank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
