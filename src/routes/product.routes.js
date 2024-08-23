import { Router } from "express";
import productController from "../controller/product.controller.js";

export const productRoutes = Router()

productRoutes
    .post("/add",productController.createProduct)
    .get("/all",productController.getAllProducts)
    .get("/:productId",productController.getProductById)
    .put("/update/:productId",productController.updateProductById)
    .delete("/delete/:productId",productController.deleteProductById)