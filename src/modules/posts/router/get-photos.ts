import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {PostService} from "../services/post.service";

const router = express.Router()

router.get('', AuthMiddleware, (req, res) => {
    return PostService.getPhotos(req).then((data)=> {
        res.json(data)
    })
})


export default router
