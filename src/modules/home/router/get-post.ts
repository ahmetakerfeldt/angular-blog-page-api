import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) =>  {
    return HomeService.getPost(req).then((post)=> {
        res.json(post)
    })
})


export default router
