import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) => {
    return HomeService.likePost(req).then(() => {
        res.json('')
    })
})

router.get('', AuthMiddleware, (req, res) => {
    return HomeService.getLikes().then((data) => {
        res.json(data)
    })
})


export default router
