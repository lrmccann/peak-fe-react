import React, { useEffect, useState } from "react";
import bookMarkIcon from "../../images/bookmark-unchecked.png";
import bookMarkIconClicked from "../../images/bookmark-checked.png";
import thumbsUpIcon from "../../images/thumbs-up.png";
import thumbsUpIconClicked from "../../images/thumbs-up-clicked.png";
import settingsIcon from "../../images/settings-icon.png";
import API from "../../utils/API";
import "./style.css";

export default function BlogBtnCont(props) {
  const [bookMarked, setBookmarked] = useState(bookMarkIcon);
  const [likeBtn, setLikeBtn] = useState(thumbsUpIcon);
  // const [settingsClicked, setSettingsClicked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(props.numOfLikes);
  const [loading, setLoading] = useState(true);

  var bookmarksArr = props.bookMarkedPosts;
  var likedPostArr = props.likedPosts;

  // set already bookmarked posts & likes
  useEffect(() => {
    bookmarksArr.map((index) => {
      if (index === props.postId) {
        return setBookmarked(bookMarkIconClicked);
      }
    });
    if (likedPostArr.length === 0) {
      setLoading(true);
    } else {
      likedPostArr.map((index) => {
        if (index === props.postId) {
          return setLikeBtn(thumbsUpIconClicked);
        }
      });
      setLoading(false);
    }
  }, [bookmarksArr, props.postId, likedPostArr]);
  //

  const toggleLike = async () => {
    if (likeBtn === thumbsUpIcon) {
      setNumOfLikes(numOfLikes + 1);
      var postIdToSend = props.postId;
      var postTitleToSend = props.postTitle;
      var likesPlusOne = numOfLikes + 1;
      await API.addLike(postIdToSend, likesPlusOne, postTitleToSend).then(
        (results) => {
          if (results.status === 200) {
            setLikeBtn(thumbsUpIconClicked);
          } else {
            alert("Failed to like post, please try again");
          }
        }
      );
    } else {
      setNumOfLikes(numOfLikes - 1);
      var postIdToSendTwo = props.postId;
      var postTitleToSendTwo = props.postTitle;
      var likesMinusOne = numOfLikes - 1;
      await API.addLike(
        postIdToSendTwo,
        likesMinusOne,
        postTitleToSendTwo
      ).then((response) => {
        if (response.status === 200) {
          setLikeBtn(thumbsUpIcon);
        } else {
          alert("Failed to unliked post, please try again");
        }
      });
    }
  };

  const toggleBookmark = async () => {
    var userId = localStorage.getItem("loggedInUserId");
    var idToSend = props.postId;
    if (bookMarked === bookMarkIcon) {
      await API.bookmarkNewPost(idToSend, userId).then((response) => {
        if (response.status === 202) {
          setBookmarked(bookMarkIconClicked);
        } else {
          alert("Failed to bookmark");
        }
      });
    } else {
      await API.removeBookmarkedPost(idToSend, userId).then(
        setBookmarked(bookMarkIcon)
      );
    }
  };

  if (loading === true) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <div className="blog-btn-cont-page container-fluid">
        <button
          className="like-btn"
          onClick={toggleLike}
          style={{ backgroundImage: "url(" + likeBtn + ")" }}
        ></button>
        <button
          className="bookmark-btn"
          onClick={toggleBookmark}
          style={{ backgroundImage: "url(" + bookMarked + ")" }}
        ></button>
        <button
          className="settings-btn"
          style={{ backgroundImage: "url(" + settingsIcon + ")" }}
        ></button>
      </div>
    );
  }
}
