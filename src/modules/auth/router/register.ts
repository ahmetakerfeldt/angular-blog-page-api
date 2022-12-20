import express from "express";
import {AuthService} from "../services/auth.service";


const router = express.Router()


router.post('', (req, res) => {

    const body = req.body

    return AuthService.register(req.body).then(() => {
        res.json('You successfully registered.')
    }).catch((err) => {
        const error = err.errors.map((e)=>e.message)
        res.status(403).json(error)
    })
})

export default router
