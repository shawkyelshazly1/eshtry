const ProductService = require("../services/product-service");

module.exports = (app) => {
	const service = new ProductService();

	//get single product by id
	app.get("/id/:productId", async (req, res, next) => {
		const { productId } = req.params;
		const { data } = await service.loadProduct(productId);
		return res.status(200).json(data);
	});

	// get all products
	app.get("/", async (req, res, next) => {
		const { data } = await service.loadAllProducts();
		return res.status(200).json(data);
	});

	// get all categories
	app.get("/category", async (req, res, next) => {
		const { data } = await service.loadCategories();
		return res.status(200).json(data);
	});

	// get products by categoryId
	app.get("/category/:categoryId", async (req, res, next) => {
		const { categoryId } = req.params;
		const { data } = await service.loadCategoryProducts(categoryId);
		return res.status(200).json(data);
	});
};
