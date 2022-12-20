import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) => {
    return HomeService.dislikePost(req).then(()=> {
        res.json('')
    })
})


export default router
