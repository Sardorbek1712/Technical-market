import express, { Router } from "express";
import { categoryRoutes } from "./category.routes.js";

export const routes = Router()

routes
    .use("/categories",categoryRoutes)