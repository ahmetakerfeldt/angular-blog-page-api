"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const days = [];
const years = [];
const now = new Date().getFullYear();
for (let i = 1; i < 32; i++) {
    days.push(i);
}
for (let i = 1900; i < now; i++) {
}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
router.get('', (req, res) => {
    res.json('');
});
exports.default = router;
