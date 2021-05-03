import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/Context";
import { useHistory } from "react-router-dom";
import photoThree from "../images/profile-icon-def.png";
import BlogBtnCont from "../components/blogBtnCont";
import viewIcon from "../images/view-icon.png";
import "../stylesheets/home.css";

export default function Home(props) {
  const history = useHistory();

  const { getDetailedPost, envState } = useContext(UserContext);
  const [blogObject, setBlogObject] = useState([]);
  const [bookmarkedPost, setBookmarkedPost] = useState([]);
  const [loading, setLoading ] = useState(true);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set API routes based on env
  // useEffect(() => {
  //   if(envState === "development"){

  //   }
  // })

  // GET ALL POSTS
  useEffect(() => {
    (async () => {
      await API.getAllPosts().then((res) => setBlogObject(res.data));
    })();
  }, []);

  // CHECK USER BOOKMARKS AGAINST ALL POSTS BY ID
  useEffect(() => {
      const checkBookmarkStatus = async () => {
    var userId = localStorage.getItem("loggedInUserId");
    await API.checkBookmarksForHome(userId).then((res) => {
        setBookmarkedPost(res.data);
    });
    if(bookmarkedPost.length === 0){
      // setTimeout(() => {
        setLoading(false);
      // }, 2 * 300);
    }else{
      setLoading(false);
    }
  }
  checkBookmarkStatus();
  }, [])

  // ADD VIEW TO SQL COL BY ID
  const addPostView = async (postId) => {
    console.log(postId)
    await API.addViewToBlog(postId).then((res) => {
      console.log(res);
    })
  }

  // GET POST DETAILS FOR NEXT PAGE
  const getIndepthblogDetails = async (e) => {
    localStorage.setItem("recentPostId", e);
    await API.getPostDetails(e).then((res) => {
      getDetailedPost(res.data);
    });
    addPostView(e);
    history.push("/indepthpost");
  };

  if(loading === true){
    return(
      <div>
        <h1>Loading</h1>
      </div>
    )
  }
  else if(loading === false){
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
            <p><img src={viewIcon} alt="Eye Icon"></img>{index.post_views}</p>
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
