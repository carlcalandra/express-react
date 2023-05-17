import { Router } from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt"

const router = Router();

router.get("/", async (req, res ) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch(error) {
        res.status(500).send({message:"Internal server error"})
    }

})

router.post("/", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    try {
        const userExists = await UserModel.findOne({$or:[{email:email}, {username:username}]})
        if (userExists) {
            return res.status(409).json({message:"username or email already in db"})
        }

        const user = new UserModel({
            username:username, 
            email:email,
            password:hashedPassword
        });
        await user.save();
        return res.status(201).json(user);        
    } catch(error) {
        console.error(error);
        return res.status(500).json({message:"there was an internal error"})
    }

})

router.patch("/:id", async (req, res, next) => {
    const {id} = req.params;
    const options = {new:true};
    try {
        const result = await UserModel.findByIdAndUpdate(id, req.body, options);
        if (!result) {
            return res.status(404).send({message:"User not found"})
        }
        return res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:"There was an internal server error"})
    }
})


export default router;