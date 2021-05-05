import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "../stylesheets/signup.css";

export default function Signup() {
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
    } else if (signupObject.zip === "") {
      alert("Please enter zip");
    } else if (signupObject.jobTitle === "") {
      alert("Please enter job title");
    } else {
      signupUser(signupObject);
    }
  };

  const trySignupAgain = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    await API.getUserInfo(userId).then((userData) => {
      console.log(userData, "user data if og sign up fails");
    })
    history.push('/home');
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
            history.push('/home');
        }else{
          trySignupAgain();
        }
      }else{
        alert('error creating user');
      }
    });
  };

  return (
    <div className="signup-page container-fixed">
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
          <p>Sign Up</p>
        </button>
      </div>
    </div>
  );
}
