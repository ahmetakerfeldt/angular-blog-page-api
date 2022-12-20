import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {PostService} from "../services/post.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) => {
    return PostService.sendResponse(req).then(()=> {
        res.json('ok')
    })
})

router.post('/get', AuthMiddleware, (req, res) => {
    return PostService.getResponses(req).then((data)=> {
        res.json(data)
    })
})



export default router
