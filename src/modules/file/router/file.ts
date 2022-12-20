import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {uploader} from "../../../controller/controller";


const router = express.Router()


router.post('/upload', AuthMiddleware, uploader, (req: any, res) => {
    res.json({path: req.file.filename})
})


export default router
