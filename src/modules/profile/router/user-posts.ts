import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {ProfileService} from "../services/profile.service";

const router = express.Router()

router.get('', AuthMiddleware, (req, res) =>  {
    return ProfileService.userPosts(req).then((data)=> {
        res.json(data)
    })
})



export default router
