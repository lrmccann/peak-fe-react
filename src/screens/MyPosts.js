import React, { useEffect, useState, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/Context";
import photo from "../images/trash-bin-2.png";
// const photo = require("../images/trash-bin.png");
import "../stylesheets/myPosts.css";

export default function MyPosts() {
  const { user } = useContext(UserContext);
  const [allUserPosts, setAllUserPosts] = useState([]);
  useEffect(async () => {
    var userId = user[0].id;
    await API.getTopUserPosts(userId).then(async (res) =>
      setAllUserPosts(await res.data)
    );
  }, [user]);

  const deleteUserPost = async (e) => {
    // e.preventDefault();
    console.log(e, "key");
    await API.deletePost(e)
      .then(alert("Post sucessfully deleted!"))
      // .then(confirm(`Are you sure you want to delete ${allUserPosts.post_title}?`))
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="user-posts-page container">
      {allUserPosts.map((posts, myKey) => (
        <span className="user-posts-content" key={myKey}>
          <div className="each-blog">
            <img src={posts.blog_img} alt={"your post"}></img>
            <span>
              <button
                style={{ backgroundImage: `url("${photo}")` }}
                id={posts.id}
                onClick={(e) => {
                  deleteUserPost(e.target.id);
                }}
              ></button>
              <h1>{posts.post_title}</h1>
              <h3>Publish Date : {posts.publish_date}</h3>
              <h3>Views : 103</h3>
              <h3>Likes : {posts.blog_likes}</h3>
            </span>
          </div>
        </span>
      ))}
    </div>
  );
}
