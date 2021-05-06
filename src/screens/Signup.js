import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import LoadingPage from '../components/Loading/index';
import "../stylesheets/signup.css";
import TopicBtn from "../components/TopicBtn";

export default function Signup() {
  const [pageTwoShow, setPageTwoShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [titleMsg, setTitleMsg] = useState(null);
  const [topicLimit, setTopicLimit] = useState(5);

  

  const topicsArr = ["Food", "Self-Improvement", "Technology", "Business", "Pop-Culture", "Music", "Fashion"];


  // useEffect(() => {
  //   if(topicClicked === false){
  //     setBtnColor("white");
  //   }else if(topicClicked === true){
  //     setBtnColor("green")
  //   }
  // }, [topicClicked])


  const history = useHistory();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ageRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const jobTitleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(titleMsg === null){
      setTitleMsg("Almost Finished!");
    }else if(titleMsg === "Almost Finished!" && loading === false){
      setTimeout(() => {
        setTitleMsg(`Personalize Your Experience, Select (${topicLimit})`)
      }, 2 * 1800);
    }else{
      setTitleMsg(`Personalize Your Experience, Select (${topicLimit})`)
    }
  }, [loading, titleMsg, topicLimit])

  const validateForm = (e) => {
    e.preventDefault();
    var dateTime = new Date().toJSON().slice(0, 19).replace("T", " ");
    var signupObject = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      age: ageRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value,
      jobTitle: jobTitleRef.current.value,
      date: dateTime,
    };
    if (signupObject.firstName === "") {
      alert("Please enter user name");
    } else if (signupObject.lastName === "") {
      alert("Please enter last name");
    } else if (signupObject.username === "") {
      alert("Please enter username");
    } else if (signupObject.email === "") {
      alert("Please enter email");
    } else if (signupObject.password === "") {
      alert("Please enter email");
    } else if (signupObject.age === "") {
      alert("Please enter age");
    } else if (signupObject.city === "") {
      alert("Please enter city");
    } else if (signupObject.state === "") {
      alert("Please enter state")
    } else if (signupObject.zip === "") {
      alert("Please enter zip");
    } else if (signupObject.jobTitle === "") {
      alert("Please enter job title");
    } else {
      signupUser(signupObject);
    }
  };

  const loadPageTwo = () => {
    setPageTwoShow(true);
    setTimeout(() => {
        return setLoading(false);
    }, 2 * 2200);
  }

  const trySignupAgain = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    await API.getUserInfo(userId).then((userData) => {
      console.log(userData, "user data if og sign up fails");
    })
    // history.push('/home');
        loadPageTwo();
  }

  const signupUser = async (signupObject) => {
    await API.signupUser(signupObject).then((res) => {
      if(res.status === 200){
        localStorage.setItem("loggedInUserId", res.data.insertId);
        let userId = localStorage.getItem("loggedInUserId");
        if(userId === res.data.insertId){
          API.getUserInfo(userId).then((userRes) => {
            console.log(userRes, "response for user object");
          })
          loadPageTwo();
            // history.push('/home');
        }else{
          trySignupAgain();
        }
      }else{
        alert('error creating user');
      }
    });
  };


  const recieveTopicsFromChild = (topicsObj) => {
    console.log(topicsObj, "topic obj from topic");
  }

  if(pageTwoShow === false){
  return (
    <div className="signup-page container-fixed">
      <h1>Tell Us About Yourself!</h1>
      <div className="signup-container">
        <form>
          <label>First</label>
          <input type="text" ref={firstNameRef}></input>
          <label>Last</label>
          <input type="text" ref={lastNameRef}></input>
          <label>Username</label>
          <input type="text" ref={usernameRef}></input>
          <label>Email</label>
          <input type="text" ref={emailRef}></input>
          <label>Password</label>
          <input type="text" ref={passwordRef}></input>
        </form>
        <form>
          <label>Age</label>
          <input type="text" ref={ageRef}></input>
          <label>City</label>
          <input type="text" ref={cityRef}></input>
          <label>Zip</label>
          <input type="text" ref={zipRef}></input>
          <label>State</label>
          <input type="text" ref={stateRef}></input>
          <label>Title</label>
          <input type="text" ref={jobTitleRef}></input>
        </form>
        <button 
        onClick={validateForm}
         className="submit-btn">
          <p>Continue <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></p>
        </button>
      </div>
    </div>
  );
}
else if(pageTwoShow === true){
  if(loading === true){
    return(
      <div className="load-screen-holder">
        <LoadingPage />
       </div>
    )
  }else{
  return(
    <div className="signup-page-two container-fixed">
      <h1>{titleMsg}</h1>
      <div className="topic-cont container-fixed">
        <TopicBtn 
          arrForComp = {topicsArr}
          parentFunc = {recieveTopicsFromChild}
        />
               {/* {topicsArr.map((topic , key) => (
          <button className="topic-btn" style={{backgroundColor : btnColor}} onClick={e => {selectTopic(e.target.id)}}>
            <p className={`topic-${key}`} id={topic}>{topic}</p>
                </button>
        ))} */}
      </div>
    </div>
  )
}
}
}
