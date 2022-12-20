"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('', (req, res) => {
    return auth_service_1.AuthService.login(req.body).then((user) => {
        const { id } = user.toJSON();
        const token = jsonwebtoken_1.default.sign({
            id: id,
            exp: Math.floor(Date.now() / 1000) + 60
        }, ':asdqpo21^:sd0');
        res.json(token);
    }).catch((err) => {
        if (!(err === null || err === void 0 ? void 0 : err.errs) || !err.erros.length) {
            res.status(401).send(`${err}`);
        }
    });
});
exports.default = router;
