const mongoose = require("mongoose");
const { ProductModel, CategoryModel } = require("../models");
// dealing with the database for product service
class ProductRepository {
	// get product by id
	async GetProductById(id) {
		const existingProduct = await ProductModel.findById({
			_id: mongoose.Types.ObjectId(id),
		});

		return existingProduct;
	}

	// get all products
	async GetAllProducts() {
		const existingProducts = await ProductModel.find({});
		return existingProducts || [];
	}

	// get all categories
	async GetAllCategories() {
		const existingCategories = await CategoryModel.find({});
		return existingCategories || [];
	}

	// get products by category
	async GetProductsByCategory(categoryId) {
		const products = await ProductModel.find({ categoryId });
		return products || [];
	}
}

module.exports = ProductRepository;
