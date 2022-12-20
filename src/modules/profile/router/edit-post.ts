import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {ProfileService} from "../services/profile.service";


const router = express.Router()


router.patch('', AuthMiddleware, (req: any, res) => {
    return ProfileService.editPost(req).then(() => {
        res.json('ok')
    })
})


export default router
