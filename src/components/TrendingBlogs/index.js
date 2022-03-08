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
  const [postSix, setPostSix] = useState();
  const [postSeven, setPostSeven] = useState();
  const [postEight, setPostEight] = useState();
  const [postNine, setPostNine] = useState();

  const mapPosts = (arrOfPosts) => {
    console.log(arrOfPosts);
    setPostOne(arrOfPosts[0]);
    setPostTwo(arrOfPosts[1]);
    setPostThree(arrOfPosts[2]);
    setPostFour(arrOfPosts[3]);
    setPostFive(arrOfPosts[4]);
    setPostSix(arrOfPosts[5]);
    setPostSeven(arrOfPosts[6]);
    setPostEight(arrOfPosts[7]);
    setPostNine(arrOfPosts[8]);
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
      <div className="trend-cont container-fixed">
        <div className="container-left">
          <div className="trend-post-one">
            <h1>{postOne.post_title}</h1>
            <img src={postOne.blog_img} alt="Blog Item"></img>
          </div>
          <div className="trend-post-two">
            <h1>{postTwo.post_title}</h1>
            <img src={postTwo.blog_img} alt="Blog Item"></img>
          </div>
          <div className="trend-post-three">
            <h1>{postThree.post_title}</h1>
            <img src={postThree.blog_img} alt="Blog Item"></img>
          </div>
        </div>
        <div className="container-right">
          <button className="trend-post-four container-fixed">
          <h1>{postFour.post_title}</h1>
            <img src={postFour.blog_img} alt="Blog Item"></img>
          </button>
          <button className="trend-post-five container-fixed">
          <h1>{postFive.post_title}</h1>
            <img src={postFive.blog_img} alt="Blog Item"></img>
            </button>
            <button className="trend-post-six container-fixed">
            <h1>{postSix.post_title}</h1>
            <img src={postSix.blog_img} alt="Blog Item"></img>
          </button>
          <button className="trend-post-seven container-fixed">
          <h1>{postSeven.post_title}</h1>
            <img src={postSeven.blog_img} alt="Blog Item"></img>
          </button>
          <button className="trend-post-eight container-fixed">
          <h1>{postEight.post_title}</h1>
            <img src={postEight.blog_img} alt="Blog Item"></img>
          </button>
          <button className="trend-post-nine container-fixed">
          <h1>{postNine.post_title}</h1>
            <img src={postNine.blog_img} alt="Blog Item"></img>
          </button>
      </div>
      </div>
    );
  }
}
