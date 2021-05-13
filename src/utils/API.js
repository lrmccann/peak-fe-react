/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const token = document.cookie;

export default {
  signupUser: async function (userData) {
    console.log(userData, "user data for signup API");
    // return await axios.post(`http://localhost:3005/account-info`, userData , {
    return await axios.post(
      `https://peak-blogspace.herokuapp.com/account-info`,
      userData,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
        },
      }
    );
  },
  sendUserTopics: async function (topicObj, userId) {
    console.log(topicObj, "user data for signup API");
    // return await axios.post(`http://localhost:3005/account-info`, userData , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/account_info/${userId}`,
      topicObj,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
        },
      }
    );
  },
  loginUser: async function (username, password) {
    console.log(
      username,
      password,
      "username and password for auth FROM DEV ENV"
    );
    // return await axios.get(`http://localhost:3005/account-info-login/${username}/${password}`, {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/account-info-login/${username}/${password}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
        },
      }
    );
  },
  getUserInfo: async function (id) {
    // return await axios.get(`http://localhost:3005/user-details/${id}`, {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/user-details/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getTopUserPosts: async function (id) {
    console.log(id, "id for getTopUserPosts API");
    // return await axios.get(`http://localhost:3005/getUserPost/${id}` , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/getUserPost/${id}`,
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
    // return await axios.get(`http://localhost:3005/user-posts`, {
    return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts`, {
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
    // return await axios.get(`http://localhost:3005/user-posts/${id}` , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/posts-general/${id}`,
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
    // return await axios.put(`http://localhost:3005/post-views/${postId}` , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/posts-general/${postId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  deletePost: async function (postId) {
    console.log(postId, "id of post to delete for API");
    // return await axios.delete(`http://localhost:3005/user-posts/${postId}` , {
    return await axios.delete(
      `https://peak-blogspace.herokuapp.com/posts-general/${postId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getUsernamesForComments: async function (comment_ids) {
    console.log(comment_ids, "comment id for API");
    // return await axios.get(`http://localhost:3005/user-comments`  , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/user-comments/` + comment_ids,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
        params: {
          stuff: comment_ids,
        },
      }
    );
  },
  // calls to create new blog
  postNewBlog: async function (blogContent) {
    console.log(blogContent, "new blog for API");
    // return await axios.post(`http://localhost:3005/create-new-post` , blogContent , {
    return await axios.post(
      `https://peak-blogspace.herokuapp.com/create-new-post`,
      blogContent,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  // calls to send user icon to aws
  saveUserIcon: async function (blogContent) {
    console.log(blogContent, "new blog for API");
    // return await axios.post(`http://localhost:3005/create-new-post` , blogContent , {
    return await axios.post(
      `https://peak-blogspace.herokuapp.com/create-new-post`,
      blogContent,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getLikedPosts: async function (userId) {
    console.log(userId, "Userid for getLikedPosts API");
    // return await axios.put(`http://localhost:3005/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}` , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/liked-posts/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  addLike: async function (numOfLikesToSend, postId, postTitle) {
    console.log(numOfLikesToSend, "num of likes for addLike API");
    console.log(postId, "id of post addlike API");
    console.log(postTitle, "post title for addLike API");
    // return await axios.put(`http://localhost:3005/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}` , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  checkBookmarksForHome: async function (userId) {
    console.log(userId, "user id for check bookmarks func for API!");
    // return await axios.get(`http://localhost:3005/user-bookmarks-home/${userId}` , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/user-bookmarks-home/${userId}`,
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
  bookmarkNewPost: async function (postToBookmark, userId) {
    console.log(postToBookmark, "id of blog to bookmark!!!");
    // return await axios.put(`http://localhost:3005/user-bookmarks/${postToBookmark}/${userId}` , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/user-bookmarks/${postToBookmark}/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  getBookmarkedPosts: async function (userId) {
    console.log(userId, "id of user to fetch bookmarked blogs API");
    // return await axios.get(`http://localhost:3005/user-all-bookmarks/${userId}` , {
    return await axios.get(
      `https://peak-blogspace.herokuapp.com/user-all-bookmarks/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  removeBookmarkedPost: async function (postIdToRemove, userId) {
    console.log(postIdToRemove, "id of post to unbookmark for API!");
    // return await axios.delete(`http://localhost:3005/user-bookmarks/${postIdToRemove}/${userId}` , {
    return await axios.delete(
      `https://peak-blogspace.herokuapp.com/user-bookmarks/${postIdToRemove}/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  postNewComment: async function (userId, postId, commentBody) {
    console.log(
      `userId : ${userId} postId: ${postId} body : ${commentBody} for postnewcomment api`
    );
    // return await axios.post(`http://localhost:3005/user-comments-post/${userId}/${postId}/${commentBody}` , {
    return await axios.post(
      `https://peak-blogspace.herokuapp.com/user-comments-post/${userId}/${postId}/${commentBody}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
      }
    );
  },
  postBlogImg: async function (fileURL, imgType, blogTitle) {
    console.log(
      `FILE : ${fileURL}  BLOG NAME : ${blogTitle}  POST BLOG IMG API`
    );
    // return await axios.delete(`http://localhost:3005/user-posts/${postId}` , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/blog-images/${blogTitle}/${imgType}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
        data: {
          fileURL,
        },
      }
    );
  },
  postUserImg: async function (awsFileName, fileType, fileData) {
    console.log(
      `FILENAME : ${awsFileName}  FILETYPE :  ${fileType} POST USER IMG API`
    );
    // return await axios.delete(`http://localhost:3005/user-posts/${postId}` , {
    return await axios.put(
      `https://peak-blogspace.herokuapp.com/user-images/${awsFileName}/${fileType}`,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://peak-blogspace.s3-website.us-east-2.amazonaws.com/",
          authorization: token,
        },
        data: {
          fileData,
        },
      }
    );
  },
};
