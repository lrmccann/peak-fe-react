import React, { useRef } from 'react';
import "../stylesheets/signup.css";
import { useHistory } from "react-router-dom";

export default function Signup () {

    const history = useHistory();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const ageRef = useRef(null);
    const cityRef = useRef(null);
    const zipRef = useRef(null);
    const jobTitleRef = useRef(null);

    const validateForm = e => {
        e.preventDefault();
        var signupObject = {
            firstName = firstNameRef.current.value,
            lastName = lastNameRef.current.value,
            email = emailRef.current.value,
            password = passwordRef.current.value,
            age = ageRef.current.value,
            city = cityRef.current.value,
            zip = zipRef.current.value,
            jobTitle = jobTitleRef.current.value
        }
        if(firstNameRef.current.value || lastNameRef.current.value || emailRef.current.value || passwordRef.current.value || ageRef.current.value || cityRef.current.value || zipRef.current.value || jobTitleRef.current.value === ""){
            alert("Please fill out all required forms")
        }else{
            signUpUser()
        }
    }

    // const signUpUser = async (signupObject) => {
    //     await

    // }


    return(
        <div className="signupPage container-fixed">
            <div className="signupContainer">
                <form>
                    <label>First</label>
                    <input type="text" ref={firstNameRef}></input>
                    <label>Last</label>
                    <input type="text" ref={lastNameRef}></input>
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
                    <label>Title</label>
                    <input type="text" ref={jobTitleRef}></input>
                </form>
                <button onClick={validateForm} className="submit-btn"><p>Sign Up</p></button>

            </div>
        </div>
    )
}