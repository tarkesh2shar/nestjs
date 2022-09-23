import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction } from "connect";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {
    }
    async use(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.userService.findOne(userId);
            // @ts-ignore
            req.currentUser = user;
        }

        next();
    }
}