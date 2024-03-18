import express from "express"
import {getPosts, getPost, addPost, deletePost, updatePost} from "../controllers/post.js"

const router = express.Router()

router.get("/posts", getPosts)
router.get("/posts/:id", getPost)
router.post("/posts", addPost)
router.post("/posts/:id", updatePost)
router.delete("/posts/:id", deletePost)

export default router