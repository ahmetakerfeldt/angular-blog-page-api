import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {HomeService} from "../services/home.service";

const router = express.Router()

router.post('', AuthMiddleware, (req, res) =>  {
    return HomeService.postText(req).then(()=> {
        res.json('ok')
    }).catch((err)=> {
        if(!err?.errs || !err.erros.length) {
            res.status(400).send(`${err}`)
        }
    })
})


export default router
