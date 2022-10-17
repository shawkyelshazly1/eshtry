const mongoose = require("mongoose");
const { FormateData } = require("../../utils");
const { UserModel, AddressModel } = require("../models");

// dealing with database operations
class UserRepository {
	// creating new user in database
	async Createuser({ username, firstName, lastName, email, password }) {
		const newUser = await new UserModel({
			username,
			firstName,
			lastName,
			email,
			password,
		});

		const newUserResult = await newUser.save();
		return newUserResult;
	}

	// add new address
	async CreateAddress({ _id, street, city, state, country, zipcode }) {
		const userProfile = await UserModel.findById(_id);
		if (userProfile) {
			const newAddress = new AddressModel({
				street,
				city,
				state,
				country,
				zipcode,
			});
			await newAddress.save();
			userProfile.addresses.push(newAddress);
			await userProfile.save();
			return newAddress;
		}
		return FormateData({ msg: "something went wrong!" });
	}

	// find specific user by username
	async FindUserByUsername({ username }) {
		const existingUser = await UserModel.findOne({ username });
		return existingUser;
	}

	// find specific user by email
	async FindUserByEmail({ email }) {
		const existingUser = await UserModel.findOne({ email });
		return existingUser;
	}
	// find specific user by id
	async FindUserById({ id }) {
		const existingUser = await UserModel.findById(
			{
				_id: mongoose.Types.ObjectId(id),
			},
			{ password: 0 }
		);
		return existingUser;
	}

	// update address by id
	async UpdateAddress({ address_id, street, city, state, country, zipcode }) {
		const existingAddress = await AddressModel.findOneAndUpdate(
			{ _id: address_id },
			{ street, city, state, country, zipcode },
			{ new: true }
		);
		await existingAddress.save();
		return existingAddress;
	}

	// get all addresses for user by userId
	async GetUserAddresses({ _id }) {
		const userProfile = await UserModel.findById(_id);
		if (userProfile) {
			return userProfile.addresses;
		} else {
		}
		return [];
	}
}

module.exports = UserRepository;
