import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";


const router = express.Router()



router.get('', AuthMiddleware, (req, res) =>  {
    return HomeService.allPosts(req).then((data)=> {
        res.json(data)
    }).catch((err)=> {
        const error = err.errors.map((e)=>e.message)
        res.json(error)
    })
})


export default router
