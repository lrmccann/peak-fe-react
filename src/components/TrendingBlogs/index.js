import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./style.css";

export default function TrendingBlogs() {
  const [loading, setLoading] = useState(true);
  const [postOne, setPostOne] = useState();
  const [postTwo, setPostTwo] = useState();
  const [postThree, setPostThree] = useState();
  const [postFour, setPostFour] = useState();
  const [postFive, setPostFive] = useState();

  const mapPosts = (arrOfPosts) => {
    console.log(arrOfPosts);
    setPostOne(arrOfPosts[0]);
    setPostTwo(arrOfPosts[1]);
    setPostThree(arrOfPosts[2]);
    setPostFour(arrOfPosts[3]);
    setPostFive(arrOfPosts[4]);
    setLoading(false);
  };

  useEffect(() => {
    const getBlogs = async () => {
      await API.getTopUserPosts(null, "forHome").then((res) => {
        if (res.status === 200) {
          mapPosts(res.data);
        } else {
          setLoading(true);
          console.log(res.status, "BAD REQUEST");
        }
      });
    };
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <div className="trendingCont">
        <div className="post-cont-one">
          <div className="trend-post-one">
          <h1>{postOne.post_title}</h1>
                <img src={postOne.blog_img}></img>
          </div>
          <div className="trend-post-two">
          <h1>{postTwo.post_title}</h1>
          <img src={postTwo.blog_img}></img>
          {/* <h2>{postTwo.}</h2> */}
          </div>
        </div>
        <div className="post-cont-two container-fixed">
          <div className="trend-cont-three container-fixed">
          <img src={postThree.blog_img}></img>
            <h1>{postThree.post_title}</h1>
          </div>
          <div className="trend-cont-four container-fixed">
          <img src={postFour.blog_img}></img>
            <h1>{postFour.post_title}</h1>
          </div>
          <div className="trend-cont-five container-fixed">
          <img src={postFive.blog_img}></img>
            <h1>{postTwo.post_title}</h1>
          </div>
        </div>
      </div>
    );
  }
}
