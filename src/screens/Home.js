import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/Context";
import { useHistory } from "react-router-dom";
import photoThree from "../images/profile-icon-def.png";
import BlogBtnCont from "../components/blogBtnCont";
import viewIcon from "../images/view-icon.png";
import LoadingPage from '../components/Loading/index';
import "../stylesheets/home.css";

export default function Home() {
  const history = useHistory();
  const { getDetailedPost, user, setUser } = useContext(UserContext);
  const [blogObject, setBlogObject] = useState([]);
  const [bookmarkedPost, setBookmarkedPost] = useState([]);
  const [likedPosts, setLikedPost] = useState([]);
  const [loading, setLoading] = useState(true);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GET ALL POSTS
  useEffect(() => {
    (async () => {
      await API.getAllPosts().then((res) => setBlogObject(res.data));
    })();
  }, []);

  // CHECK USER BOOKMARKS AGAINST ALL POSTS BY ID
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      let userId = localStorage.getItem("loggedInUserId");
      await API.checkBookmarksForHome(userId).then((res) => {
        setBookmarkedPost(res.data);
      });
      if (bookmarkedPost.length === 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [bookmarkedPost.length]);
// check posts from user data against posts being loaded
  useEffect(() => {
    const checkLikeStatus = async () => {
      let userId = localStorage.getItem("loggedInUserId");
      await API.getLikedPosts(userId).then((res) => {
        setLikedPost(res.data);
      });
      if (likedPosts.length === 0) {
        return setLoading(true);
      } else {
        return setLoading(false);
      }
    };
    checkLikeStatus();
  }, [likedPosts.length]);

// check if user from context is empty, if empty load user data again
  useEffect(() => {
    if (Object.keys(user).length) {
      return;
    } else {
      (async () => {
        let userToReload = localStorage.getItem("loggedInUserId");
        await API.getUserInfo(userToReload).then((res) => {
          setUser(res.data);
        });
      })();
    }
  }, [setUser, user]);

// ADD VIEW TO SQL COL BY ID
  const addPostView = async (postId) => {
    await API.addViewToBlog(postId).then((res) => {
      if(res.status === 202){
        return alert("Post liked");
      }else{
        return alert("error liking post, try again");
      }
    });
  };

// GET POST DETAILS FOR NEXT PAGE
  const getIndepthblogDetails = async (e) => {
    localStorage.setItem("recentPostId", e);
    await API.getPostDetails(e).then((res) => {
      getDetailedPost(res.data);
    });
    addPostView(e);
    history.push("/indepthpost");
  };

  if (loading) {
    return (
      <div className="load-screen-holder container-fixed">
      <LoadingPage />
     </div>
    );
  } else {
    return (
      <div className="home-page container">
        {blogObject.map((index, myKey) => (
          <div className="blog-content container" key={myKey}>
            <div
              className="blog-img-header container-fixed"
              style={{ backgroundImage: `url(${index.blog_img})` }}
            >
              <div>
                <h2>{index.post_title}</h2>
              </div>
              <p>
                <img src={viewIcon} alt="Eye Icon"></img>
                {index.post_views}
              </p>
            </div>
            <div className="blog-footer-cont container-fixed">
              <div className="COMEBACKTOTHIS">
                <div className="author-info container-fixed">
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
                    <h2 id={index.id}>View</h2>
                  </button>
                </div>
                <div className="blog-options-bar">
                  <BlogBtnCont
                    numOfLikes={index.blog_likes}
                    postId={index.id}
                    postTitle={index.post_title}
                    bookMarkedPosts={bookmarkedPost}
                    likedPosts={likedPosts}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
