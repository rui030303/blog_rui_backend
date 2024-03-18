import db from "../db.js"
import jwt from "jsonwebtoken"

const getPosts = (req,res)=>{
    const q = (req.query.cat ? "SELECT * FROM `posts` WHERE cat = ?" : "SELECT * FROM `posts`")
    db.query(q, [req.query.cat],(err, data)=>{
        if(err){return res.json(err)}
        return (res.status(200).json(data))
    })
    
}
const getPost = (req,res)=>{
    
    // const q = "SELECT * FROM `users` u JOIN `posts` p ON u.id = p.uid WHERE p.id = ?"
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, uid,  u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? "
    db.query(q, [req.params.id], (err, data)=>{
        if(err){return res.json(err)}
        return (res.status(200).json(data))
    })
}
const deletePost = (req,res)=>{
    
    const token = req.cookies.access_token
    if(!token){return res.status(401).json("No token")}

    jwt.verify(token, "jwt_key", (err, userInfo)=>{
        if(err){return res.status(403).json("Error token")}

        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
        const postID = req.params.id
        const userID = userInfo.id
        db.query(q, [postID, userID], (err, data)=>{
            if(err){res.status(403).json("You are not the post user")}
            // if(!data){res.status(403).json("You are not the post user")}
            return res.json("Success DELETE")
        })
    })
}

const addPost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token){return res.status(401).json("No token")}

    jwt.verify(token, "jwt_key", (err, userInfo)=>{
        if(err){return res.status(403).json("Error token")}

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `uid`) VALUES (?,?,?,?,?)"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            userInfo.id
        ]
        console.log(req.body.img);
        db.query(q,values, (err, data)=>{
            if(err){return res.status(500).json(err)}
            return res.json("Successfully publish")
        })
    })
}

const updatePost = (req,res)=>{
    const token = req.cookies.access_token
    console.log("2222222222222");
    if(!token){return res.status(401).json("No token")}
    
    jwt.verify(token, "jwt_key", (err, userInfo)=>{
        if(err){return res.status(403).json("Error token")}

        const q = "UPDATE `posts` SET (`title`=?, `desc`=?, `img`=?, `cat`=?) WHERE `id`=? AND `uid` = ?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]
        const postID = req.params.id
        db.query(q,[...values,postID, userInfo.id ], (err, data)=>{
            if(err){return res.status(500).json(err)}
            return res.json("Successfully updated")
        })
    })
}

export {getPosts, getPost, addPost, deletePost, updatePost}