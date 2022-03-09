import React, { useEffect, useState, useContext } from "react";
import "../stylesheets/bookmarks.css";
import API from "../utils/API";
import photoThree from "../images/profile-icon-def.png";
import LoadingPage from "../components/Loading/index";
import UserContext from "../utils/Context";

export default function Bookmarks() {
  const [bookmarkedBlog, setBookmarkedBlog] = useState([]);
  const [bookmarksEmpty, setBookmarksEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);

// use effect to get bookmarked posts from server using user id from local storage
  useEffect(() => {
    const getBookmarks = async () => {
      await API.getBookmarkedPosts(user.id).then(async (results) => {
        console.log(results, 'RESUUUUULTS OF DIS BITCH');
        if (results.status === 210) {
          setBookmarksEmpty(true);
          return setLoading(false);
        } else if(results.status === 200){
          console.log(results);
          setBookmarksEmpty(false);
          setBookmarkedBlog(await results.data);
          return setLoading(false);
        }else{
          alert("error loading your page")
        }
      });
    };
    getBookmarks();
  }, []);
//

  if (loading) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    if (bookmarksEmpty) {
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
