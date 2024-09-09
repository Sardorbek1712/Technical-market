import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import authDto from "./auth.dto.js"
import authController from "./auth.controller.js"

export const authRoutes = Router()
    .post("/login",ValidationMiddleware(authDto.login()),
        authController.login)

