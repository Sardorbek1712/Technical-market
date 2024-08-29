import { Router } from "express";
import roleController from "../controller/role.controller.js";

export const roleRoutes = Router()

roleRoutes
    .get('/:userId',roleController.getRolesByUserId)
    // .post("/add",roleController.creat)