import express from "express";
import {AuthMiddleware} from "../../auth/middleware/auth.middleware";
import {SettingsService} from "../services/settings.service";

const router = express.Router()

router.patch('', AuthMiddleware, (req, res) => {
    return SettingsService.changePassword(req).then(()=> {
        res.json('You successfully changed password')
    }).catch((err)=> {
        if(!err?.errs || !err.erros.length) {
            res.status(400).send(`${err}`)
        }
    })
})

export default router
