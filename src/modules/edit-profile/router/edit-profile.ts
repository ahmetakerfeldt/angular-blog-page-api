import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {uploader} from "../../../controller/controller";
import {ProfileService} from "../../profile/services/profile.service";


const router = express.Router()


router.patch('', AuthMiddleware, (req: any, res) => {
    return ProfileService.updateProfile(req).then(()=> {
        res.json('ok')
    })
})


export default router
