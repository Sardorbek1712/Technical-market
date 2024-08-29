import { User } from "../models/user.js";
import {CustomException} from "../utils/customException.js"
import bcrypt from "bcrypt"


class UserContreller{
    constructor(){}

    async getAllUsers(_,res){

        try{
            const users = await User.find().populate('role_id')

            res.status(200).send({
                message: "Got Users successfully",
                data: users
            })
        }catch(error){
            res.status(404).send({
                message: "Users Not found",
                error: error
            })
        }
    }

    async createUser(req,res){

        const password = await bcrypt.hash(req.body.password, 12)
        req.body.password = password

        const user = new User(req.body)

        try{
            await user.save()

            res.status(201).send({
                message: "User created successfully",
                data: [user]
            })
        }catch(error){
            res.status(400).send({
                message: "User not created",
                error: error
            })
        }
    }
}


export default new UserContreller