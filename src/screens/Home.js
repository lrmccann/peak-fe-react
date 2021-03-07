import React, { useContext, useEffect, useRef, useState } from 'react';
import '../stylesheets/home.css';
import API from '../utils/API';
import UserContext from '../utils/Context';
import { useHistory } from 'react-router-dom';
import Truncate from 'react-truncate';
import photoThree from "../images/profile-icon-def.png";
import BlogBtnCont from '../components/blogBtnCont';

export default function Home() {
    const history = useHistory()

    const { user, getDetailedPost } = useContext(UserContext);
    const [postsToMap, setPostsToMap] = useState([]);
    const [bookMarked , setBookmarked] = useState(false);
    
    // const [newBlogOpen, setNewBlogOpen] = useState(false);
    // const imgHeader = useRef(null);
    // const blogTitle = useRef(null);
    // const blogBody = useRef(null);

    useEffect(async () => (
        await API.getAllPosts()
            .then(async res => setPostsToMap(await res.data.allPosts))
    ), [])

    // const openBlog = () => {
    //     setNewBlogOpen(true);
    // }
    // const closeBlog = () => {
    //     setNewBlogOpen(false);
    // }

    const getIndepthblogDetails = async e => {
        await API.getPostDetails(e)
            .then(res => seperateResponseData(res.data));
    }

    const seperateResponseData = async (responseData) => {
        getDetailedPost(responseData)
        console.log(responseData)
        history.push('/indepthpost')
    }

    const bookMarkFunc = () => {
        if(bookMarked === false){
            setBookmarked(true)
        }else{
            setBookmarked(false)
        }
    }
    console.log(bookMarked)
    // const handleBlogPost = async e => {
    //     e.preventDefault();
    //     var resultsInFullScope = {};
    //     var imgHeaderToSend = imgHeader.current.value;
    //     var blogTitleToSend = blogTitle.current.value;
    //     var blogBodyToSend = blogBody.current.value;
    //     var userIdToSend = await user[0].id;

    //     var blogInfoToSend = {
    //         imgHeaderToSend,
    //         blogTitleToSend,
    //         blogBodyToSend,
    //         userIdToSend
    //     }
    //     await API.postNewBlog({ blogInfoToSend })
    //         .then(res => { resultsInFullScope = res })
    //     if (resultsInFullScope.status === 202) {
    //         setNewBlogOpen(false);
    //     } else {
    //         alert('An error occured while posting your blog, please try again later.')
    //     }
    // }

    // if (newBlogOpen === false) {
        return (
            <div className="homeCont container">
                {/* <button className="createPostDiv" onClick={openBlog}>
                    <p>New Post</p>
                    </button> */}
                {postsToMap.map((index, myKey) => (
                <div className="blogContainer container">
                            <div key={myKey} className="imgCont" style={{ backgroundImage: `url(${index.blog_img})` }}>
                                <div className="blogTitle">
                                    <h2>{index.post_title}</h2>
                                </div>
                            </div>
                            <div className="blogInfoCont container">
                                {/* <div className="blogSnippet">
                                <p className="blogBodyText">
                                    <Truncate lines={4}>{index.post_body}
                                    </Truncate>
                                    </p>
                                </div> */}
                                <div className="authorContain">
                                    <div className="makeCol">
                                        <img className="authorImg" src={photoThree}></img>
                                        <h4 className="usernameText">JonSmith14</h4>
                                    </div>
                                    <div className="btnHolder">
                                    <button className="blogMoreInfoBtn" id={index.id} onClick={e => { getIndepthblogDetails(e.target.id) }}>
                                        <h2 className="moreInfoBtnText" id={index.id}>More Info</h2>
                                    </button>
                                    </div>
                                    <div className="abcdef">
                                        <BlogBtnCont
                                        numOfLikes = {index.blog_likes}
                                        postId = {index.id}
                                        postTitle = {index.post_title}
                                        />
                                        {/* 
                                    <button onClick={bookMarkFunc} className="bookMarkIcon" style={{backgroundImage : 'url(' + bookMarkIcon + ')'}}></button>
                                    <HeartCont
                                        numOfLikes={index.blog_likes}
                                        postId={index.id}
                                        postTitle={index.post_title}
                                    />
                                    <div className="settingsCont">
                                        <button className="settingsBtn">
                                            <img src={settingsIcon}></img>
                                        </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                         </div>
                                    ))}
            </div>
        )
    // }
    //  else if (newBlogOpen === true) {
    //     return (
    //         <div className="homeCont container">
    //             <div className="newPostModal" id="newPostModal">
    //                 <button className="closeModalBtn" onClick={closeBlog} >X</button>
    //                 <button className="openDialogBtn"><i className="fas fa-search"></i></button>
    //                 <h6 style={{ marginTop: '2%' }} id="categoryText">Image Header</h6>
    //                 <input id="modalInput" ref={imgHeader} className="imgInput"></input>
    //                 <h6 id="categoryText">Title</h6>
    //                 <input id="modalInputTwo" ref={blogTitle} className="titleInput"></input>
    //                 <h6 style={{ marginLeft: '8%' }} >Body</h6>
    //                 <textarea id="modalInputThree" ref={blogBody} className="bodyInput"></textarea>
    //                 <button style={{ cursor: "pointer" }} onClick={handleBlogPost} className="submitBlogBtn">Create Post</button>
    //             </div>
    //         </div>
    //     )
    // }
}
