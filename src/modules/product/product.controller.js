import { isValidObjectId } from "mongoose";
import { CustomException } from "../../utils/customException.js";
import { Category } from "../category/category.model.js";
import { Product } from "./product.model.js";
import { LIMIT, PAGE, SORT } from "../../constants/product.constants.js";

class ProductController {
  constructor() {}

  // Create product
  async createProduct(req, res) {
    try {
      const product = new Product(req.body);

      if (!isValidObjectId(product?.category_id))
        throw new CustomException(400, "Invalid Id");

      const updatedCategory = await Category.findByIdAndUpdate(
        product.category_id,
        {
          $push: {
            products: product,
          },
        }
      );

      if (!updatedCategory)
        throw new CustomException(404, "Category not Found");

      await product.save();

      res.status(200).send({
        message: "Product created successfully",
        data: [product],
      });
    } catch (error) {
      res.status(201).send({
        message: "Product is not created",
      });
    }
  }

  // Get all product
  async getAllProducts(req, res) {
    try {
      let query = { ...req.query };
      let page = req.query?.page || PAGE;
      let limit = req.query?.limit || LIMIT;
      let sort = req.query?.sort || SORT;

      const excludedQueries = ["page", "limit", "sort"];

      excludedQueries.map((eq) => delete query[eq]);

      query = JSON.stringify(query).replace(
        /\b(lt|lte|gt|gte)\b/g,
        (match) => `$${match}`
      );

      query = JSON.parse(query);
      let products = await Product.find(query)
        .skip(limit * (page - 1))
        .limit(limit)
        .sort(`${sort}`);

      res.send({
        message: "Ok",
        count: products.length,
        page,
        limit,
        sort,
        data: products,
      });
    } catch (error) {
      res.status(404).send({
        message: "Products Not Found",
        error: error,
      });
    }
  }

  // Get product by ID
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) throw new CustomException(404, "Product NOT Found");

      res.status(200).send({
        message: "Product Found",
        data: [product],
      });
    } catch (error) {
      res.status(400).send({
        message: "Product not found",
        error: error,
      });
    }
  }

  // Update product By ID
  async updateProductById(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { overwriteDiscriminatorKey: true, new: true }
      );

      if (!updatedProduct) throw new CustomException(404, "Product not found");

      res.status(200).send({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(404).send({
        message: "Product NOT FOUND",
        error: error,
      });
    }
  }

  // Delete Product by ID
  async deleteProductById(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(
        req.params.productId
      );
      if (!deletedProduct) throw new CustomException(404, "Product Not Found");

      res.status(200).send({
        message: "Product Deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      res.status(404).send({
        message: "Product not deleted",
        error: error,
      });
    }
  }
}

export default new ProductController();
