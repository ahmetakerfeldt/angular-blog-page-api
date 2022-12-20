import express, {Request} from "express";
import multer from 'multer'
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/posts')
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({storage: storage})


router.post('', upload.single('video'), AuthMiddleware, (req: Request, res) => {
    res.json(req.file.filename)
})


router.post('/content', AuthMiddleware, (req: Request, res) => {
    return HomeService.postContentForVideo(req).then(()=> {
        res.json('ok')
    })
})




export default router
