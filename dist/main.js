"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const database_service_1 = require("./core/database/database.service");
const app_router_1 = require("./app.router");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
//Rate Limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(limiter);
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    limit: '1mb'
}));
(0, app_router_1.appRouter)(app);
app.use('/static', express_1.default.static('./assets'));
//application run test
app.get('', (req, res) => {
    res.send('First page works.');
});
//database functions
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        database_service_1.DataBaseService.init();
        database_service_1.DataBaseService.associations();
        yield database_service_1.DataBaseService.sync();
        yield database_service_1.DataBaseService.authenticate();
    });
}
//listener
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
start().then(() => {
    console.log('OK.');
});
