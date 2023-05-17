import bcrypt from "bcrypt"
import { Router } from "express"
import UserModel from "../models/User.js";

const router = Router();

router.post("/login", async (req, res) => {
    const user = await UserModel.findOne({email:req.body.email});
    if (!user){
        return res.status(404).send({message:"User not found"});
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({message:"Password is wrong"});
    }
    return res.status(200).send(user);
})

export default router;