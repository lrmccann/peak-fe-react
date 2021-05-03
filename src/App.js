import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import InDepthPost from "./screens/InDepthPost";
import MyAccount from "./screens/MyAccount";
import Bookmarks from "./screens/Bookmarks";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from "./utils/Context";
import { useEffect, useState } from 'react';
import NavbarTop from "./components/navbar/index";
// import ScrollToTop from "react-scroll-to-top";

export default function App() {

  const [user , setUser] = useState({});
  const [allPosts , setAllPosts] = useState([]);
  const [detailedPost, setDetailedPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  // const [envState, setEnvState] = useState();


  const getUser = (userData) => {
    setUser (user=>{return user = userData})
  }

  const getAllPostsForHomePage = (postData) => {
    setAllPosts(allPosts=>{return allPosts = postData})
  }

  const getDetailedPost = (detailedPostData) => {
    setDetailedPost(allDetailedPostData =>{return allDetailedPostData = detailedPostData}) 
  }

  const getAllComments = (commentsData) => {
    setAllComments(allCommentsData => {return allCommentsData = commentsData})
  } 

  // Check status of env var for dev or prod
  // useEffect(() => {
  //   if(process.env.NODE_ENV === "development"){
  //     setEnvState("development");
  //   }else if(process.env.NODE_ENV === "production"){
  //     setEnvState("production");
  //   }
  // }, []);

  // console.log(envState, "state of env");


  return (
    <UserProvider value = {{
      user,
      allPosts,
      detailedPost,
      allComments,
      // envState,

      getUser,
      getAllPostsForHomePage,
      getDetailedPost,
      getAllComments
    }}>
    <Router>
      <Route exact activeClassName path="/" component={Login} />
      <Route exact activeClassName path="/signup" component={Signup} />
      {/* <ScrollToTop smooth /> */}
      <NavbarTop/>
      <Switch>
      <Route exact activeClassName path="/home" component={Home} />
      </Switch>
      <Route exact activeClassName path="/indepthpost" component={InDepthPost} />
      <Route exact activeClassName path="/myaccount" component={MyAccount} />
      <Route exact activeClassName path="/bookmarks" component={Bookmarks} />
    </Router>
    </UserProvider>
  );
}
