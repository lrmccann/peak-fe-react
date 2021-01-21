import React, { useContext, useEffect, useState } from 'react';
import '../stylesheets/inDepthPostOutput.css';
import API from '../utils/API';
import UserContext from '../utils/Context';

export default function InDepthPost() {

    const { detailedPost } = useContext(UserContext);
    console.log(detailedPost , "i am a detailed post ")

    const [commentsToMap, setCommentsToMap] = useState(detailedPost.comments);
    const [postToMap, setPostToMap] = useState(detailedPost.results)
    const [userNamesForComments, setUsernameForComments] = useState([]);
    const [loading, isLoading] = useState(true);
    const [idkRandom , setIdkRandom] = useState(userNamesForComments);
    const [visibilityCond , setVisibility] = useState("visible");
    var userIdForApi = [];

    setTimeout(() => {
        if(userNamesForComments.length === 0 && commentsToMap === null){
            setIdkRandom(["" , "" , ""]);
            setCommentsToMap(["" , "" , ""]);
            setVisibility("none")
        }else{
            console.log("it worked")
        }
    }, 2 * 200)

    useEffect(async () => (
        someRandomFunc()
    ), [])

    const someRandomFunc = () => {
        commentsToMap.map(async (index) => {
            userIdForApi.push(index.user_id)
            setTimeout(async () => {
                await API.getUsernamesForComments(userIdForApi)
                    .then((res) => setUsernameForComments(res.data));
                if (userNamesForComments.length !== 0) {
                    return
                } else {
                    console.log("i give up")
                }
            }, 1 * 10)
        })
    }

    useEffect(() => {
        if (postToMap.length !== 0) {
            isLoading(false);
        }
    }, [isLoading])

    if (loading === true) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    } else if (loading === false) {
        console.log(userNamesForComments, "user name for comments to maaap")
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
                <div className="commentsCont" style={{visibility : `${visibilityCond}`}}>
                    <h1 className="commentsTitle">Comments</h1>
                    {(commentsToMap.map((index, myKey) => (
                        ((console.log(index, "indeeeexxx"))),
                        <>
                            {(userNamesForComments.map((indexTwo) => (
                                ((console.log(indexTwo, "index twoooooo"))),
                                <div className="actualCommentsCont">
                                    <div className="commentAuthDiv">
                                        <img className="commentAuthPic"></img>
                                        <h4>{indexTwo}</h4>
                                    </div>
                                    <p>{index.comment_body}</p>
                                </div>
                            )))}
                        </>
                    )))}
                </div>
            </div>
        )
    }
}