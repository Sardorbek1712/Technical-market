import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import userDto from "./user.dto.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

export const userRoutes = Router()

userRoutes
    .post("/add",
        ValidationMiddleware(userDto.create()),
        checkAuthGuard(true),
        CheckRolesGuard("admin"),
        userController.createUser)
    
    .get("/all",
        checkAuthGuard(true),
        CheckRolesGuard("admin"),
        userController.getAllUsers)
    .patch("/update/:userId",
        checkAuthGuard(true),
        CheckRolesGuard("admin"),
        userController.updateUserById)
    .delete("/delete/:userId",
        checkAuthGuard(true),
        CheckRolesGuard("admin"),
        userController.deleteUserById)