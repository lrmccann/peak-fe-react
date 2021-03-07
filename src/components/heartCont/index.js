// import React, {useState} from 'react';
// import photo from "../../images/heart-icon-two.png";
// import photoTwo from "../../images/heart-icon-one.png"
// import API from '../../utils/API';
// import "./index.css";

// export default function HeartCont(props) {

//     const [numOfLikes, setNumOfLikes] = useState(props.numOfLikes);
//     const [userClicked, setUserClicked] = useState(false);

//     const addLike = async () => {
//         if (userClicked === false) {
//             setNumOfLikes(numOfLikes + 1)
//             var postIdToSend = props.postId;
//             var postTitleToSend = props.postTitle;
//             var likesPlusOne = numOfLikes + 1;
//             await API.addLike(postIdToSend, likesPlusOne, postTitleToSend)
//                 .then(setUserClicked(true));
//         } else if (userClicked === true) {
//             setNumOfLikes(numOfLikes - 1)
//             var postIdToSendTwo = props.postId;
//             var postTitleToSendTwo = props.postTitle;
//             var likesMinusOne = numOfLikes - 1;
//             await API.addLike(postIdToSendTwo, likesMinusOne, postTitleToSendTwo)
//                 .then(setUserClicked(false));
//         }
//     }

//     if (userClicked === false) {
//         return (
//             <div className="likeContainer container-fixed">
//                     <button className="heartBtn" onClick={addLike}>
//                         <img className="heartImg" src={photo}></img>
//                         <p className="heartCounter" id={numOfLikes}>{numOfLikes}</p>
//                     </button>
//                 </div>
//         )
//     } else if (userClicked === true) {
//         return (
//             <div className="likeContainer container-fixed">
//                     <button className="heartBtn" onClick={addLike}>
//                         <img className="heartImg" src={photo}></img>
//                         <p className="heartCounter">{numOfLikes}</p>
//                     </button>
//                 </div>
//         )
//     }
// }