import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/Context";
import API from "../utils/API";
import "../stylesheets/myAccount.css";

export default function MyAccount() {
  const [topComments, setTopComments] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  setInterval(() => {
  console.log(user , "user from account page")
  }, 2 * 1000)

  // eslint-disable-next-line no-sequences
  useEffect(() => (getTopComments(), getTopPosts()), []);

  const getTopPosts = async () => {
    var userId = user[0].id;
    await API.getTopUserPosts(userId).then(async (res) =>
      setTopPosts(await res.data)
    );
  };

  const getTopComments = async () => {
    var userId = user[0].id;
    await API.getTopUserComments(userId).then(async (res) =>
      setTopComments(await res.data)
    );
  };

  return (
    <div className="account-page container-fixed">
      <div className="account-content">
        {user.map((index) => (
          <div className="leftSide">
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="firstNameHeaderText" id="headerText">
                  First Name
                </h3>
                <h4 className="firstNameText" id="infoText">
                  {index.first_name}
                </h4>
              </div>
              <div className="shit">
                <h3 className="userNameSecText" id="headerText">
                  User Name
                </h3>
                <h4 className="usernameInput" id="infoText">
                  {index.username}
                </h4>
              </div>
            </div>
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="cityHeaderText" id="headerText">
                  City
                </h3>
                <h4 className="cityText" id="infoText">
                  {index.city}
                </h4>
              </div>
              <div className="shit">
                <h3 className="titleHeaderText" id="headerText">
                  Title
                </h3>
                <h4 className="titleText" id="infoText">
                  {index.job_title}
                </h4>
              </div>
            </div>
            <div className="infoRowOne">
              <div className="shit">
                <h3 className="lastNameHeaderText" id="headerText">
                  Last Name
                </h3>
                <h4 className="lastNameText" id="infoText">
                  {index.last_name}
                </h4>
              </div>
              <div className="shit">
                <h3 className="emailHeaderText" id="headerText">
                  Email
                </h3>
                <h4 className="emailText" id="infoText">
                  {index.email}
                </h4>
              </div>
            </div>
            <div className="infoRowOneIsh">
              <div className="shit">
                <h3 className="zipcodeHeaderText" id="headerText">
                  Zipcode
                </h3>
                <h4 className="zipcodeText" id="infoText">
                  {index.zipcode}
                </h4>
              </div>
              <div className="shit">
                <h3 className="ageHeaderText" id="headerText">
                  Age
                </h3>
                <h4 className="ageText" id="infoText">
                  {index.age}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="topStatsCont">
        <div className="topPostsCont">
          <h1 id="topStatsHeaderText">Top Posts</h1>
          {topPosts.map((index) => (
            <button className="postBox">
              <img className="postImg" alt="Post Images" src={index.blog_img}></img>
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
          {topComments.map(
            (index, mapKey) => (
              (
                <button className="commentBox" key={mapKey}>
                  <h3>{index.comment_body}</h3>
                </button>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
