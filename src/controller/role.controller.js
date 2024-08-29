import { Role } from "../models/role.js";
import { User } from "../models/user.js";
import { CustomException } from "../utils/customException.js";

class RoleController{
    constructor(){}

    async getRolesByUserId(req,res){

        try{
            const user = await User.findById(req.params.userId).populate("role_id")

            if(!user){
                throw new CustomException(404,"User not found")
            }

            let roles = []
            switch(user.role_id?.name){
                case 'admin' : roles.push(await Role.findOne({name : 'seller'}));break;
            }

            res.status(200).send({
                message: "Roles created successfully",
                data: roles
            })
        }catch(error){
            res.status(500).send({
                message: "Error",
                error: error
            })  
        }
    }

    
}

export default new RoleController