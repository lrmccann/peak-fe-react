import React, { useEffect, useState } from "react";
import '../stylesheets/bookmarks.css';
import API from '../utils/API';
import photoThree from "../images/profile-icon-def.png";



export default function Bookmarks(){
    const [bookmarkedBlog, setBookmarkedBlog] = useState([]);

    useEffect(() => {
        const getBookmarks = async () => {
            let userId = localStorage.getItem("loggedInUserId");
            await API.getBookmarkedPosts(userId)
            .then(async (results) => setBookmarkedBlog(await results.data));
        }
        getBookmarks();
    }, [])

    console.log(bookmarkedBlog, "bookmarked blog fe")


    return(
        <div className="bookmarks_page container">
            {bookmarkedBlog.map((index, myKey) => (
                        <div className="bk-blog-content container" key={myKey}>
                        <div
                          className="bk-blog-img-header"
                          style={{ backgroundImage: `url(${index.blog_img})` }}
                        >
                          <div>
                            <h2>{index.post_title}</h2>
                          </div>
                        </div>
                        <div className="bk-blog-footer-cont container">
                          <div className="bk-COMEBACKTOTHIS">
                            <div className="bk-author-info">
                              <img alt="User Icon" src={photoThree}></img>
                              <h4>{index.username}</h4>
                            </div>
                            <div className="bk-more-info-div">
                              <button
                                className="bk-more-info-btn"
                                id={`bk-${index.id}`}
                                // onClick={(e) => {
                                //   getIndepthblogDetails(e.target.id);
                                // }}
                              >
                                <h2 id={`bk-${index.id}`}>{index.publish_date}</h2>
                              </button>
                            </div>
                            <div className="bk-blog-options-bar">
                              {/* <BlogBtnCont
                                numOfLikes={index.blog_likes}
                                postId={index.id}
                                postTitle={index.post_title}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
            ))}
            
        </div>
    )
}