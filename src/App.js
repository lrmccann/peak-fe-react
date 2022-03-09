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
import API from "./utils/API";

export default function App() {
  const [user, setTheUser] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [detailedPost, setDetailedPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();
  const [loggedIn , setLoggedIn] = useState(false);
  const history = useHistory();

  // SCROLL TOP
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const token = document.cookie;

// else if run checkuser to get user info/user obj
    const checkUser = async () => {
      let userId = localStorage.getItem("loggedInUserId");
      await API.getUserInfo(userId).then((res) => {
        if(res.status === 200){
            setUser(res.data);
        }else{
          console.log("error loading user after refresh - error");
        }
      });
    }

// Set log in state (if user obj is full and user has token load page && if user obj empty but has token - fetch user info from checkUser)
  useEffect(() => {
    if (Object.keys(user).length && token !== null) {
       setLoggedIn(true);
    } else if(!Object.keys(user).length && token !== null){
        checkUser(); 
    } else {
       setLoggedIn(false);
    }
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

  const setSelectedUser = (selectedUserId) => {
    setSelectedUserId((userId) => {
      return(userId = selectedUserId);
    })
  }

  return (
    <UserProvider
      value={{
        user,
        allPosts,
        detailedPost,
        allComments,
        selectedUserId,

        setUser,
        getAllPostsForHomePage,
        getDetailedPost,
        getAllComments,
        setSelectedUser,
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
