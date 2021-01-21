import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.css";

export default function NavbarTop() {
    const [menuDisplay , setMenuDisplay] = useState("none");
    const history = useHistory();

    const navHome = () => {
        history.push('/home')
    }
    const navAccount = () => {
        history.push('/myaccount')
    }
    const navLogout = () => {
        history.push('/')
    }

    const openMenu = () => {
        if(menuDisplay === "none"){
            setMenuDisplay("flex")
        }else{
            setMenuDisplay("none")
        }
    }



    return(
        <div className="navbarTop">
            <div className="logoTextCont">
        <h2 className="logoText">Peak</h2>
        </div>
        <div className="moveRight">
            <button id="navBtn" className="navBtnHome" onClick={navHome}><p id="btnText">Home</p></button>
            <button id="navBtn" className="navBtnAccount" onClick={openMenu}><p id="btnText" >Account</p></button>
            <div className="dropDownCont" style={{display: `${menuDisplay}`}}>
                <li className="listHolder">
                    <ul id="menuOptionLI"><button id="menuOptionBtn" onClick={navAccount}>My Stats</button></ul>
                    <ul id="menuOptionLI"><button id="menuOptionBtn">My Posts</button></ul>
                    <ul id="menuOptionLI"><button id="menuOptionBtn">Peak +</button></ul>
                </li>

            </div>
            <button id="navBtn" className="navBtnLogout" onClick={navLogout}><p id="btnText">Log Out</p></button>
        </div>
    </div>
    )
}