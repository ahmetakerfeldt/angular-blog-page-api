import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {ProfileService} from "../services/profile.service";

const router = express.Router()

router.get('', AuthMiddleware, (req, res) =>  {
    return ProfileService.getUserInfo(req).then((data)=> {
        res.json(data)
    })
})

router.get('/system', AuthMiddleware, (req, res) => {
    return ProfileService.getSystem().then((system)=> {
        res.json(system)
    })
})



export default router
