import { isValidObjectId } from "mongoose";
import { Category } from "./category.model.js";
import { Product } from "../product/product.model.js";
import { CustomException } from "../../utils/customException.js";

class CategoryController {
  constructor() {}

  //This method create new Category and returuns created category...
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);

      res.status(201).send({
        message: "Category created successfully",
        data: [category],
      });

      res.stat;
    } catch (error) {
      res.status(500).send({
        message: "Error on creating category",
        err: error,
      });
    }
  }

  // GETTING ALL CATEGORIES...

  async getAllCategories(req, res) {
    try {
      const allCategories = await Category.find().populate("products");

      res.status(200).send({
        message: "Got all products",
        count: allCategories.length,
        data: allCategories,
      });
    } catch (error) {
      res.status(404).send({
        message: "Not Found Error",
        err: error,
      });
    }
  }

  // GETTING CATEGORIES BY ID...

  async getCategoryById(req, res) {
    try {
      const singleCategory = await Category.findById(req.params.categoryId);

      if (!singleCategory) throw new CustomException(404, "Category not Found");

      res.status(200).send({
        message: "Success",
        data: [singleCategory],
      });
    } catch (error) {
      res.status(404).send({
        message: "Category not Found",
        err: error,
      });
    }
  }

  // Update category by ID
  async updateCategoryById(req, res) {
    try {
      if (!isValidObjectId(req.params.categoryId))
        throw new CustomException(400, "Input valid Category Id");

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,

        { overwriteDiscriminatorKey: true, new: true, runValidators: true }
      ).populate("products");

      if (!updatedCategory)
        throw new CustomException(404, "Category not found");

      res.status(200).send({
        message: "Category Updated successfully",
        data: [updatedCategory],
      });
    } catch (error) {
      res.status(error.status || 500).send({
        error: error.message,
      });
    }
  }

  // Delete Category By Id
  async deleteCategoryById(req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(
        req.params.categoryId
      );

      await Product.deleteMany({ category_id: deletedCategory._id });

      if (!deletedCategory)
        throw new CustomException(404, "Category not Found");

      res.status(200).send({
        message: "Category Deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      res.status(404).send({
        message: "Category is not found",
        err: error,
      });
    }
  }
}

export default new CategoryController();
