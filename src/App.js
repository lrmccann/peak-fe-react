import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import InDepthPost from "./screens/InDepthPost";
import MyAccount from "./screens/MyAccount";
import Bookmarks from "./screens/Bookmarks";
import CreatePost from './screens/CreatePost';
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { UserProvider } from "./utils/Context";
import { useEffect, useState } from "react";
import NavbarTop from "./components/navbar/index";
import UserAccount from "./screens/UserAccount";

export default function App() {
  const [user, setTheUser] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [detailedPost, setDetailedPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [loggedIn , setLoggedIn] = useState(false);
  const history = useHistory();
  // useEffect(() => {
    const token = document.cookie;

  // })
  useEffect(() => {
    console.log(loggedIn, "here")
    if (Object.keys(user).length || token === null) {
      return setLoggedIn(true);
    } else {
      return setLoggedIn(false);
    }
  // }, [token, user]);
  }, [loggedIn, token, user]);


  const setUser = (userData) => {
    setTheUser((user) => {
      return (user = userData);
    });
  };

  const getAllPostsForHomePage = (postData) => {
    setAllPosts((allPosts) => {
      return (allPosts = postData);
    });
  };

  const getDetailedPost = (detailedPostData) => {
    setDetailedPost((allDetailedPostData) => {
      return (allDetailedPostData = detailedPostData);
    });
  };

  const getAllComments = (commentsData) => {
    setAllComments((allCommentsData) => {
      return (allCommentsData = commentsData);
    });
  };

  return (
    <UserProvider
      value={{
        user,
        allPosts,
        detailedPost,
        allComments,

        setUser,
        getAllPostsForHomePage,
        getDetailedPost,
        getAllComments,
      }}
    >
        {loggedIn === false ?
        (
          <Router>
        <Route exact activeClassName path="/" component={Login} />
        <Route exact activeClassName path="/signup" component={Signup} />
        </Router>
        ) : 
        <Router>
        <NavbarTop />
          <Route exact activeClassName path="/home" component={Home} />
        <Route
          exact
          activeClassName
          path="/indepthpost"
          component={InDepthPost}
        />
        <Route exact activeClassName path="/useraccount" component={UserAccount} />
        <Route exact activeClassName path="/createPost" component={CreatePost} />
        <Route exact activeClassName path="/myaccount" component={MyAccount} />
        <Route exact activeClassName path="/bookmarks" component={Bookmarks} />

      </Router>
}
    </UserProvider>
  );
}
