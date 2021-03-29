import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import profIcon from "../images/profile-icon-def.png";
import UserContext from "../utils/Context";
import "../stylesheets/inDepthPost.css";

export default function InDepthPost() {
  const { detailedPost } = useContext(UserContext);

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
  }, [commentsToMap, userNamesForComments]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setPostToMap(detailedPost.results);
    setCommentsToMap(detailedPost.comments);
    someRandomFunc();
  });

  const someRandomFunc = () => {
    if (commentsToMap.length === 0) {
      // console.log("no comments to map");
      isLoading(false);
      // console.log(postToMap, "post to map!");
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
            console.log("Not sure, have to check back");
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
    return (
      <div className="indepth-post-page container-fluid ">
        {postToMap.map((index, myKey) => (
          <div className="blog-post-cont" id={myKey}>
            <div className="blog-img-cont">
              <div style={{ backgroundImage: `url(${index.blog_img})` }}></div>
            </div>
            <div className="author-pub-info">
              <h1>{index.post_title}</h1>
              <i className="far fa-heart"></i>
              {/* <h1 className="indepth-blog-likes">{index.blog_likes}</h1> */}
              {/* <h1 className="indepth-blog-pd">{index.publish_date}</h1> */}
            </div>
            <p className="blog-body-text">{index.post_body}</p>
          </div>
        ))}
        <div
          className="comments-cont container-fixed"
          style={{ visibility: `${visibilityCond}` }}
        >
          <span className="comments-header">
            <h1>Comments</h1>
          </span>
          {commentsToMap.map((index, myKey) => (
            <>
              {userNamesForComments.map((indexTwo, otherKey) => (
                <div className="each-comment" key={otherKey}>
                  <div className="comment-auth-info">
                    <img src={profIcon} alt="Profile Icon"></img>
                    <h4>{indexTwo}</h4>
                  </div>
                  <div className="comment-text">
                    <p>{index.comment_body}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    );
  }
}
