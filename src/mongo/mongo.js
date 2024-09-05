import mongoose from "mongoose";
import { mongoConfig } from "../config/mongo.config.js";
import { saveRoles } from "../modules/role/role.model.js"

export async function mongoDB() {

try {
    mongoose.connect(mongoConfig.url)
    saveRoles()
}catch (error) {
    console.error(error.message)
    process.exit(1)
}

  await mongoose.connect(mongoConfig.url);
}

