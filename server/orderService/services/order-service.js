// Order services class

const OrderRepository = require("../database/repository/order-repository");
const { FormateData, PublishMessage, StartMessaging } = require("../utils");
const mongoose = require("mongoose");
const order = require("../api/order");

class OrderService {
	//main constructor
	constructor(channel) {
		this.repository = new OrderRepository();
		this.channel = channel;
	}

	// create new Order
	async createOrder(userId, items) {
		try {
			const createdOrder = await this.repository.CreateOrder(userId, items);
			return FormateData(createdOrder);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// update Order status
	async updateOrderStatus(orderId, orderStatus) {
		try {
			const oldOrder = await this.repository.getOrderById(orderId);

			const updatedOrder = await this.repository.UpdateOrderStatus(
				orderId,
				orderStatus
			);

			if (updatedOrder.status === "shipped" && oldOrder.status !== "shipped") {
				await StartMessaging(
					this.channel,
					"ORDER-PRODUCT",
					"PRODUCT-ORDER",
					"UPDATE_QUANTITY",
					{ items: updatedOrder.items }
				);
			}
			return FormateData(updatedOrder);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// cancel order
	async cancelOrder(orderId, userId) {
		try {
			const existingOrder = await this.repository.getOrderById(orderId);

			if (!existingOrder || existingOrder.userId.toString() !== userId) {
				return FormateData(null);
			}

			const cancelledOrder = await this.repository.CancelOrder(orderId, userId);
			return FormateData(cancelledOrder);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// delete Order
	async deleteOrder(orderId) {
		try {
			const deletedOrder = await this.repository.DeleteOrder(orderId);
			return FormateData(deletedOrder);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// get user orders
	async loadUserOrders(userId) {
		try {
			const userOrders = await this.repository.GetUserOrders(userId);
			return FormateData(userOrders);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// get all orders
	async loadAllOrders() {
		try {
			const allOrders = await this.repository.GetAllOrders();
			return FormateData(allOrders);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load single order details
	async loadOrder(orderId, userId) {
		try {
			const existingOrder = await this.repository.getOrderById(orderId);
			console.log();
			console.log(existingOrder.userId.toString());
			if (!(existingOrder && existingOrder.userId.toString() === userId)) {
				return FormateData(null);
			}

			return FormateData(existingOrder);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}
}

module.exports = OrderService;
