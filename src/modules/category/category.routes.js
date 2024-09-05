import { Router } from "express";
import categoryController from "./category.controller.js";
export const categoryRoutes = Router()

categoryRoutes
    .post("/add",categoryController.createCategory)
    .get("/all",categoryController.getAllCategories)
    .get("/:categoryId",categoryController.getCategoryById)
    .put("/update/:categoryId",categoryController.updateCategoryById)
    .delete("/delete/:categoryId",categoryController.deleteCategoryById)

