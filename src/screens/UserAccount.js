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
  const [selectedUser, setSelectedUser] = useState({});
  const { selectedUserId, user } = useContext(UserContext);
  const [followArr, setFollowArr] = useState();

  const [followText, setFollowText] = useState();


    // FETCH USER TOP POSTS
    const getTopPosts = async () => {
      await API.getTopUserPosts(selectedUserId, "forAcc").then(async (res) => {
        setTopPosts(res.data);
      });
      setLoading(false);
    };

  useEffect(() => {
    const loadUser = async () => {
      await API.getUserInfo(selectedUserId).then((res) => {
        if (res.status === 200) {
          setSelectedUser(res.data);
          getTopPosts();
        }
      });
    };
    loadUser();
  }, []);

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

  const followUser = async () => {
    console.log(user, 'user loganm123')
    await API.followUser(user.id, selectedUserId, 'following')
    .then((res) => {
      console.log(res, 'response to follow user');
      setFollowArr(res.data.newArr);
      // setFollowArr(res.data.newArr.split(","));
    })
  }
// need to add a useeffect to watch array of followers / length and check against that
useEffect(() => {
  if(followArr){
    const newIndex = followArr.indexOf(selectedUserId);
    if(newIndex !== -1 ){
        setFollowText('Unfollow');
    } else if(newIndex === -1){
        setFollowText('follow');
    }
  } else if(followArr === undefined){
      const anotherIndex = user.following.indexOf(selectedUserId);
      if(anotherIndex !== -1 ){
        setFollowText('Unfollow');
    } else if(anotherIndex === -1){
        setFollowText('follow');
    }
  }
  // console.log(typeof user.following, 'type of user id');
  // console.log(typeof selectedUserId, 'type of selected user id');
  console.log(followArr, 'new state for follow arr');
}, [followArr])

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
          <img
            className="user-icon"
            src={selectedUser.icon}
            alt="User icon"
          ></img>
          <button onClick={followUser}>{followText}</button>
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
