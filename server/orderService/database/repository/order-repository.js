const { calculateOrderTotal } = require("../../utils");
const { OrderModel } = require("../models");
const mongoose = require("mongoose");

// create product repository to interact with DB
class OrderRepository {
	// create order
	async CreateOrder(currentUserId, items) {
		const newOrder = await OrderModel({
			status: "initiated",
			items,
			userId: currentUserId,
			amount: await calculateOrderTotal(items),
		});
		return await newOrder.save();
	}

	// cancel order
	async CancelOrder(orderId) {
		// update order status to cancel
		const updatedOrder = await OrderModel.findByIdAndUpdate(
			mongoose.Types.ObjectId(orderId),
			{ status: "cancelled" },
			{ new: true }
		);

		return updatedOrder;
	}

	// update order status :: system usage && ADMIN
	async UpdateOrderStatus(orderId, orderStatus) {
		const updatedOrder = await OrderModel.findByIdAndUpdate(
			mongoose.Types.ObjectId(orderId),
			{ status: orderStatus },
			{ new: true }
		);

		return updatedOrder || {};
	}

	// load user orders
	async GetUserOrders(currentUserId) {
		const userOrders = await OrderModel.find({
			userId: mongoose.Types.ObjectId(currentUserId),
		});

		return userOrders || [];
	}

	// get single order
	async getOrderById(orderId) {
		const existingOrder = await OrderModel.findById(
			mongoose.Types.ObjectId(orderId)
		);
		return existingOrder || {};
	}

	// load all orders :: Admin
	async GetAllOrders() {
		const allOrders = await OrderModel.find({});
		return allOrders || [];
	}

	// delete order :: Admin
	async DeleteOrder(orderId) {
		const deletedOrder = await OrderModel.findByIdAndDelete(
			mongoose.Types.ObjectId(orderId)
		);

		return deletedOrder || {};
	}
}

module.exports = OrderRepository;
