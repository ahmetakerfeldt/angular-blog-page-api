import express from "express";
import {AuthService} from "../services/auth.service";
import jwt from 'jsonwebtoken'


const router = express.Router()


router.post('', (req, res) =>  {

    return AuthService.login(req.body).then((user)=> {

        const {id} = user.toJSON()

        const token = jwt.sign({
            id: id,
            exp: Math.floor(Date.now() / 1000) + 60
        }, ':asdqpo21^:sd0')

        res.json(token)

    }).catch((err)=> {
        if(!err?.errs || !err.erros.length) {
            res.status(401).send(`${err}`)
        }
    })
})





export default router
