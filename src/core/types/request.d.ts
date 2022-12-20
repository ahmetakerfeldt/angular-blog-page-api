export {};

declare module 'express' {
    import {UserModel} from "../../models/user/user.entity";

    export interface Request {
        user: UserModel | undefined | null;
        file?: File | null | undefined;
    }
}
