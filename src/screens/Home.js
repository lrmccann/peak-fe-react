import React, { useContext, useEffect, useRef, useState } from 'react';
import '../stylesheets/homeOutput.css';
import API from '../utils/API';
import UserContext from '../utils/Context';
// import photo from '../images/heart-icon-one.png'
// import photo from "../images/heart-icon-two.png"
import { useHistory } from 'react-router-dom';
import Truncate from 'react-truncate';
import HeartCont from '../components/heartCont';

export default function Home() {
    const history = useHistory()

    const { user , getDetailedPost} = useContext(UserContext);
    const [postsToMap, setPostsToMap] = useState([]);
    const [newBlogOpen, setNewBlogOpen] = useState(false);
    const imgHeader = useRef(null);
    const blogTitle = useRef(null);
    const blogBody =  useRef(null);

    useEffect(async () => (
        await API.getAllPosts()
            .then(async res => setPostsToMap(await res.data))
        ), [])

    const openBlog = () => {
        setNewBlogOpen(true);
    }
    const closeBlog = () => {
        setNewBlogOpen(false);
    }

    const getIndepthblogDetails = async e => {
        await API.getPostDetails(e)
        .then(res => seperateResponseData(res.data));
    }

    const seperateResponseData = async (responseData) => {
        getDetailedPost(responseData)
        history.push('/indepthpost')
    }

    const handleBlogPost = async e => {
        e.preventDefault();
        var resultsInFullScope = {};
        var imgHeaderToSend = imgHeader.current.value;
        var blogTitleToSend = blogTitle.current.value;
        var blogBodyToSend = blogBody.current.value;
        var userIdToSend = await user[0].id;

        var blogInfoToSend = {
            imgHeaderToSend,
            blogTitleToSend,
            blogBodyToSend,
            userIdToSend
        }
        await API.postNewBlog({blogInfoToSend})
        .then(res => {resultsInFullScope = res})
        if(resultsInFullScope.status === 202){
            setNewBlogOpen(false);
        }else{
            alert('An error occured while posting your blog, please try again later.')
        }
    }

    if (newBlogOpen === false) {
        return (
            <div className="mainCont container-fixed" id="mainCont">
                <button className="createPostDiv" onClick={openBlog}><p className="createPostText">New Article +</p></button>
                <div className="blogContainer container">
                    {postsToMap.map((index, myKey) => (
                        
                        <div key={myKey} className="randomcont">
                            <div className="imgCont" style={{ backgroundImage: `url(${index.blog_img})` }}>
                                <div className="blogTitle">
                                    <h2>{index.post_title}</h2>
                                </div>
                            </div>
                            <div className="blogInfoCont container-fixed">
                                <div className="blogSnippet">
                                    <Truncate lines={4}>
                                    <p className="blogBodyText">{index.post_body}</p>
                                    </Truncate>
                                </div>
                            </div>
                            <div className="otherInfo">
                                <div className="authorCont">
                                    <div className="makeflexColumn">
                                        <img className="authorImg"></img>
                                        <h4 className="usernameText">mani123</h4>
                                    </div>
                                    <button className="blogMoreInfoBtn" id={index.id} onClick={e => {getIndepthblogDetails(e.target.id)}}>
                                        <h2 className="moreInfoBtnText" id={index.id}>More Info</h2>
                                    </button>
                                    <HeartCont
                                        numOfLikes = {index.blog_likes}
                                        postId = {index.id}
                                    />
                                    {/* <div className="likeCont">
                                        <div className="likeCountText">
                                            <button className="heartBtn">
                                                <p className="heartCounter">{index.blog_likes}</p>
                                                <img className="heartImg" src={photo}></img>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else if (newBlogOpen === true) {
        return (
            <div className="mainContTwo">
                <div className="newPostModal" id="newPostModal">
                    <button className="closeModalBtn" onClick={closeBlog} >X</button>
                    <button className="openDialogBtn"><i className="fas fa-search"></i></button>
                    <h6 style={{ marginTop: '2%' }} id="categoryText">Image Header</h6>
                    <input id="modalInput" ref={imgHeader} className="imgInput"></input>
                    <h6 id="categoryText">Title</h6>
                    <input id="modalInputTwo" ref={blogTitle} className="titleInput"></input>
                    <h6 style={{ marginLeft: '8%' }} >Body</h6>
                    <textarea id="modalInputThree" ref={blogBody} className="bodyInput"></textarea>
                    <button style={{cursor: "pointer"}} onClick={handleBlogPost} className="submitBlogBtn">Create Post</button>
                </div>
            </div>
        )
    }
}
