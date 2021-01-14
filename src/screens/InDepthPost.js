import React, { useContext, useEffect, useState } from 'react';
import '../stylesheets/inDepthPostOutput.css';
import API from '../utils/API';
import UserContext from '../utils/Context';

export default function InDepthPost() {

    const { detailedPost } = useContext(UserContext);

    const [commentsToMap, setCommentsToMap] = useState(detailedPost.comments);
    const [postToMap, setPostToMap] = useState(detailedPost.results)
    const [loading, isLoading] = useState(true);
    var userIdForApi = [];

    console.log(postToMap)


    useEffect(async () => (
        commentsToMap.map( async(index) => {
            userIdForApi.push(index.user_id)
            // console.log(index.user_id, "index for use effect")
            setTimeout(async () => {
                await API.getUsernamesForComments(userIdForApi)
                .then(res => console.log(res))
            }, 1 * 10)
        })
    ))

    useEffect(() => {
        if (postToMap.length !== 0) {
            isLoading(false);
        }
    }, [isLoading])

    if (loading === true) {
        console.log(userIdForApi , "asdasdass")
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    } else if (loading === false) {
        console.log(userIdForApi , "asdasdass")
        return (
            <div className="inDepthPostPage conatiner-fluid ">
                {(postToMap.map((index) => (
                    <>
                        <div id="blogImgCont" className="blogImgCont" >
                            <div className="blogImg" id="blogImg" style={{ backgroundImage: `url(${index.blog_img})` }}></div>
                        </div>
                        <div className="publishingInfo" id="publishingInfo">
                            <h1 id="blogTitle">{index.post_title}</h1>
                            <i className="far fa-heart"></i>
                            {/* <h1 id="blogLikes">{index.blog_likes}</h1> */}
                            {/* <h1 id="blogPublishDate">{index.publish_date}</h1> */}
                        </div>
                        <h2 className="blogBody" id="blogBody">{index.post_body}</h2>
                    </>
                )))}
                                <div className="commentsCont">
                                <h2 className="commentsTitle">Comments</h2>
                                    {commentsToMap.map((index , myKey) => (
                                        <div key={myKey} className="indivContDiv">
                                   <p>{index.comment_body}</p>
                                   </div>
                                    ))}
                    
                    </div>
            </div>
        )
    }
}