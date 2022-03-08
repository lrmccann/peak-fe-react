import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/Context";
import API from "../utils/API";
import "../stylesheets/userAccount.css";
import LoadingPage from "../components/Loading";
import { useHistory } from "react-router-dom";

export default function UserAccount() {
  const history = useHistory();
  const [prefTopicsArr, setPrefTopicsArr] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser , setSelectedUser] = useState({});
  const {user, setUser } = useContext(UserContext);


  useEffect(() => {
      const loadUser = async () => {
      let idToFetch = localStorage.getItem("selectedUserId");
      if(idToFetch === null){
          alert("Error Loading Profile, Please try again!");
          history.push('/home');
      }else{
        await API.getUserInfo(idToFetch).then((res) =>{
            if(res.status === 200){
                setSelectedUser(res.data);
                return setLoading(false);
            }
        })
      }
    }
    loadUser();
  }, [])

  // checking user context obj, if empty reload user
  useEffect(() => {
    if (Object.keys(selectedUser).length) {
      if (selectedUser.preferred_topics === null) {
        setTimeout(() => {
          setLoading(false);
        }, 2 * 1100);
      } else {
        const removeQuotes = selectedUser.preferred_topics
          .replace(/['"]+/g, "")
          .split(",");
        setPrefTopicsArr(removeQuotes);
        if (prefTopicsArr.length <= 1) {
          setTimeout(() => {
            setLoading(false);
          }, 2 * 1800);
        } else if (prefTopicsArr.length >= 3) {
          setLoading(false);
        }
      }
    }
  }, [prefTopicsArr.length, selectedUser]);

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if user object is NOT empty we fetch their top posts
  const getTopPosts = async (id) => {
    await API.getTopUserPosts(id, 'forAcc').then(async (res) => {
     setTopPosts(res.data);
    });
  };
  // checks if user obj is empty, if empty reload user
  useEffect(() => {
    if (Object.keys(selectedUser).length) {
      getTopPosts(selectedUser.id);
    } else {
      (async () => {
        // let userToReload = localStorage.getItem("selectedUserId");
        let userToReload = user.id;
        await API.getUserInfo(userToReload).then((res) => {
          setUser(res.data);
        setSelectedUser(res.data)
        });
      })();
    }
  }, [selectedUser]);

  if (loading) {
    return (
      <div className="load-holder container-fixed">
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <div className="account-page container-fixed">
          <div className="icon-and-btn">
          <img className="user-icon" src={selectedUser.icon} alt="User icon"></img>
          <button>Follow</button>
          </div>
        <div className="account-content">
          <div className="leftSide">
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="firstNameHeaderText" id="headerText">
                  First Name
                </h3>
                <h4 className="firstNameText" id="infoText">
                  {selectedUser.first_name}
                </h4>
              </div>
              <div className="shit">
                <h3 className="userNameSecText" id="headerText">
                  User Name
                </h3>
                <h4 className="usernameInput" id="infoText">
                  {selectedUser.username}
                </h4>
              </div>
            </div>
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="cityHeaderText" id="headerText">
                  City
                </h3>
                <h4 className="cityText" id="infoText">
                  {selectedUser.city}
                </h4>
              </div>
              <div className="shit">
                <h3 className="titleHeaderText" id="headerText">
                  Title
                </h3>
                <h4 className="titleText" id="infoText">
                  {selectedUser.job_title}
                </h4>
              </div>
            </div>
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="lastNameHeaderText" id="headerText">
                  Last Name
                </h3>
                <h4 className="lastNameText" id="infoText">
                  {selectedUser.last_name}
                </h4>
              </div>
              <div className="shit">
                <h3 className="emailHeaderText" id="headerText">
                  Email
                </h3>
                <h4 className="emailText" id="infoText">
                  {selectedUser.email}
                </h4>
              </div>
            </div>
            <div className="infoRowOneIsh">
              <div className="shit">
                <h3 className="zipcodeHeaderText" id="headerText">
                  Zipcode
                </h3>
                <h4 className="zipcodeText" id="infoText">
                  {selectedUser.zipcode}
                </h4>
              </div>
              <div className="shit">
                <h3 className="ageHeaderText" id="headerText">
                  Age
                </h3>
                <h4 className="ageText" id="infoText">
                  {selectedUser.age}
                </h4>
              </div>
              <div className="shit">
                <h3 className="stateHeaderText" id="headerText">
                  State
                </h3>
                <h4 className="stateText" id="infoText">
                  {selectedUser.state}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="topStatsCont">
          <div className="topPostsCont">
            <h1 id="topStatsHeaderText">Top Posts</h1>
            {topPosts.map((index) => (
              <button className="postBox">
                <img
                  className="postImg"
                  alt="Post Images"
                  src={index.blog_img}
                ></img>
                <div className="makeFlexCol">
                  <div className="postTitleCont">
                    <h3 className="postTitle">{index.post_title}</h3>
                    <h4>Likes : {index.blog_likes}</h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="topCommentsCont">
            <h1 className="topicsHeaderText">Preferred Topics</h1>
            {prefTopicsArr.map((index, mapKey) => (
              <button className="commentBox" key={mapKey}>
                <h3>{index}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
