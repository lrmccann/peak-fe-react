import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import profIcon from "../images/profile-icon-def.png";
import Truncate from "react-truncate";
import UserContext from "../utils/Context";
import "../stylesheets/inDepthPost.css";

export default function InDepthPost() {
  const { detailedPost } = useContext(UserContext);
  console.log(detailedPost, "i am a detailed post ");
  console.log(detailedPost, "detailed post idk what i am");

  const [commentsToMap, setCommentsToMap] = useState([]);
  const [postToMap, setPostToMap] = useState([]);
  const [userNamesForComments, setUsernameForComments] = useState([]);
  const [loading, isLoading] = useState(true);
  const [visibilityCond, setVisibility] = useState("visible");
  var userIdForApi = [];

  useEffect(() => {
    console.log(userNamesForComments, "comments to map");
    if (userNamesForComments.length === 0 && commentsToMap === null) {
      setUsernameForComments(["", "", ""]);
      setCommentsToMap(["", "", ""]);
      setVisibility("none");
    } else {
      console.log("it worked");
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setPostToMap(detailedPost.results);
    setCommentsToMap(detailedPost.comments);
    someRandomFunc();
  });

  const someRandomFunc = () => {
    if (commentsToMap.length === 0) {
      console.log("no comments to map");
      isLoading(false);
      console.log(postToMap, "post to map!");
    } else if (commentsToMap.length !== 0) {
      commentsToMap.map(async (index) => {
        userIdForApi.push(index.user_id);
        setTimeout(async () => {
          await API.getUsernamesForComments(userIdForApi).then((res) =>
            setUsernameForComments(res.data)
          );
          if (userNamesForComments.length !== 0) {
            return;
          } else {
            console.log("i give up");
          }
        }, 1 * 20);
      });
    }
  };

  if (loading === true) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else if (loading === false) {
    console.log(userNamesForComments, "user name for comments to map");
    return (
      <div className="inDepthPostPage container-fluid ">
        {postToMap.map((index, myKey) => (
          <div className="holdErthang" id={myKey}>
            <div id="blogImgCont" className="blogImgCont">
              <div
                className="blogImg"
                id="blogImg"
                style={{ backgroundImage: `url(${index.blog_img})` }}
              ></div>
            </div>
            <div className="publishingInfo" id="publishingInfo">
              <h1 id="blogTitle">{index.post_title}</h1>
              <i className="far fa-heart"></i>
              {/* <h1 id="blogLikes">{index.blog_likes}</h1> */}
              {/* <h1 id="blogPublishDate">{index.publish_date}</h1> */}
            </div>
            <p className="blogBody" id="blogBody">
              {index.post_body}
            </p>
          </div>
        ))}
        <div
          className="commentsCont"
          style={{ visibility: `${visibilityCond}` }}
        >
          <span className="rand">
            <h1 className="commentsTitle">Comments</h1>
          </span>
          {commentsToMap.map(
            (index, myKey) => (
              (
                <>
                  {userNamesForComments.map(
                    (indexTwo, otherKey) => (
                    //   console.log(indexTwo, "index two")
                      (
                        <div className="actualCommentsCont" key={otherKey}>
                          <div className="commentAuthDiv">
                            <img
                              src={profIcon}
                              className="commentAuthPic"
                              alt="Profile Icon"></img>
                            <h4>{indexTwo}</h4>
                          </div>
                          <div className="bodyOfComment">
                            <p>{index.comment_body}</p>
                          </div>
                        </div>
                      )
                    )
                  )}
                </>
              )
            )
          )}
        </div>
      </div>
    );
  }
}
