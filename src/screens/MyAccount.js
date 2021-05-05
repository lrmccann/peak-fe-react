import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/Context";
import API from "../utils/API";
import "../stylesheets/myAccount.css";

export default function MyAccount() {
  const [topComments, setTopComments] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTopPosts = async (id) => {
    await API.getTopUserPosts(id).then(async (res) => {
      setTopPosts(res.data);
    });
  };

  useEffect(() => {
    if (Object.keys(user).length) {
      console.log(user, "user if object is full");
      getTopPosts(user.id);
    } else {
      (async () => {
        let userToReload = localStorage.getItem("loggedInUserId");
        await API.getUserInfo(userToReload).then((res) => {
          getUser(res.data);
        });
      })();
    }
  }, [getUser, user]);

  return (
    <div className="account-page container-fixed">
      <div className="account-content">
        <div className="leftSide">
          <div className="infoRowOne">
            <div className="shit">
              <h3 className="firstNameHeaderText" id="headerText">
                First Name
              </h3>
              <h4 className="firstNameText" id="infoText">
                {user.first_name}
              </h4>
            </div>
            <div className="shit">
              <h3 className="userNameSecText" id="headerText">
                User Name
              </h3>
              <h4 className="usernameInput" id="infoText">
                {user.username}
              </h4>
            </div>
          </div>
          <div className="infoRowOne">
            <div className="shit">
              <h3 className="cityHeaderText" id="headerText">
                City
              </h3>
              <h4 className="cityText" id="infoText">
                {user.city}
              </h4>
            </div>
            <div className="shit">
              <h3 className="titleHeaderText" id="headerText">
                Title
              </h3>
              <h4 className="titleText" id="infoText">
                {user.job_title}
              </h4>
            </div>
          </div>
          <div className="infoRowOne">
            <div className="shit">
              <h3 className="lastNameHeaderText" id="headerText">
                Last Name
              </h3>
              <h4 className="lastNameText" id="infoText">
                {user.last_name}
              </h4>
            </div>
            <div className="shit">
              <h3 className="emailHeaderText" id="headerText">
                Email
              </h3>
              <h4 className="emailText" id="infoText">
                {user.email}
              </h4>
            </div>
          </div>
          <div className="infoRowOneIsh">
            <div className="shit">
              <h3 className="zipcodeHeaderText" id="headerText">
                Zipcode
              </h3>
              <h4 className="zipcodeText" id="infoText">
                {user.zipcode}
              </h4>
            </div>
            <div className="shit">
              <h3 className="ageHeaderText" id="headerText">
                Age
              </h3>
              <h4 className="ageText" id="infoText">
                {user.age}
              </h4>
            </div>
            <div className="shit">
              <h3 className="stateHeaderText" id="headerText">
                State
              </h3>
              <h4 className="stateText" id="infoText">
                {user.state}
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
          <h1 id="topStatsHeaderText">Top Comments</h1>
          {topComments.map((index, mapKey) => (
            <button className="commentBox" key={mapKey}>
              <h3>{index.comment_body}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
