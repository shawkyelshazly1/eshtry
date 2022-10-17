const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
// product & category services class
class ProductService {
	//main constructor
	constructor() {
		this.repository = new ProductRepository();
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
}

module.exports = ProductService;
