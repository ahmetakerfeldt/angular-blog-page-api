import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {PostService} from "../../posts/services/post.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) =>  {
    return PostService.shareBlog(req).then(()=> {
        res.json('ok')
    })
})

export default router
