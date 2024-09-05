import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

export const Role = mongoose.model('Role', roleSchema)

export const saveRoles = async () => {

        const roles = await Role.find()

        if (roles.length < 1) {
            await Role.create([
                {
                    name: "customer"
                },
                {
                    name: "admin"
                }
            ])
        }
}