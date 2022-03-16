/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const currentEnv = process.env.NODE_ENV;
let prodOrDevUrl = null;

let token = document.cookie;
axios.defaults.headers.post['Authorization'] = token;
const optionsPut = {
  headers : {
    "Access-Control-Allow-Origin" : "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
    'X-Method' : 'PUT',
    'X-Auth-Token' : token
  }
};
const optionsPost = {
  headers : {
    "Access-Control-Allow-Origin" : "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
    'X-Method' : 'POST',
    'X-Auth-Token' : token
  }
};
// axios.defaults.headers.put['Authorization'] = token;
if(currentEnv === 'development'){
  prodOrDevUrl = 'http://localhost:3005';
}else if(currentEnv === 'production'){
  prodOrDevUrl = 'https://peak-blogspace.herokuapp.com';
}

console.log(prodOrDevUrl)

export default {
  signupUser: async function (userData) {
    console.log(userData, "user data for signup API");
    return await axios.post(
      `${prodOrDevUrl}/account-info`,
      {userData : userData},
      optionsPost
    );
  },
  sendUserTopics: async function (topicObj, userId) {
    console.log(topicObj, "user data for signup API");
    return await axios.put(
      `${prodOrDevUrl}/account_info/${userId}`,
      {topicData : topicObj},
      optionsPut
    );
  },
  loginUser: async function (username, password) {
    console.log(
      username,
      password,
      "username and password for auth FROM DEV ENV"
    );
    return await axios.get(
      `${prodOrDevUrl}/account-info-login/${username}/${password}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
        },
      }
    );
  },
  getUserInfo: async function (id) {
    return await axios.get(
      `${prodOrDevUrl}/user-details/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getTopUserPosts: async function (id, cond) {
    console.log(id, "id for getTopUserPosts API" , cond, "cond for id");
    return await axios.get(
      `${prodOrDevUrl}/getUserPost/${id}/${cond}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  //
  // home page calls
  getAllPosts: async function () {
    return await axios.get(
      `${prodOrDevUrl}/user-posts`, 
      {
      headers: {
        "Access-Control-Allow-Origin":
          "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
        authorization: token,
      },
    });
  },
  // posts - general where id1 = post id;
  getPostDetails: async function (id) {
    console.log(id, "id of post to get details");
    return await axios.get(
      `${prodOrDevUrl}/posts-general/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  addViewToBlog: async function (postId) {
    console.log(postId, "add view to post API");
    return await axios.put(
      `${prodOrDevUrl}/posts-general/${postId}`,
      {data : null},
      optionsPut
    );
  },
  deletePost: async function (postId) {
    console.log(postId, "id of post to delete for API");
    return await axios.delete(
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/" ,
          authorization: token,
        },
      }
    );
  },
  // calls to create new blog
  postNewBlog: async function (blogContent) {
    console.log(blogContent, "new blog for API");
    return await axios.post(
      `${prodOrDevUrl}/create-new-post`,
      {data : blogContent},
      optionsPost
    );
  },
  // calls to send user icon to aws
  saveUserIcon: async function (blogContent) {
    console.log(blogContent, "SAVE USER ICON for API");
    return await axios.post(
      `${prodOrDevUrl}/create-new-post`,
      {data : blogContent},
      optionsPost
    );
  },
  getLikedPosts: async function (userId) {
    console.log(userId, "Userid for getLikedPosts API");
    return await axios.get(
      `${prodOrDevUrl}/liked-posts/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
            authorization : token
        },
      }
    );
  },
  addLike: async function (cond , postId, postTitle) {
    console.log(`${cond}: num of likes | ${postId}: post id | ${postTitle}: post title FOR ADD LIKE API`);
    return await axios.put(
      `${prodOrDevUrl}/numOfLikesForPost/${postId}/${cond}/${postTitle}`,
      {data : null},
      optionsPut
    );
  },
  checkBookmarksForHome: async function (userId) {
    console.log(userId, "user id for check bookmarks func for API!");
    return await axios.get(
      `${prodOrDevUrl}/user-bookmarks-home/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  // bookmark related axios requests
  bookmarkNewPost: async function (postToBookmark, userId, cond) {
    console.log(postToBookmark, "id of blog to bookmark!!!");
    return await axios.put(
      `${prodOrDevUrl}/user-bookmarks/${postToBookmark}/${userId}/${cond}`,
      {data : null},
      optionsPut
    );
  },
  getBookmarkedPosts: async function (userId) {
    console.log(userId, "id of user to fetch bookmarked blogs API");
    return await axios.get(
      `${prodOrDevUrl}/user-all-bookmarks/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getFollowingBlogs: async function (userId){
    console.log(userId, 'user id to get followed users blog');
    return await axios.get(
      `${prodOrDevUrl}/user-following/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
      },
      }
    )
  },
  followUser: async function (userId, followId, cond){
    console.log(`userId : ${userId} followId : ${followId} and cond: ${cond} to toggle follower`);
    return await axios.get(
      `${prodOrDevUrl}/followers/${userId}/${followId}/${cond}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
      },
      }
    )
  },
  postNewComment: async function (userId, postId, commentBody) {
    console.log(
      `userId : ${userId} postId: ${postId} body : ${commentBody} for postnewcomment api`
    );
    return await axios.post(
      `${prodOrDevUrl}/user-comments/${userId}/${postId}`,
      {commentBody : commentBody},
      optionsPost
    );
  },
  postBlogImg: async function (fileURL, imgType, blogTitle) {
    console.log(
      `FILE : ${fileURL}  BLOG NAME : ${blogTitle}  POST BLOG IMG API`
    );    return await axios.put(
      `${prodOrDevUrl}/blog-images/${blogTitle}/${imgType}`,
      {dataFile : fileURL},
      optionsPut
    );
  },
  postUserImg: async function (awsFileName, fileType, fileData) {
    console.log(
      `FILENAME : ${awsFileName}  FILETYPE :  ${fileType} POST USER IMG API`
    );
    return await axios.put(
      `${prodOrDevUrl}/user-images/${awsFileName}/${fileType}`,
      {dataFile : fileData},
      optionsPut
    );
  },
};
