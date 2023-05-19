import { Router } from "express";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const {page = 1, itemsPerPage = 5} = req.query;
        const posts = await PostModel.find().limit(itemsPerPage).skip(page*itemsPerPage);
        const totalPosts = await PostModel.count()
        const totalPages = Math.ceil(totalPosts/itemsPerPage);
        return res.status(200).send(
            {
                page:page,
                count:totalPosts,
                totalPages:totalPages,
                posts     
            }
        )
    } catch (error) {
        return res.status(500).send({message:"Internal server error"})
    }
})

router.post("/", async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.body.user)
        const newPost = new PostModel({
            author:user,
            title:req.body.title,
            text: req.body.text
        });
        await newPost.save();
        user.posts.push(newPost);
        await user.save();
        return res.status(201).send({
            message:"Post salvato con successo",
            post:newPost
        });


    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
});

router.patch("/:id", async (req, res, next) => {
    const {id} = req.params;
    const options = {new:true};
    try {
        const result = await PostModel.findByIdAndUpdate(id, req.body, options);
        if (!result) {
            return res.status(404).send({message:"Post not found"})
        }
        return res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:"There was an internal server error"})
    }

})

export default router;