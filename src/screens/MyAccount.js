import React , {useContext, useEffect, useState} from 'react';
import UserContext from '../utils/Context';
import API from "../utils/API";
import "../stylesheets/myAccountOutput.css";

export default function MyAccount () {

    const [topComments , setTopComments] = useState([]);
    const [topPosts , setTopPosts] = useState([]);
    const {user} = useContext(UserContext);

    console.log(user , "user console logged")

    useEffect(() => (
        getTopComments(),
        getTopPosts()
    ), [])

    const getTopPosts = async () => {
        var userId = user[0].id
        await API.getTopUserPosts(userId)
        .then(async res => setTopPosts(await res.data))
        // console.log(topPosts , "done with both")
        // .then(res => console.log(res , "response for top posts"))
    }

    const getTopComments = async () => {
        var userId = user[0].id
        await API.getTopUserComments(userId)
        .then(async res => setTopComments(await res.data))
        // .then(res=> console.log(res.data , "response for top comments"))
    }

    return(
        <div className="myAccountPage container">
            <div className="accountInfoCont">
                {user.map((index) => (
                    <>
                    <div className="leftSide">
                <div className="sectionHolder">
                    <h3 className="firstNameHeaderText" id="headerText">First Name</h3>
                <h4 className="firstNameText" id="infoText">{index.first_name}</h4>
                </div>
                <div className="sectionHolder">
                    <h3 className="userNameSecText" id="headerText">Username</h3>
                <h4 className="usernameText" id="infoText">{index.username}</h4>
                </div>
                <div className="sectionHolder">
                    <h3 className="cityHeaderText" id="headerText">City</h3>
                <h4 className="cityText" id="infoText">{index.city}</h4>
                </div>
                <div className="sectionHolder">
                    <h3 className="titleHeaderText" id="headerText">Title</h3>
                <h4 className="titleText" id="infoText" >{index.job_title}</h4>
                </div>
            </div>

            <div className="rightSide">
                <div className="sectionHolder">
                <h3 className="lastNameHeaderText" id="headerText">Last Name</h3>
                <h4 className="lastNameText" id="infoText">{index.last_name}</h4>
                </div>
                <div className="sectionHolder">
                <h3 className="emailHeaderText" id="headerText">Email</h3>
                <h4 className="emailText" id="infoText">{index.email}</h4>
                </div>
                <div className="sectionHolder">
                <h3 className="zipcodeHeaderText" id="headerText">Zipcode</h3>
                <h4 className="zipcodeText" id="infoText">{index.zipcode}</h4>
                </div>
                <div className="sectionHolder">
                <h3 className="ageHeaderText" id="headerText">Age</h3>
                <h4 className="ageText" id="infoText">{index.age}</h4>
                </div>
            </div>
            </>
                ))}
            </div>
                <div className="topStatsCont">
                <div className="topPostsCont">
                <h1 id="topStatsHeaderText">Top Posts</h1>
                    {topPosts.map((index) => (
                        // (console.log(index , "index for posts box")),
                    <button className="postBox">
                        <img className="postImg" src={index.blog_img}></img>
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
                    {topComments.map((index) => (
                        (console.log(index , "index for comments box")),
                    <button className="commentBox">
                        <h3>{index.comment_body}</h3>

                    </button>
                    ))}

                </div>
            </div>
        </div>
    )
}