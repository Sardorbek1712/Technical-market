import express, { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";


export const routes = Router()

routes
    .use("/categories",categoryRoutes)
    .use("/products",productRoutes)