import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {ProfileService} from "../services/profile.service";

const router = express.Router()


router.post('', AuthMiddleware, (req, res) => {
    return ProfileService.deletePost(req).then(()=> {
        res.json('ok')
    })
})



export default router
