import { Router } from "express";
import userController from "../controller/user.controller.js";

export const userRoutes = Router()

userRoutes
    .post("/add",userController.createUser)
    .get("/all",userController.getAllUsers)