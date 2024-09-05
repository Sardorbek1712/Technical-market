import { Router } from "express";
import userController from "./user.controller.js";

export const userRoutes = Router()

userRoutes
    .post("/add",userController.createUser)
    .get("/all",userController.getAllUsers)
    .patch("/update/:userId",userController.updateUserById)
    .delete("/delete/:userId",userController.deleteUserById)