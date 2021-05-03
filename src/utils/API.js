/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

console.log(process.env)
export default {
        signupUser: async function (userData) {
            console.log(userData, "user data for signup API");
            // return await axios.post(`http://localhost:3005/account-info`, userData , {
                // return await axios.post(`/account-info`, userData , {
                    return await axios.post(`https://peak-blogspace.herokuapp.com/account-info` , userData, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        loginUser: async function (username , password) {
            console.log(username , password , "username and password for auth FROM DEV ENV");
            // return await axios.get(`http://localhost:3005/account-info-login/${username}/${password}`, {
                // return await axios.get(`/account-info-login/${username}/${password}`, {
                    return await axios.get(`https://peak-blogspace.herokuapp.com/account-info-login/${username}/${password}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        getUserInfo: async function(id){
            // return await axios.get(`http://localhost:3005/user-details/${id}`, {
                // return await axios.get(`/user-details/${id}`, {
                    return await axios.get(`https://peak-blogspace.herokuapp.com/user-details/${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        getTopUserPosts : async function(id){
            console.log(id , "id for getTopUserPosts API")
            // return await axios.get(`http://localhost:3005/getUserPost/${id}` , {
                // return await axios.get(`/getUserPost/${id}` , {
                    return await axios.get(`https://peak-blogspace.herokuapp.com/getUserPost/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
    //
    // home page calls
        getAllPosts: async function(){
            // return await axios.get(`http://localhost:3005/user-posts`, {
                // return await axios.get(`/user-posts`, {
                return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
    //
    // indepth blog calls
        getPostDetails: async function(id){
            console.log(id, "id of post to get details")
            // return await axios.get(`http://localhost:3005/user-posts/${id}` , {
                // return await axios.get(`/user-posts/${id}` , {
                    return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        getUsernamesForComments: async function(comment_ids){
            console.log(comment_ids , "comment id for API")
            // return await axios.get(`http://localhost:3005/user-comments`  , {
                // return await axios.get(`/user-comments`  , {
                        return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/` + comment_ids , {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                },
                params : {
                    stuff : comment_ids
                }
            })
        },
    //
    // calls to create new blog
        postNewBlog: async function(blogContent){
            console.log(blogContent, "new blog for API")
            // return await axios.post(`http://localhost:3005/create-new-post` , blogContent , {
                // return await axios.post(`/create-new-post` , blogContent , {
                        return await axios.post(`https://peak-blogspace.herokuapp.com/create-new-post` , blogContent , {    
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
    //
    // call to add view to post using postId
    addViewToBlog: async function(postId){
        console.log(postId, "add view to post API")
        // return await axios.put(`http://localhost:3005/post-views/${postId}` , {
            // return await axios.put(`/post-views/${postId}` , {
                        return await axios.put(`https://peak-blogspace.herokuapp.com/post-views/${postId}` , {
            headers: {
                'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
            }
        })
    },
    //
        addLike : async function(numOfLikesToSend , postId , postTitle) {
            console.log(numOfLikesToSend , "num of likes for addLike API");
            console.log(postId , "id of post addlike API");
            console.log(postTitle , "post title for addLike API")
            // return await axios.put(`http://localhost:3005/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}` , {
                // return await axios.put(`/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}` , {
                            return await axios.put(`https://peak-blogspace.herokuapp.com/${postId}/${numOfLikesToSend}/${postTitle}` , {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        checkBookmarksForHome : async function(userId) {
            console.log( userId , "user id for check bookmarks func for API!");
            // return await axios.get(`http://localhost:3005/user-bookmarks-home/${userId}` , {
                // return await axios.get(`/user-bookmarks-home/${userId}` , {
                    return await axios.get(`https://peak-blogspace.herokuapp.com/user-bookmarks-home/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
    // bookmark related axios requests
        bookmarkNewPost : async function(postToBookmark, userId) {
            console.log( postToBookmark , "id of blog to bookmark!!!");
            // return await axios.put(`http://localhost:3005/user-bookmarks/${postToBookmark}/${userId}` , {
                // return await axios.put(`/user-bookmarks/${postToBookmark}/${userId}` , {
                            return await axios.put(`https://peak-blogspace.herokuapp.com/user-bookmarks/${postToBookmark}/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        getBookmarkedPosts : async function(userId) {
            console.log( userId , "id of user to fetch bookmarked blogs API");
            // return await axios.get(`http://localhost:3005/user-all-bookmarks/${userId}` , {
                // return await axios.get(`/user-all-bookmarks/${userId}` , {
                            return await axios.get(`https://peak-blogspace.herokuapp.com/user-all-bookmarks/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        removeBookmarkedPost : async function(postIdToRemove, userId) {
            console.log( postIdToRemove , "id of post to unbookmark for API!");
            // return await axios.delete(`http://localhost:3005/user-bookmarks/${postIdToRemove}/${userId}` , {
                // return await axios.delete(`/user-bookmarks/${postIdToRemove}/${userId}` , {
                            return await axios.delete(`https://peak-blogspace.herokuapp.com/user-bookmarks/${postIdToRemove}/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
    //
        getTopUserComments : async function(id){
            console.log(id , "id for getTopUserComments api")
            // return await axios.get(`http://localhost:3005/user-comments/${id}` , {
                // return await axios.get(`/user-comments/${id}` , {
                            return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        },
        // unfinished calls
        deletePost : async function(postId) {
            console.log( postId , "id of post to delete for API");
            // return await axios.delete(`http://localhost:3005/user-posts/${postId}` , {
                // return await axios.delete(`/user-posts/${postId}` , {
                        return await axios.delete(`https://peak-blogspace.herokuapp.com/user-posts/${postId}` , {
                headers : {
                    'Access-Control-Allow-Origin': 'http://peak-blogspace.s3-website.us-east-2.amazonaws.com/'
                }
            })
        }
    }

    // }

// }
// else{
// else if(process.env.NODE_ENV === "production"){
// var prodFuncs = {
// // user related http requests
//     signupUser: async function (userData) {
//         console.log(userData, "user data for signup API");
//         return await axios.post(`https://peak-blogspace.herokuapp.com/account-info` , userData, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//     loginUser: async function (username , password) {
//         console.log(username , password , "username and password for auth FROM PROD ENV");
        // return await axios.get(`https://peak-blogspace.herokuapp.com/account-info-login/${username}/${password}`, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//             }
//         })
//     },
//     getUserInfo: async function(id){
        // return await axios.get(`https://peak-blogspace.herokuapp.com/user-details/${id}`, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // home page axios calls
//     getAllPosts: async function(){
//         return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts`, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // indepth post calls
//     getPostDetails: async function(id){
//         console.log(id, "id of post to get details")
//         return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts/${id}` , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//     getUsernamesForComments: async function(comment_ids){
//         console.log(comment_ids , "comment id for API")
//         return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/` + comment_ids , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // calls to create new blog
//     postNewBlog: async function(blogContent){
//         console.log(blogContent, "new blog for API")
//         return await axios.post(`https://peak-blogspace.herokuapp.com/create-new-post` , blogContent , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // indepth post related axios calls
//     getTopUserPosts : async function(id){
//         console.log(id , "id for getTopUserPosts API")
//         return await axios.get(`https://peak-blogspace.herokuapp.com/getUserPost/${id}` , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },

// //
//     addLike : async function(numOfLikesToSend , postId , postTitle) {
//         console.log(numOfLikesToSend , "num of likes for addLike API");
//         console.log(postId , "id of post addlike API");
//         console.log(postTitle , "post title for addLike API")
//         return await axios.put(`https://peak-blogspace.herokuapp.com/${postId}/${numOfLikesToSend}/${postTitle}` , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // bookmark related axios calls
//     bookmarkNewPost : async function(postToBookmark, userId) {
//         console.log( postToBookmark , "id of blog to bookmark!!!");
//         return await axios.put(`https://peak-blogspace.herokuapp.com/user-bookmarks/${postToBookmark}/${userId}` , {
//             headers : {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//     getBookmarkedPosts : async function(userId) {
//         console.log( userId , "id of user to fetch bookmarked blogs API");
//         return await axios.get(`https://peak-blogspace.herokuapp.com/user-all-bookmarks/${userId}` , {
//             headers : {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//     removeBookmarkedPost : async function(postIdToRemove, userId) {
//         console.log( postIdToRemove , "id of post to unbookmark for API!");
//         return await axios.delete(`https://peak-blogspace.herokuapp.com/user-bookmarks/${postIdToRemove}/${userId}` , {
//             headers : {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
// //
// // unfinished calls
//     deletePost : async function(postId) {
//         console.log( postId , "id of post to delete for API");
//         return await axios.delete(`http://peak-blogspace.herokuapp.com/user-posts/${postId}` , {
//             headers : {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//     getTopUserComments : async function(id){
//         console.log(id , "id for getTopUserComments api")
//         return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/${id}` , {
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//     },
//         // call to add view to post using postId
//         addViewToBlog: async function(postId){
//             console.log(postId, "add view to post API")
//             return await axios.put(`http://localhost:3005/post-views/${postId}` , {
//                 headers: {
//                     'Access-Control-Allow-Origin': '*'
//                 }
//             })
//         },
//         //
// }
// //
// }
// export default (prodFuncs , devFuncs);