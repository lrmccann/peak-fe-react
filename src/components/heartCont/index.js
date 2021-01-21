import React, { useContext, useEffect, useRef, useState } from 'react';
import photo from "../../images/heart-icon-two.png";
import "./index.css";

export default function HeartCont (props) {

    // pass props into useState !!

    const [numOfLikes , setNumOfLikes] = useState(props.numOfLikes);

    const addLike = () => {
        setNumOfLikes(numOfLikes + 1)


    }

    // console.log(props.numOfLikes , "i am props to heart cont")
    console.log(numOfLikes , "num of likes")
    console.log(props.postId , "i am full props")

    if(numOfLikes === numOfLikes){
        return(
            <div className="likeCont">
            <div className="likeCountText">
                <button className="heartBtn" onClick={addLike}>
                    <p className="heartCounter" id={numOfLikes}>{numOfLikes}</p>
                    <img className="heartImg" src={photo}></img>
                </button>
            </div>
        </div>
        )
    }else{
        return(
            <div className="likeCont">
            <div className="likeCountText">
                <button className="heartBtn">
                    {/* <p className="heartCounter">{}</p> */}
                    <img className="heartImg" src={photo}></img>
                </button>
            </div>
        </div>
        )
    }

}