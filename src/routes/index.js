import express, { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { roleRoutes } from "./role.routes.js";
import { userRoutes } from "./user.routes.js";

export const routes = Router()

routes
    .use("/categories",categoryRoutes)
    .use("/products",productRoutes)
    .use("/users",userRoutes)
    .use("/roles",roleRoutes)
    .use("/",(req,res)=>{
        res.render("../views/main.ejs")
    })