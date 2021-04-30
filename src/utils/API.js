import axios from "axios";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

console.log(process.env)

if(process.env.NODE_ENV === "development"){
    var devFuncs = {
        signupUser: async function (userData) {
            console.log(userData, "user data for signup API");
            return await axios.post(`http://localhost:3005/account-info`, userData , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        loginUser: async function (username , password) {
            console.log(username , password , "username and password for auth");
            return await axios.get(`http://localhost:3005/account-info-login/${username}/${password}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getAllPosts: async function(){
            return await axios.get(`http://localhost:3005/user-posts`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getUserInfo: async function(id){
            return await axios.get(`http://localhost:3005/user-details/${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getPostDetails: async function(id){
            console.log(id, "id of post to get details")
            return await axios.get(`http://localhost:3005/user-posts/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getUsernamesForComments: async function(comment_ids){
            console.log(comment_ids , "comment id for API")
            return await axios.get(`http://localhost:3005/user-comments`  , {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                params : {
                    stuff : comment_ids
                }
            })
        },
        postNewBlog: async function(blogContent){
            console.log(blogContent, "new blog for API")
            return await axios.post(`http://localhost:3005/create-new-post` , blogContent , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getTopUserPosts : async function(id){
            console.log(id , "id for getTopUserPosts API")
            return await axios.get(`http://localhost:3005/getUserPost/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },

        getTopUserComments : async function(id){
            console.log(id , "id for getTopUserComments api")
            return await axios.get(`http://localhost:3005/user-comments/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        addLike : async function(numOfLikesToSend , postId , postTitle) {
            console.log(numOfLikesToSend , "num of likes for addLike API");
            console.log(postId , "id of post addlike API");
            console.log(postTitle , "post title for addLike API")
            return await axios.put(`http://localhost:3005/numOfLikesForPost/${postId}/${numOfLikesToSend}/${postTitle}` , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        deletePost : async function(postId) {
            console.log( postId , "id of post to delete for API");
            return await axios.delete(`http://localhost:3005/user-posts/${postId}` , {
                headers : {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        bookmarkNewPost : async function(postToBookmark, userId) {
            console.log( postToBookmark , "id of blog to bookmark!!!");
            return await axios.put(`http://localhost:3005/user-bookmarks/${postToBookmark}/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getBookmarkedPosts : async function(userId) {
            console.log( userId , "id of user to fetch bookmarked blogs API");
            return await axios.get(`http://localhost:3005/user-all-bookmarks/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        removeBookmarkedPost : async function(postIdToRemove, userId) {
            console.log( postIdToRemove , "id of post to unbookmark for API!");
            return await axios.delete(`http://localhost:3005/user-bookmarks/${postIdToRemove}/${userId}` , {
                headers : {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        }
    }

}else if(process.env.NODE_ENV === "production"){
var prodFuncs = {
    signupUser: async function (userData) {
        console.log(userData, "user data for signup API");
        return await axios.post(`https://peak-blogspace.herokuapp.com/account-info` , userData, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    loginUser: async function (username , password) {
        console.log(username , password , "username and password for auth");
        return await axios.get(`https://peak-blogspace.herokuapp.com/account-info-login/${username}/${password}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
    },
    getAllPosts: async function(){
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    getUserInfo: async function(id){
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-details/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    getPostDetails: async function(id){
        console.log(id, "id of post to get details")
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-posts/${id}` , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    getUsernamesForComments: async function(comment_ids){
        console.log(comment_ids , "comment id for API")
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/` + comment_ids , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    postNewBlog: async function(blogContent){
        console.log(blogContent, "new blog for API")
        return await axios.post(`https://peak-blogspace.herokuapp.com/create-new-post` , blogContent , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    getTopUserPosts : async function(id){
        console.log(id , "id for getTopUserPosts API")
        return await axios.get(`https://peak-blogspace.herokuapp.com/getUserPost/${id}` , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },

    getTopUserComments : async function(id){
        console.log(id , "id for getTopUserComments api")
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/${id}` , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    },
    addLike : async function(numOfLikesToSend , postId , postTitle) {
        console.log(numOfLikesToSend , "num of likes for addLike API");
        console.log(postId , "id of post addlike API");
        console.log(postTitle , "post title for addLike API")
        return await axios.put(`https://peak-blogspace.herokuapp.com/${postId}/${numOfLikesToSend}/${postTitle}` , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
}
}
export default (prodFuncs , devFuncs)