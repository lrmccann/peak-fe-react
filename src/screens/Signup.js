import React, { useRef, useEffect, useState, useContext } from "react";
import UserContext from "../utils/Context";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../components/Loading/index";
import TopicBtn from "../components/TopicBtn";
import "../stylesheets/signup.css";

export default function Signup() {
  // state to set title message a few seconds after user loads second page
  const [loadTitleMessage, setLoadTitleMessage] = useState(false);
  const [titleMsg, setTitleMsg] = useState(null);
  // state to show select topic screen
  const [pageTwoShow, setPageTwoShow] = useState(false);
  // state for topic limit, updates UI & capped at 5
  const [topicLimit, setTopicLimit] = useState(5);
  // state for loading
  const [loading, setLoading] = useState(true);
  // state to load preview image of blog img
  const [imgSrc, setImgSrc] = useState();

  const [selectedFile, setSelectedFile] = useState();

  const { setUser } = useContext(UserContext);

  const inputFile = useRef(null);

  const topicChoices = {
    topicOne: "Food",
    topicTwo: "Self-Improvement",
    topicThree: "Technology",
    topicFour: "Business",
    topicFive: "Pop-Culture",
    topicSix: "Music",
    topicSeven: "Fashion",
    topicEight: "Gardening",
    topicNine: "Finance",
    topicTen: "Health",
    topicEleven: "Gaming",
    topicTwelve: "Medicine",
    topicThirteen: "Movies",
    topicFourteen: "Sports",
    topicFifteen: "Travel",
  };

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

  const history = useHistory();

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loadTitleMessage === true) {
      setTitleMsg("Almost Finished!");
      setTimeout(() => {
        return setTitleMsg(`Personalize Your Experience (${topicLimit})`);
      }, 2 * 1100);
    } else {
      setTitleMsg("Almost Finished!");
    }
  }, [loadTitleMessage, topicLimit]);

  // state for topic obj
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [choiceThree, setChoiceThree] = useState(null);
  const [choiceFour, setChoiceFour] = useState(null);
  const [choiceFive, setChoiceFive] = useState(null);

  // topic obj to send to be
  const topicObj = {
    choiceOne: choiceOne,
    choiceTwo: choiceTwo,
    choiceThree: choiceThree,
    choiceFour: choiceFour,
    choiceFive: choiceFive,
  };

  // func passed to child buttons to receive topics
  const getTopic = (someTopic) => {
    if (choiceOne === null) {
      setTopicLimit(topicLimit - 1);
      return setChoiceOne(someTopic);
    } else if (choiceOne !== null && choiceTwo === null) {
      setTopicLimit(topicLimit - 1);
      return setChoiceTwo(someTopic);
    } else if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceThree === null
    ) {
      setTopicLimit(topicLimit - 1);
      return setChoiceThree(someTopic);
    } else if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceThree !== null &&
      choiceFour === null
    ) {
      setTopicLimit(topicLimit - 1);
      return setChoiceFour(someTopic);
    } else if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceThree !== null &&
      choiceFour !== null &&
      choiceFive === null
    ) {
      setTopicLimit(topicLimit - 1);
      return setChoiceFive(someTopic);
    } else if (
      choiceOne !== null &&
      choiceTwo !== null &&
      choiceThree !== null &&
      choiceFour !== null &&
      choiceFive !== null
    ) {
      alert("Please remove a topic before selecting a new one");
      return setTopicLimit(0);
    }
  };
  // func passed to child buttons to remove topics
  const removeTopic = (someTopic) => {
    if (choiceOne === someTopic) {
      setTopicLimit(topicLimit + 1);
      return setChoiceOne(null);
    } else if (choiceOne !== someTopic && choiceTwo === someTopic) {
      setTopicLimit(topicLimit + 1);
      return setChoiceTwo(null);
    } else if (
      choiceOne !== someTopic &&
      choiceTwo !== someTopic &&
      choiceThree === someTopic
    ) {
      setTopicLimit(topicLimit + 1);
      return setChoiceThree(null);
    } else if (
      choiceOne !== someTopic &&
      choiceTwo !== someTopic &&
      choiceThree !== someTopic &&
      choiceFour === someTopic
    ) {
      setTopicLimit(topicLimit + 1);
      return setChoiceFour(null);
    } else if (
      choiceOne !== someTopic &&
      choiceTwo !== someTopic &&
      choiceThree !== someTopic &&
      choiceFour !== someTopic &&
      choiceFive === someTopic
    ) {
      setTopicLimit(topicLimit + 1);
      return setChoiceFive(null);
    } else if (
      choiceOne !== someTopic &&
      choiceTwo !== someTopic &&
      choiceThree !== someTopic &&
      choiceFour !== someTopic &&
      choiceFive !== someTopic
    ) {
      alert("Please remove a topic before selecting a new one");
      return setTopicLimit(0);
    }
  };

  // get user obj from sql + set local storage
  const tryFetchDetailsAgain = async (userId) => {
    console.log(userId, "the id")
    await API.getUserInfo(userId).then((userData) => {
      console.log(userData, "the data")
      if (userData.status === 404) {
        alert("error retrieving user data from sql");
      } else if (userData.status === 200) {
        setUser(userData.data);
        history.push("/home");
      }
    });
  };

  // send topics to api
  const sendTopics = async () => {
    const userId = localStorage.getItem("loggedInUserId");
    if (
      topicObj.choiceOne === null ||
      topicObj.choiceTwo === null ||
      topicObj.choiceThree === null ||
      topicObj.choiceFour === null ||
      topicObj.choiceFive === null
    ) {
      alert("Please select all five topics you may be interested in!");
    } else {
      await API.sendUserTopics(topicObj, userId).then((res) => {
        if (res.status === 400) {
          alert("Error posting topics, please try again");
        } else if (res.status === 200) {
            tryFetchDetailsAgain(userId);
        }
      })
    }
  };

  // load state for pg 2 and set brief load
  const loadPageTwo = () => {
    setLoadTitleMessage(true);
    setPageTwoShow(true);
    setTimeout(() => {
      return setLoading(false);
    }, 2 * 1100);
  };

  // send s3 bucket url and user entered details to server to create user
  const signupUser = async (newAwsURL, signupObject) => {
    let finalSignupObj = {
      icon: newAwsURL,
      firstName: signupObject.firstName,
      lastName: signupObject.lastName,
      username: signupObject.username,
      email: signupObject.email,
      password: signupObject.password,
      age: signupObject.age,
      city: signupObject.city,
      state: signupObject.state,
      zip: signupObject.zip,
      jobTitle: signupObject.jobTitle,
      date: signupObject.date,
    };

    await API.signupUser(finalSignupObj).then((res) => {
      console.log(res)
      if (res.status === 200) {
        document.cookie = res.data.sessToken;
        localStorage.setItem("loggedInUserId", res.data.userData.id);
        loadPageTwo();
      } else {
        alert("error creating user, please try again");
      }
    });
  };

  // send selected img file to aws and return new url to use for icon in sql
  const sendIconAws = async (awsFileName, fileType, fileData, signupObject) => {
    if (fileData === null) {
      setTimeout(() => {
        // checkFileType(signupObject);
        alert("Please select an image")
      }, 2 * 500);
    } else {
      const base64Data = new Buffer.from(
        fileData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      await API.postUserImg(awsFileName, fileType, base64Data).then((res) => {
        if (res.status === 404) {
          return alert("There was an error posting your photo");
        } else if (res.status === 200) {
          signupUser(res.data, signupObject);
        }
      });
    }
  };
  // check file type and then manipulate data to send to s3 bucket
  const checkFileType = async (signupObject) => {
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      let fileTypeAfterReplace = `${selectedFile.type}`.replace("image/", "");
      let awsFileName =
        `${signupObject.firstName}${signupObject.lastName}`.replace(/\s/g, "");
      if (fileTypeAfterReplace === null) {
        return alert("file did not de stringify");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function () {
          sendIconAws(
            awsFileName,
            fileTypeAfterReplace,
            reader.result,
            signupObject
          );
        };
        reader.onerror = function () {
          return console.log(reader.error, "on error load");
        };
      }
    } else {
      alert("Please Select From png, jpg, jpeg, or pdf");
    }
  };

  // creating initial signup obj and checking the fields for empty string or null
  const validateForm = (e) => {
    e.preventDefault();
    let dateTime = new Date().toJSON().slice(0, 19).replace("T", " ");
    let signupObject = {
      icon: selectedFile,
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

    if (signupObject.icon === "") {
      alert("Please select a profile icon");
    } else if (signupObject.firstName === "") {
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
      alert("Please enter state");
    } else if (signupObject.zip === "") {
      alert("Please enter zip");
    } else if (signupObject.jobTitle === "") {
      alert("Please enter job title");
    } else {
      checkFileType(signupObject);
    }
  };

  // get file from input type="file"
  const retrieveFile = () => {
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      const fileList = this.files;
      if (fileList.length === 0 || fileList === null) {
        return alert("Error Loading File, Please Try Again");
      } else {
        let dataUrl = URL.createObjectURL(fileList[0]);
        setImgSrc(dataUrl);
        return setSelectedFile(fileList[0]);
      }
    }
  };
  const openDialogue = () => {
    inputFile.current.click();
    retrieveFile();
  };

  if (!pageTwoShow) {
    return (
      <div className="signup-page container-fixed">
        <h1>Tell Us About Yourself!</h1>
        <div className="signup-container">
          <div className="user-icon-cont container-fixed">
            <button onClick={openDialogue}>
              <input
                type="file"
                id="input"
                ref={inputFile}
                style={{ display: "none" }}
              ></input>
              <img src={imgSrc} alt="Your Profile Icon"></img>
            </button>
          </div>
          <div className="forms-container">
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
          </div>
          <button onClick={validateForm} className="submit-btn">
            <p>
              Continue <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </p>
          </button>
        </div>
      </div>
    );
  } else {
    if (loading) {
      return (
        <div className="load-screen-holder container-fixed">
          <LoadingPage />
        </div>
      );
    } else {
      return (
        <div className="signup-page-two container-fixed">
          <h1>{titleMsg}</h1>
          <div className="topic-cont container-fixed">
            <TopicBtn
              topic={topicChoices.topicOne}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicTwo}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicThree}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicFour}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicFive}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicSix}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicSeven}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicEight}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicNine}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicTen}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicEleven}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicTwelve}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicThirteen}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicFourteen}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
            <TopicBtn
              topic={topicChoices.topicFifteen}
              getTopic={getTopic}
              removeTopic={removeTopic}
              limit={topicLimit}
            />
          </div>
          <button className="topic-btn" onClick={sendTopics}>
            <p>Finish</p>
          </button>
        </div>
      );
    }
  }
}
