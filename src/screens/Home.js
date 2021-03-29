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
  const [postsToMap, setPostsToMap] = useState([]);
  const [bookMarked, setBookmarked] = useState(false);

  useEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () =>
      await API.getAllPosts().then(async (res) =>
        setPostsToMap(await res.data.allPosts)
      ),
    [setPostsToMap]
  );

  const getIndepthblogDetails = async (e) => {
    await API.getPostDetails(e).then((res) => separateResponseData(res.data));
  };

  const separateResponseData = async (responseData) => {
    getDetailedPost(responseData);
    // console.log(responseData);
    history.push("/indepthpost");
  };

  const bookMarkFunc = () => {
    if (bookMarked === false) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };
  //   console.log(bookMarked);
  console.log(bookMarkFunc);
  return (
    <div className="home-page container">
      {postsToMap.map((index, myKey) => (
        <div className="blog-content container">
          <div
            key={myKey}
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
                <h4>JonSmith14</h4>
              </div>
              <div className="more-info-div">
                <button
                  className="more-info-btn"
                  id={index.id}
                  onClick={(e) => {
                    getIndepthblogDetails(e.target.id);
                  }}
                >
                  <h2 id={index.id}>More Info</h2>
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
