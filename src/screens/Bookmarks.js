import React, { useEffect, useState } from "react";
import "../stylesheets/bookmarks.css";
import API from "../utils/API";
import photoThree from "../images/profile-icon-def.png";
import LoadingPage from "../components/Loading/index";

export default function Bookmarks() {
  const [bookmarkedBlog, setBookmarkedBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookmarks = async () => {
      let userId = localStorage.getItem("loggedInUserId");
      await API.getBookmarkedPosts(userId).then(async (results) => {
        if (results.data === null) {
          setLoading(true);
        } else {
          setLoading(false);
          setBookmarkedBlog(await results.data);
        }
      });
    };
    getBookmarks();
  }, []);
  if (loading === true) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    if (bookmarkedBlog.length === 0) {
      return (
        <div>
          <h1>No Bookmarks Yet!</h1>
        </div>
      );
    } else {
      return (
        <div className="bookmarks_page container">
          {bookmarkedBlog.map((index, myKey) => (
            <div className="bk-blog-content container" key={myKey}>
              <div
                className="bk-blog-img-header"
                style={{ backgroundImage: `url(${index.blog_img})` }}
              >
                <div>
                  <h2>{index.post_title}</h2>
                </div>
              </div>
              <div className="bk-blog-footer-cont container">
                <div className="bk-COMEBACKTOTHIS">
                  <div className="bk-author-info">
                    <img alt="User Icon" src={photoThree}></img>
                    <h4>{index.username}</h4>
                  </div>
                  <div className="bk-more-info-div">
                    <button
                      className="bk-more-info-btn"
                      id={`bk-${index.id}`}
                      // onClick={(e) => {
                      //   getIndepthblogDetails(e.target.id);
                      // }}
                    >
                      <h2 id={`bk-${index.id}`}>View</h2>
                    </button>
                  </div>
                  <div className="bk-blog-options-bar">
                    {/* <BlogBtnCont
                                numOfLikes={index.blog_likes}
                                postId={index.id}
                                postTitle={index.post_title}
                              /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
