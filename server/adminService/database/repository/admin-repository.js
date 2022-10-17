const mongoose = require("mongoose");
const { FormateData } = require("../../utils");
const { UserModel } = require("../models");

// class for the user repository accessing the db collection for users/admins
class AdminRepository {
	// add new user
	async AddUser(userData) {
		try {
			const addedUser = new UserModel(userData);
			return await addedUser.save();
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	//delete admin user
	async DeleteUser(id) {
		try {
			const deletedUser = await UserModel.findByIdAndDelete(
				mongoose.Types.ObjectId(id)
			);
			return {};
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// update User
	async UpdateUser(id, userData) {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate(
				mongoose.Types.ObjectId(id),
				{ userData },
				{ new: true }
			);

			return await updatedUser.save();
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// find user by email
	async GetUserByEmail(email) {
		const existingUser = await UserModel.findOne({ email });
		return existingUser;
	}

	// find user by id
	async GetUserById(id) {
		const existingUser = await UserModel.findById(mongoose.Types.ObjectId(id), {
			password: 0,
		});
		return existingUser;
	}

	// find user by username
	async GetUserByUsername(username) {
		const existingUser = await UserModel.findOne({ username });
		return existingUser;
	}

	// load all users
	async GetAllUsers() {
		const users = await UserModel.find({}, { password: 0 });
		return users || [];
	}
}

module.exports = AdminRepository;
