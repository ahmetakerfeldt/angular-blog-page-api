import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {SettingsService} from "../services/settings.service";

const router = express.Router()

router.patch('', AuthMiddleware, (req, res) =>  {
    return SettingsService.changeUsername(req).then(()=> {
        res.json('You successfully change username')
    }).catch((err)=> {
        if(!err?.errs || !err.erros.length) {
            res.status(400).send(`${err}`)
        }
    })
})




export default router
