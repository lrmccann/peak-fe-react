import React, { useContext, useState, useEffect } from "react";
import API from "../utils/API";
import profIcon from "../images/profile-icon-def.png";
import UserContext from "../utils/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../components/Loading/index";
import "../stylesheets/inDepthPost.css";

export default function InDepthPost() {
  const { detailedPost, getDetailedPost, user } = useContext(UserContext);
  const [loading, isLoading] = useState(false);
  const [commentBodyState, setCommentBodyState] = useState(
    "Please enter comment!"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let newObj = {
    authUsername: "",
    postData: "",
    commentArr: [],
  };

  // sort blog info into object
  const sortBlogData = async () => {
    await detailedPost.forEach((index, myKey) => {
      if ("commentBody" in index && !newObj.commentArr.includes(index)) {
        return newObj.commentArr.push(index);
      } else if ("post_title" in index) {
        return (newObj.postData = index);
      } else if ("username" in index) {
        return (newObj.authUsername = index);
      }
    });
  };

  // IIF to check if blog object is empty on page reload or network connection loss
  (() => {
    let checkForEmptyObj = Object.keys(detailedPost).length;
    if (checkForEmptyObj) {
      return sortBlogData();
    } else {
      let blogToReload = localStorage.getItem("recentPostId");
      (async () => {
        await API.getPostDetails(blogToReload).then((res) =>
          getDetailedPost(res.data)
        );
        isLoading(false);
      })();
      // return isLoading(false);
    }
  })();

  // comment object
  let newCommentObj = {
    userId: localStorage.getItem("loggedInUserId"),
    postId: localStorage.getItem("recentPostId"),
    commentBody: commentBodyState,
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    console.log(newCommentObj, "new comment obj");
    await API.postNewComment(
      newCommentObj.userId,
      newCommentObj.postId,
      newCommentObj.commentBody
    );
  };
  if (loading) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    return (
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
        <div className="comments-cont container-fixed">
          <span className="comments-header">
            <h1>Comments</h1>
          </span>
          <div className="each-comment">
            <div className="comment-auth-info">
              <img src={profIcon} alt="Profile Icon"></img>
              <h4>{user.username}</h4>
              <div>
                <button
                  className="new-comment-btn"
                  type="submit"
                  onClick={postNewComment}
                >
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="comment-text">
              <textarea
                id="comment-body"
                onChange={(e) => setCommentBodyState(e.target.value)}
                value={commentBodyState}
              ></textarea>
            </div>
          </div>
          {newObj.commentArr.map((index, key) => (
            <div className="each-comment">
              <div className="comment-auth-info">
                <img src={profIcon} alt="Profile Icon"></img>
                <h4>{index.username}</h4>
              </div>
              <div className="comment-text">
                <h6>{index.commentBody}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
