import { Router } from "express"

export const router = Router()
    .use("/",(req,res)=>{
        res.render("../views/main.ejs")
    })