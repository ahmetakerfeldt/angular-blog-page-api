import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {PostService} from "../services/post.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) => {
    return PostService.likeComment(req).then(()=> {
        res.json('ok')
    })
})

router.get('/all', AuthMiddleware, (req, res) =>  {
    return PostService.getLikes().then((data)=> {
        res.json(data)
    })
})


export default router
