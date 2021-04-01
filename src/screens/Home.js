import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/Context";
import { useHistory } from "react-router-dom";
import photoThree from "../images/profile-icon-def.png";
import BlogBtnCont from "../components/blogBtnCont";
import "../stylesheets/home.css";

export default function Home() {
  const history = useHistory();

  const { getDetailedPost } = useContext(UserContext);
  const [blogObject, setBlogObject] = useState([]);

  useEffect(() => {
    (async () => {
      await API.getAllPosts().then((res) => setBlogObject(res.data));
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIndepthblogDetails = async (e) => {
    localStorage.setItem("recentPostId", e);
    await API.getPostDetails(e).then((res) => {
      getDetailedPost(res.data);
    });
    history.push("/indepthpost");
  };

  return (
    <div className="home-page container">
      {blogObject.map((index, myKey) => (
        <div className="blog-content container" key={myKey}>
          <div
            className="blog-img-header"
            style={{ backgroundImage: `url(${index.blog_img})` }}
          >
            <div>
              <h2>{index.post_title}</h2>
            </div>
          </div>
          <div className="blog-footer-cont container">
            <div className="COMEBACKTOTHIS">
              <div className="author-info">
                <img alt="User Icon" src={photoThree}></img>
                <h4>{index.username}</h4>
              </div>
              <div className="more-info-div">
                <button
                  className="more-info-btn"
                  id={index.id}
                  onClick={(e) => {
                    getIndepthblogDetails(e.target.id);
                  }}
                >
                  <h2 id={index.id}>{index.publish_date}</h2>
                </button>
              </div>
              <div className="blog-options-bar">
                <BlogBtnCont
                  numOfLikes={index.blog_likes}
                  postId={index.id}
                  postTitle={index.post_title}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
