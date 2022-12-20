"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsEntity = exports.PostsModel = void 0;
const Sequelize = __importStar(require("sequelize"));
class PostsModel extends Sequelize.Model {
}
exports.PostsModel = PostsModel;
const postsEntity = (sequelize) => {
    PostsModel.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pp: {
            type: Sequelize.STRING,
        },
        sender: {
            type: Sequelize.STRING
        },
        imagePath: {
            type: Sequelize.STRING
        },
        videoPath: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING
        },
        commentCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'PostsModel',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['userId']
            }
        }
    });
};
exports.postsEntity = postsEntity;
