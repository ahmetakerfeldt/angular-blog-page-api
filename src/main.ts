import express from 'express'
import rateLimit from "express-rate-limit";
import {DataBaseService} from "./core/database/database.service";
import {appRouter} from "./app.router";
import cors from 'cors'

const app = express()
const port = 3000

//Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(limiter)
app.use(cors())
app.use(express.json({
    limit: '1mb'
}))
appRouter(app)
app.use('/static', express.static('./assets'))

//application run test
app.get('', (req, res) => {
    res.send('First page works.')
})

//database functions
async function start() {
    DataBaseService.init()
    DataBaseService.associations()
    await DataBaseService.sync()
    await DataBaseService.authenticate()

}

//listener
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})

start().then(() => {
    console.log('OK.')
})
