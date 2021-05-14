import React, { useEffect, useState } from "react";
import bookMarkIcon from "../../images/bookmark-unchecked.png";
import bookMarkIconClicked from "../../images/bookmark-checked.png";
import thumbsUpIcon from "../../images/thumbs-up.png";
import thumbsUpIconClicked from "../../images/thumbs-up-clicked.png";
import settingsIcon from "../../images/settings-icon.png";
import API from "../../utils/API";
import "./style.css";

export default function BlogBtnCont(props) {
  const [bookmarked, setBookmarked] = useState(bookMarkIcon);
  const [likeBtn, setLikeBtn] = useState(thumbsUpIcon);
  const [loading, setLoading] = useState(true);

  let bookmarksArr = props.bookMarkedPosts;
  let likedPostArr = props.likedPosts;

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
// Toggle like btn to add or remove like
  const toggleLike = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    if (likeBtn === thumbsUpIcon) {
      let postIdToSend = props.postId;
      // let postTitleToSend = props.postTitle;
      let likesPlusOne = "add";
      await API.addLike(postIdToSend, likesPlusOne, userId).then(
        (results) => {
          // console.log(results, "toggle like results")
          if (results.status === 202) {
            setLikeBtn(thumbsUpIconClicked);
          } else {
            alert("Failed to like post, please try again");
          }
        }
      );
    } else {
      let postIdToSend = props.postId;
      let likesMinusOne = "remove";
      await API.addLike(
        postIdToSend,
        likesMinusOne,
        userId
      ).then((response) => {
        if (response.status === 202) {
          setLikeBtn(thumbsUpIcon);
        } else {
          alert("Failed to unliked post, please try again");
        }
      });
    }
  };
//
// toggle bookmark button to add or remove
  const toggleBookmark = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    let idToSend = props.postId;
    if (bookmarked === bookMarkIcon) {
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
//
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
          style={{ backgroundImage: "url(" + bookmarked + ")" }}
        ></button>
        <button
          className="settings-btn"
          style={{ backgroundImage: "url(" + settingsIcon + ")" }}
        ></button>
      </div>
    );
  }
}
