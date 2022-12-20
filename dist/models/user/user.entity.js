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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = exports.UserModel = void 0;
const Sequelize = __importStar(require("sequelize"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel extends Sequelize.Model {
}
exports.UserModel = UserModel;
const userEntity = (sequelize) => {
    UserModel.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: Sequelize.STRING,
            unique: {
                msg: 'This mail already registered.',
                name: 'exists'
            },
            validate: {}
        },
        username: {
            type: Sequelize.STRING,
            unique: {
                msg: 'Username already taken!',
                name: 'exist'
            },
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Username cannot be empty!'
                },
                len: {
                    args: [4, 20],
                    msg: 'Username must be 4-20 character.'
                },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password cannot be empty!'
                },
                len: {
                    args: [5, 1000],
                    msg: 'Password length must be at least 5.'
                }
            }
        },
        imagePath: {
            type: Sequelize.STRING,
            defaultValue: 'default.jpg'
        },
        coverP: {
            type: Sequelize.STRING,
            defaultValue: 'ghost.jpg'
        },
        bio: {
            type: Sequelize.STRING,
            defaultValue: "Hi! I'm using blogger!"
        },
        birth: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        }
    }, {
        hooks: {
            beforeUpdate(attributes, options) {
                const password = attributes.get('password');
                const salt = bcryptjs_1.default.genSaltSync(15);
                const hash = bcryptjs_1.default.hashSync(password, salt);
                attributes.set('password', hash);
            },
            beforeCreate(attributes, options) {
                const password = attributes.get('password');
                const salt = bcryptjs_1.default.genSaltSync(15);
                const hash = bcryptjs_1.default.hashSync(password, salt);
                attributes.set('password', hash);
            }
        },
        sequelize,
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['password', 'mail']
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ['password', 'mail']
                }
            }
        }
    });
};
exports.userEntity = userEntity;
