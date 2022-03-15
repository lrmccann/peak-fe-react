import React, { useEffect, useState, useContext } from "react";
import bookMarkIcon from "../../images/bookmark-unchecked.png";
import bookMarkIconClicked from "../../images/bookmark-checked.png";
import thumbsUpIcon from "../../images/thumbs-up.png";
import thumbsUpIconClicked from "../../images/thumbs-up-clicked.png";
import settingsIcon from "../../images/settings-icon.png";
import UserContext from "../../utils/Context";
import API from "../../utils/API";
import "./style.css";

export default function BlogBtnCont(props) {
  const [bookmarked, setBookmarkIcon] = useState(bookMarkIcon);
  const [likeBtn, setLikeBtn] = useState(thumbsUpIcon);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);
  const [bookmarksArr, setBookmarksArr] = useState(props.bookMarkedPosts);

  // let bookmarksArr = props.bookMarkedPosts;
  let likedPostArr = props.likedPosts;

  useEffect(() => {
    console.log(bookmarksArr, 'bookmarks arr for child')
      setBookmarksArr(props.bookMarkedPosts);
  }, [props])


  useEffect(() => {
      likedPostArr.map((index) => {
        if (index === props.postId) {
          return setLikeBtn(thumbsUpIconClicked);
        }
      });
      setLoading(false);
  }, []);

  // set already bookmarked posts & likes
  useEffect(() => {
      bookmarksArr.map((index) => {
        if (index === props.postId) {
          return setBookmarkIcon(bookMarkIconClicked);
        }
      });
      setLoading(false);
  }, []);
 
  // Toggle like btn to add or remove like
  const toggleLike = async () => {
    let likesArrIndex = likedPostArr.indexOf(props.postId);
    if(likesArrIndex === -1){
      await API.addLike(props.postId, 'add', user.id).then((results) => {
        if (results.status === 200) {
          setLikeBtn(thumbsUpIconClicked);
        } else {
          alert("Failed to like post, please try again");
        }
      });
    } else {
      await API.addLike(props.postId, 'remove', user.id).then(
        (response) => {
          if (response.status === 200) {
            setLikeBtn(thumbsUpIcon);
          } else {
            alert("Failed to unliked post, please try again");
          }
        }
      );
    }
  };
  //
  // toggle bookmark button to add or remove
  const toggleBookmark = async () => {
    let bmarkArrIndex = bookmarksArr.indexOf(props.postId);
    let userId = localStorage.getItem("loggedInUserId");
    let postId = props.postId;

    if(bmarkArrIndex === -1){
      await API.bookmarkNewPost(postId, userId, 'add').then((response) => {
        if (response.status === 200) {
          setBookmarkIcon(bookMarkIconClicked);
        } else {
          alert("Failed to bookmark");
        }
      });
    } else {
      await API.bookmarkNewPost(postId, userId, 'remove').then((response) => {
        if(response.status === 200) {
        setBookmarkIcon(bookMarkIcon);
        } else {
          alert("Failed to Remove Bookmark");
        }
      });
    }
  }
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
