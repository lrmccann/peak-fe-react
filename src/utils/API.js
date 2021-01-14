import axios from "axios";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

// console.log(process.env)

if(process.env.NODE_ENV === "development"){
    var devFuncs = {
        loginUser: async function (username , password) {
            console.log(username , password , "username and password for auth");
            return await axios.get(`http://localhost:3000/account-info-login/${username}/${password}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getAllPosts: async function(){
            return await axios.get(`http://localhost:3000/user-posts`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getPostDetails: async function(id){
            console.log(id, "id of post to get details")
            return await axios.get(`http://localhost:3000/user-posts/${id}` , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        },
        getUsernamesForComments: async function(comment_ids){
            console.log(comment_ids , "comment id for API")
            return await axios.get(`http://localhost:3000/user-comments/` + comment_ids)
        }
    }

}else{
var prodFuncs = {
    loginUser: async function (username , password) {
        console.log(username , password , "username and password for auth");
        return await axios.get(proxyurl + `https://peak-blogspace.herokuapp.com/account-info-login/${username}/${password}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "X-Requested-With",
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                "Access-Control-Allow-Credentials": true
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
        return await axios.get(`https://peak-blogspace.herokuapp.com/user-comments/` + comment_ids)
    }
}
}
export default (prodFuncs , devFuncs)