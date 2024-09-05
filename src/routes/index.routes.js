import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { categoryRoutes } from "../modules/category/category.routes.js";
import {productRoutes} from "../modules/product/product.routes.js"
import {userRoutes} from "../modules/user/user.routes.js"
export const routes = Router()

routes
    .use("/auth",authRoutes)
    .use("/categories",categoryRoutes)
    .use("/products",productRoutes)
    .use("/users",userRoutes)
    