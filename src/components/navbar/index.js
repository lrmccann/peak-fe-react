import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import UserContext from '../../utils/Context';
import peakIcon from '../../images/peak-blogspace-icon.png';
import "./style.css";

export default function NavbarTop() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [newBlogOpen, setNewBlogOpen] = useState(false);
    // Refs for new blog post
    const imgHeader = useRef(null);
    const blogTitle = useRef(null);
    const blogBody = useRef(null);
    // Screen nav
    const navHome = () => {
        history.push('/home')
    }
    const navAccount = () => {
        history.push('/myaccount')
    }
    const navMyPosts = () => {
        history.push('/myposts')
    }
    const navLogout = () => {
        history.push('/')
    }
    // open new blog modal
    const openBlog = () => {
        setNewBlogOpen(true);
    }
    const closeBlog = () => {
        setNewBlogOpen(false);
    }

    const handleBlogPost = async e => {
        e.preventDefault();
        var resultsInFullScope = {};
        var imgHeaderToSend = imgHeader.current.value;
        var blogTitleToSend = blogTitle.current.value;
        var blogBodyToSend = blogBody.current.value;
        var userIdToSend = await user[0].id;

        var blogInfoToSend = {
            imgHeaderToSend,
            blogTitleToSend,
            blogBodyToSend,
            userIdToSend
        }
        await API.postNewBlog({ blogInfoToSend })
            .then(res => { resultsInFullScope = res })
        if (resultsInFullScope.status === 202) {
            setNewBlogOpen(false);
        } else {
            alert('An error occured while posting your blog, please try again later.')
        }
    }

    if(newBlogOpen === false){
    return (
        <div className="navbarTop">
            <div className="logoTextCont">
                {/* <h2 className="logoText">Peak</h2> */}
                <img src={peakIcon}></img>
            </div>
            <div className="newPostBtn">
                <button className="postBtnForReal" onClick={openBlog}>
                    <h3>New Post</h3>
                </button>

            </div>
            <div className="moveRight">
                <button id="navBtn" className="navBtnHome" onClick={navHome}><p id="btnText">Home</p></button>
                <button id="navBtn" className="navBtnAccount" onClick={navAccount}><p id="btnText" >Account</p></button>
                {/* <button id="navBtn" className="navBtnAccount" onClick={openMenu}><p id="btnText" >Account</p></button>
                <div className="dropDownCont" style={{ display: `${menuDisplay}` }}>
                    <li className="listHolder">
                        <ul id="menuOptionLI"><button id="menuOptionBtn" onClick={navAccount}>My Stats</button></ul>
                        <ul id="menuOptionLI"><button id="menuOptionBtn" onClick={navMyPosts}>My Posts</button></ul>
                        <ul id="menuOptionLI"><button id="menuOptionBtn">Peak +</button></ul>
                    </li>
                </div> */}
                <button id="navBtn" className="navBtnLogout" onClick={navLogout}><p id="btnText">Log Out</p></button>
            </div>
        </div>
    )
            }
                else if(newBlogOpen === true){
                    return (
                        <div className="homeCont container">
                            <div className="newPostModal" id="newPostModal">
                                <button className="closeModalBtn" onClick={closeBlog} >X</button>
                                <button className="openDialogBtn"><i className="fas fa-search"></i></button>
                                <h6 style={{ marginTop: '2%' }} id="categoryText">Image Header</h6>
                                <input id="modalInput" ref={imgHeader} className="imgInput"></input>
                                <h6 id="categoryText">Title</h6>
                                <input id="modalInputTwo" ref={blogTitle} className="titleInput"></input>
                                <h6 style={{ marginLeft: '8%' }} >Body</h6>
                                <textarea id="modalInputThree" ref={blogBody} className="bodyInput"></textarea>
                                <button style={{ cursor: "pointer" }} onClick={handleBlogPost} className="submitBlogBtn">Create Post</button>
                            </div>
                        </div>
                    )
                }
}