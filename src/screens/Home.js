import React, { useContext, useEffect, useState } from 'react';
import '../stylesheets/homeOutput.css';
import API from '../utils/API';
import UserContext from '../utils/Context';
import photo from '../images/heart-icon-one.png'
import { useHistory } from 'react-router-dom';
import Truncate from 'react-truncate';

export default function Home() {
    const history = useHistory()

    const { user , getDetailedPost , getAllComments } = useContext(UserContext);
    const [postsToMap, setPostsToMap] = useState([]);
    const [newBlogOpen, setNewBlogOpen] = useState(false);
    const [allCommentsForNewPage , setAllCommentsForNewPage] = useState([])
    const [allPostForNewPage , setAllPostForNewPage] = useState([])

    useEffect(async () => {
        await API.getAllPosts()
            .then(async res => setPostsToMap(await res.data))
    }, [])

    const openBlog = () => {
        setNewBlogOpen(true);
    }
    const closeBlog = () => {
        setNewBlogOpen(false);
    }

    const getIndepthblogDetails = async e => {
        await API.getPostDetails(e)
        // .then(async res =>  setAllIndepthBlogInfo(await res.data))
        .then(res => seperateResponseData(res.data));
    }

    const seperateResponseData = async (responseData) => {
        // console.log(responseData)
        // getDetailedPost(responseData.results)
        getDetailedPost(responseData)
        // setAllCommentsForNewPage(responseData.comments)
        // setAllPostForNewPage(responseData.results)
        // setTimeout(async () => {
                // setAllCommentsForNewPage(await allIndepthBlogInfo.comments)
        // }, 2 * 500)
        // console.log(allIndepthBlogInfo)
        // if(allIndepthBlogInfo.length === 0){
            // setTimeout(() => {
                // console.log(allIndepthBlogInfo , "asdasdasdas")
                // setAllCommentsForNewPage(await allIndepthBlogInfo.comments)
            // },  1 * 50)
        // }
        history.push('/indepthpost')
    }

    console.log(allCommentsForNewPage)
    console.log(allPostForNewPage)

                // console.log(allIndepthBlogInfo , "indepth post info")

    // console.log(postsToMap)
    // console.log(allCommentsForNewPage, "all comments for enw page")

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
                                        <img className="authorImg">

                                        </img>
                                        <h4 className="usernameText">mani123</h4>
                                    </div>
                                    <button className="blogMoreInfoBtn" id={index.id} onClick={e => {getIndepthblogDetails(e.target.id)}}>
                                        <h3 id={index.id}>More Info</h3>
                                    </button>
                                    <div className="likeCont">
                                        <div className="likeCountText">
                                            <button className="heartBtn">
                                                <p className="heartCounter">{index.id}</p>
                                                <img className="heartImg" src={photo}></img>
                                            </button>
                                        </div>
                                    </div>
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
                    <input id="modalInput" className="imgInput"></input>
                    <h6 id="categoryText">Title</h6>
                    <input id="modalInputTwo" className="titleInput"></input>
                    <h6 style={{ marginLeft: '8%' }} >Body</h6>
                    <textarea id="modalInputThree" className="bodyInput"></textarea>
                    <button className="submitBlogBtn">Create Post</button>

                </div>
            </div>
        )
    }
}
