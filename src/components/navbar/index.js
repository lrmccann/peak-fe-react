import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.css";

export default function NavbarTop() {
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

    return(
        <div className="navbarTop">
        <h2 className="logoText">Peak</h2>
        <div className="moveRight">
            <button id="navBtn" className="navBtnHome" onClick={navHome}><p id="btnText">Home</p></button>
            <button id="navBtn" className="navBtnAccount" onClick={navAccount}><p id="btnText" >Account</p></button>
            <button id="navBtn" className="navBtnLogout" onClick={navLogout}><p id="btnText">Log Out</p></button>
        </div>
    </div>
    )
}