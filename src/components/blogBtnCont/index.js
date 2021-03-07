import React, { useContext, useEffect, useRef, useState } from 'react';
import bookMarkIcon from '../../images/bookmark-unchecked.png';
import bookMarkIconClicked from '../../images/bookmark-checked.png';
import thumbsUpIcon from '../../images/thumbs-up.png';
import thumbsUpIconClicked from '../../images/thumbs-up-clicked.png';
import settingsIcon from '../../images/settings-icon.png';
import API from '../../utils/API';
import './style.css';



export default function BlogBtnCont(props){

    const [bookMarked , setBookmarked] = useState(bookMarkIcon);
    const [likeBtn , setLikeBtn] = useState(thumbsUpIcon);
    const [settingsClicked , setSettingsClicked] = useState(false);


    const [numOfLikes, setNumOfLikes] = useState(props.numOfLikes);
    const [userClicked, setUserClicked] = useState(false);

    const addLike = async () => {
        if (userClicked === false) {
            setNumOfLikes(numOfLikes + 1)
            setLikeBtn(thumbsUpIconClicked);
            var postIdToSend = props.postId;
            var postTitleToSend = props.postTitle;
            var likesPlusOne = numOfLikes + 1;
            await API.addLike(postIdToSend, likesPlusOne, postTitleToSend)
                .then(setUserClicked(true))
        } else if (userClicked === true) {
            setNumOfLikes(numOfLikes - 1)
            setLikeBtn(thumbsUpIcon);
            var postIdToSendTwo = props.postId;
            var postTitleToSendTwo = props.postTitle;
            var likesMinusOne = numOfLikes - 1;
            await API.addLike(postIdToSendTwo, likesMinusOne, postTitleToSendTwo)
                .then(setUserClicked(false));
        }
    }

    const bookMark = async () => {
        if(bookMarked === bookMarkIcon){
            setBookmarked(bookMarkIconClicked);
        }else{
            setBookmarked(bookMarkIcon);
        }

    }





    return(
        <div className="btnContainer container-fluid">
                        <button className="likeIcon" onClick={addLike} style={{backgroundImage : "url(" + likeBtn  + ")"}}>
                {/* <h4 className="numOfUpvotes">{numOfLikes}</h4> */}
                </button>
            <button className="bookMarkIcon" onClick={bookMark} style={{backgroundImage : "url(" + bookMarked  + ")"}}></button>
            <button className="settingsIcon" style={{backgroundImage : "url(" + settingsIcon  + ")"}}></button>
        </div>







    )













}