const mongoose = require("mongoose");
const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
// product & category services class
class ProductService {
	//main constructor
	constructor() {
		this.repository = new ProductRepository();
	}

	// add new product
	async addProduct({
		title,
		description,
		price,
		cover,
		images = [],
		categoryId,
		quantity,
	}) {
		try {
			const addedProduct = await this.repository.AddProduct({
				title,
				description,
				price,
				cover,
				images,
				categoryId,
				quantity,
			});
			return FormateData(addedProduct);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// update product
	async updateProduct({
		id,
		title,
		description,
		price,
		cover,
		images = [],
		categoryId,
		quantity,
	}) {
		try {
			const updatedProduct = await this.repository.UpdateProduct(
				mongoose.Types.ObjectId(id),
				{
					title,
					description,
					price,
					cover,
					images,
					categoryId,
					quantity,
				}
			);
			return FormateData(updatedProduct);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// delete product
	async deleteProduct(id) {
		try {
			const deletedProduct = await this.repository.DeleteProduct(id);
			return FormateData(deletedProduct);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// add Category
	async addCategory({ title, description, cover }) {
		try {
			const addedCategory = await this.repository.AddCategory({
				title,
				description,
				cover,
			});
			return FormateData(addedCategory);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// loadProduct service
	async loadProduct(id) {
		try {
			const product = await this.repository.GetProductById(id);
			return FormateData(product || {});
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load All Products
	async loadAllProducts() {
		try {
			const products = await this.repository.GetAllProducts();
			return FormateData(products);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load all categories
	async loadCategories() {
		try {
			const categories = await this.repository.GetAllCategories();
			return FormateData(categories);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load products by category
	async loadCategoryProducts(categoryId) {
		try {
			const products = await this.repository.GetProductsByCategory(categoryId);
			return FormateData(products);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// update product quantity
	async updateProductQuantity(productId, quantity) {
		try {
			const existingProduct = await this.repository.GetProductById(productId);
			const updatedQuantity =
				existingProduct.quantity - quantity > 0
					? existingProduct.quantity - quantity
					: 0;

			const updatedProduct = await this.repository.UpdateProductQuantity(
				productId,
				updatedQuantity
			);
			return FormateData(updatedProduct);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}
}

module.exports = ProductService;
