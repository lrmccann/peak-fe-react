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

  const topicChoices = {
    topicOne : "Food",
    topicTwo : "Self-Improvement",
    topicThree : "Technology",
    topicFour : "Business",
    topicFive : "Pop-Culture",
    topicSix : "Music",
    topicSeven : "Fashion",
    topicEight : "Gardening",
    topicNine : "Finance",
    topicTen : "Health",
    topicEleven : "Gaming",
    topicTwelve : "Medicine",
    topicThirteen : "Movies",
    topicFourteen : "Sports",
    topicFifteen : "Travel"
  }
  // refs to create user obj
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
// history
const history = useHistory();

// scroll top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(titleMsg === null){
      setTitleMsg("Almost Finished!");
    }else if(titleMsg === "Almost Finished!" && loading === false){
      setTimeout(() => {
        setTitleMsg(`Personalize Your Experience (${topicLimit})`)
      }, 2 * 1800);
    }else{
      setTitleMsg(`Personalize Your Experience (${topicLimit})`)
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
// load state for pg 2 and set brief load
  const loadPageTwo = () => {
    setPageTwoShow(true);
    setTimeout(() => {
        return setLoading(false);
    }, 2 * 1600);
  }

  // get user obj from sql + set local storage
  const trySignupAgain = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    await API.getUserInfo(userId)
    .then((userData) => {
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
          API.getUserInfo(userId)
          .then((userRes) => {
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
  // state for topic obj
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [choiceThree, setChoiceThree] = useState(null);
  const [choiceFour, setChoiceFour] = useState(null);
  const [choiceFive, setChoiceFive] = useState(null);

  // topic obj to send to be
  const topicObj = {
    choiceOne : choiceOne,
    choiceTwo : choiceTwo,
    choiceThree : choiceThree,
    choiceFour : choiceFour,
    choiceFive : choiceFive,
}
// func passed to child buttons to receive topics
  const getTopic = (someTopic) => {
        if (choiceOne === null){
            setTopicLimit(topicLimit - 1)
            return setChoiceOne(someTopic);
        }else if(choiceOne !== null && choiceTwo === null){
            setTopicLimit(topicLimit - 1)
            return setChoiceTwo(someTopic);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree === null){
            setTopicLimit(topicLimit - 1)
            return setChoiceThree(someTopic);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree !== null && choiceFour === null){
            setTopicLimit(topicLimit - 1)
            return setChoiceFour(someTopic);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree !== null && choiceFour !== null && choiceFive === null){
            setTopicLimit(topicLimit - 1)
            return setChoiceFive(someTopic);
        }else if(choiceOne !== null && choiceTwo !== null && choiceThree !== null && choiceFour !== null && choiceFive !== null){
          alert("Please remove a topic before selecting a new one");
          return setTopicLimit(0);
        }
  }
// func passed to child buttons to remove topics
  const removeTopic = (someTopic) => {
    if (choiceOne === someTopic){
        setTopicLimit(topicLimit + 1)
        return setChoiceOne(null);
    }else if(choiceOne !== someTopic && choiceTwo === someTopic){
        setTopicLimit(topicLimit + 1)
        return setChoiceTwo(null);
    }else if(choiceOne !== someTopic && choiceTwo !== someTopic && choiceThree === someTopic){
        setTopicLimit(topicLimit + 1)
        return setChoiceThree(null);
    }else if(choiceOne !== someTopic && choiceTwo !== someTopic && choiceThree !== someTopic && choiceFour === someTopic){
        setTopicLimit(topicLimit + 1)
        return setChoiceFour(null);
    }else if(choiceOne !== someTopic && choiceTwo !== someTopic && choiceThree !== someTopic && choiceFour !== someTopic && choiceFive === someTopic){
        setTopicLimit(topicLimit + 1)
        return setChoiceFive(null);
    }else if(choiceOne !== someTopic && choiceTwo !== someTopic && choiceThree !== someTopic && choiceFour !== someTopic && choiceFive !== someTopic) {
      alert("Please remove a topic before selecting a new one")
        return setTopicLimit(0);
    }
  }
  // send topics to api
  const sendTopics = async () => {
    const userId = localStorage.getItem('loggedInUserId')
    if(topicObj.choiceOne === null || topicObj.choiceTwo === null || topicObj.choiceThree === null || topicObj.choiceFour === null || topicObj.choiceFive === null ){
      alert("Please select all five topics you may be interested in!")
    }else{
      await API.sendUserTopics(topicObj, userId ).then((res) => {
        console.log(res, "res for user topic obj")
      })
      history.push('/home');
    }
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
      <div className="load-screen-holder container-fixed">
        <LoadingPage />
       </div>
    )
  }else{
  return(
    <div className="signup-page-two container-fixed">
      <h1>{titleMsg}</h1>
      <div className="topic-cont container-fixed">
        <TopicBtn topic = {topicChoices.topicOne} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicTwo} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicThree} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicFour} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicFive} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicSix} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicSeven} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicEight} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicNine} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicTen} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicEleven} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicTwelve} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicThirteen} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicFourteen} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
        <TopicBtn topic = {topicChoices.topicFifteen} getTopic = {getTopic} removeTopic = {removeTopic} limit={topicLimit} />
      </div>
      <button className="topic-btn" onClick={sendTopics}><p>Finish</p></button>
    </div>
  )
}
}
}
