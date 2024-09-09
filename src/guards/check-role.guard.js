import { ConflictException } from "../exceptions/conflict.exception.js";

export const CheckRolesGuard = (...roles) => {
    return (req, _, next) => {
        if (!roles.length) {
            return next();
        }
        console.log(req.role)
        if (!roles.includes(req.role)) {
            
            throw new ConflictException(
                `User don't have access to url: ${req.baseUrl} with method: ${req.method}`
            );
        }

        next();
    };
};
