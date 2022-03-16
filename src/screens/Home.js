import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/Context";
import { useHistory } from "react-router-dom";
import BlogBtnCont from "../components/blogBtnCont";
import viewIcon from "../images/view-icon.png";
import LoadingPage from "../components/Loading/index";
import TrendingBlogs from "../components/TrendingBlogs";
import Sidebar from "../components/sidebar/index";
import "../stylesheets/home.css";

export default function Home() {
  const history = useHistory();
  const { getDetailedPost, setSelectedUser } = useContext(UserContext);
  const [blogObject] = useState([]);
  const [bookmarkedPost, setBookmarkedPost] = useState([]);
  const [likedPosts, setLikedPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const [sidebarTopic, setSidebarTopic] = useState("following");
  // const blogContent = [];
  const [bookmarks, setBookmarks] = useState([]);
  const [followingBlogs, setFollowingBlogs] = useState([]);
  const [sidebarLoaded, setSidebarLoaded] = useState(false);

  const getBookmarks = async () => {
    await API.getBookmarkedPosts(user.id).then((res) => {
      if (res.data) {
        res.data.map((b, i) => {
          bookmarks.push(b);
        });
      } else {
        // load empty array
      }
      console.log(bookmarks, "bookmark content array for new sidebar");
    });
  };

  const getFollowingBlogs = async () => {
      await API.getFollowingBlogs(user.id).then((res) => {
        if(res.data){
          res.data.map((b, i) => {
            console.log(b, 'followed users blog for home page');
            // followingBlogs.push(b);
          })
        } else{
          // load empty arra
        }
        console.log(followingBlogs, "bookmark content array for new sidebar");
      })
  }

  useEffect(() => {
    if (sidebarTopic === "following") {
      getFollowingBlogs();
      console.log("following");
      // api call here for following topic
    } else if (sidebarTopic === "saved") {
      console.log("saved");
      getBookmarks();
      // api call to get saved user topics here
    }
  }, [sidebarTopic]);

  // GET ALL POSTS
  useEffect(() => {
    (async () => {
      await API.getAllPosts().then((res) => {
        if (res.status === 200) {
          res.data.map((index) => {
            // console.log(index, "some index here");
            blogObject.push(index);
          });
          return setLoading(false);
        } else {
          alert("error getting posts for home page, please refresh!");
        }
      });
    })();
  }, [blogObject]);

  // CHECK USER BOOKMARKS AGAINST ALL POSTS BY ID
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      await API.checkBookmarksForHome(user.id).then((res) => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            setBookmarkedPost(null);
          } else if (res.data.length !== 0) {
            setBookmarkedPost(res.data);
            console.log(bookmarkedPost, "bookmarked posts run every click");
          }
        } else {
          return console.log("error loading bookmarks");
        }
      });
    };
    checkBookmarkStatus();
  }, []);

  // CHECK USER LIKES AGAINST ALL POSTS BY ID
  useEffect(() => {
    const checkLikeStatus = async () => {
      await API.getLikedPosts(user.id).then((res) => {
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

  // ADD VIEW TO POST
  const addPostView = async (postId) => {
    await API.addViewToBlog(postId).then((res) => {
      if (res.status === 404) {
        console.log("Post Error");
      } else {
        console.log("Post Liked!");
        history.push("/indepthpost");
      }
    });
  };

  // GET POST DETAILS FOR NEXT PAGE
  const getIndepthblogDetails = async (e) => {
    localStorage.setItem("recentPostId", e.target.id);
    await API.getPostDetails(e.target.id).then((res) => {
      getDetailedPost(res.data);
    });
    addPostView(e.target.id);
  };

  const saveUserId = (e) => {
    setSelectedUser(e.target.id);
    history.push("/useraccount");
  };

  if (loading) {
    return (
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <main className="home-page container">
        {/* <h1>Trending</h1> */}
        <div className="main-cont">
          <TrendingBlogs />
          <TrendingBlogs />
        </div>
        <div className="sidebar-container">
          <div className="side-content">
            <input placeholder="Search"></input>
            <div className="sidebar-slider">
              <button
                onClick={() => {
                  setSidebarTopic("following");
                }}
              >
                <p>Following</p>
              </button>
              <button
                onClick={() => {
                  setSidebarTopic("saved");
                }}
              >
                <p>Saved</p>
              </button>
            </div>
            <div className="bmark-cont">
              {sidebarTopic === "following" ? (
                <div>
                  <h1>Following Blogs</h1>
                </div>
              ) : (
                <>
                  {bookmarks.map((b, i) => (
                    <div key={i}>
                      <span>
                        <img src={`${b.blog_img}`} alt="bookmark"></img>
                        <h2>{b.username}</h2>
                      </span>
                      <h1>{b.post_title}</h1>
                      <span>
                        <h3>{b.publish_date}</h3>
                        <h3>Read Time</h3>
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
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
                <button
                  id={index.user_id}
                 className="author-info container-fixed"
                 onClick={(e) => {saveUserId(e);}}
                 >
                  <img id={index.user_id} alt="User Icon" src={index.icon}></img>
                  <h4 id={index.user_id}>{index.username}</h4>
                </button>
                <div className="more-info-div">
                  <button
                    className="more-info-btn"
                    id={index.id}
                    onClick={(e) => {
                      getIndepthblogDetails(e);
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
      </main>
    );
  }
}
