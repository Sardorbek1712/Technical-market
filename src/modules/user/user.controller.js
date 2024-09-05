import { isValidObjectId } from "mongoose";
import { User } from "./user.model.js";
import { CustomException } from "../../utils/customException.js";
import bcrypt from "bcrypt";
 

class UserContreller {
  #_userModel;
  constructor() {
    this.#_userModel = User;
  }


  createUser = async (req, res,next)=> {
    try {
      const { email, full_name, password, role_id } = req.body

      const hashPassword = await bcrypt.hash(password, 12)

      const user = new this.#_userModel({
          email,
          full_name,
          password: hashPassword,
          role_id
      })
      await user.save()

      res.status(201).send({
          message: 'Ok',
          data: [user]
      })
  }
  catch (error) {
      next(error)
  }
  }


  getAllUsers = async (req, res)=> {
    try {

      let users = null
      if(req.role == 'admin'){
      users = await this.#_userModel.find({
        role_id: {
          $in: [
                '66d81fba3dc2df19c385d3d8',
                '66d81fba3dc2df19c385d3d7'
          ]
        }
      }).populate('role_id')
    }
    else{
      users = await this.#_userModel.find({
        role_id: {
          $in: [
            '66d81fba3dc2df19c385d3d7'
          ]
        }
      }).populate('role_id')
    }

      res.status(200).send({
        message: "Got Users successfully",
        data: users,
      });
    } catch (error) {
      res.status(404).send({
        message: "Users Not found",
        error: error,
      });
    }
  }

  

  updateUserById = async (req, res)=> {
    try {
      if (!isValidObjectId(req.params.userId))
        throw new CustomException(400, "Bad request exception!");

      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,

        { overwriteDiscriminatorKey: true, new: true, runValidators: true }
      ).populate("users");

      if (!updatedUser) throw new CustomException(404, "Input valid User Id");
      res.status(200).send({
        message: "User updated successfully!",
        data: [updatedUser],
      });
    } catch (error) {
      res.status(500).send({
        message: "Interval Server Error",
        error: error,
      });
    }
  }

  deleteUserById = async(req, res)=> {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      if (!deletedUser) throw new CustomException(404, "User not found");

      res.status(200).send({
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      res.status(404).send({
        message: "User not found",
        error: error,
      });
    }
  }
}

export default new UserContreller();
