const { userRepository } = require("../database");
const {
	validatePassword,
	generateAccessToken,
	FormateData,
	generateHashPassword,
} = require("../utils");

// user services class
class UserService {
	// main constructor
	constructor() {
		this.repository = new userRepository();
	}

	// signIn service
	async SignIn(userInput) {
		const { email, password } = userInput;

		// check if user exists
		const existingUser = await this.repository.FindUserByEmail({ email });

		try {
			if (existingUser) {
				const validPassword = await validatePassword(
					password,
					existingUser.password
				);

				if (validPassword) {
					const token = await generateAccessToken(existingUser);

					return FormateData({ id: existingUser._id, token });
				} else {
					return FormateData({ msg: "Incorrect password!" });
				}
			}
			return FormateData(null);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Incorrect email, user not found!" });
		}
	}

	//register service
	async SignUp(userInput) {
		const { email, username, password, firstName, lastName } = userInput;

		try {
			if (
				(await this.repository.FindUserByEmail({ email })) ||
				(await this.repository.FindUserByUsername({ username }))
			) {
				return FormateData(null);
			}
		} catch (error) {
			return FormateData({ msg: "Username or Email is registered already!" });
		}

		let hashedPassword = await generateHashPassword(password);
		const newUser = await this.repository.Createuser({
			email,
			username,
			password: hashedPassword,
			firstName,
			lastName,
		});

		return FormateData({ _id: newUser._id });
	}

	// get user profile
	async GetUserById(id) {
		const existingUser = await this.repository.FindUserById({ id });
		return FormateData(existingUser);
	}

	// add new address
	async AddNewAddress(_id, userInput) {
		const { city, state, country, street, zipcode } = userInput;
		const newAddress = await this.repository.CreateAddress({
			_id,
			city,
			state,
			country,
			street,
			zipcode,
		});

		return FormateData(newAddress);
	}

	// update address
	async UpdateAddress(userInput) {
		const { city, state, country, street, zipcode, address_id } = userInput;
		const updatedAddress = await this.repository.UpdateAddress({
			address_id,
			city,
			state,
			country,
			street,
			zipcode,
		});

		return FormateData(updatedAddress);
	}

	// delete user
	async DeleteUser(id) {
		try {
			const deletedUser = await this.repository.DeleteUser(id);
			return FormateData(deletedUser);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// get all users
	async GetAllUsers() {
		const users = await this.repository.GetAllUsers();
		return FormateData(users);
	}

	// create user
	async CreateUser(userData) {
		const { email, username, password, firstName, lastName } = userData;
		try {
			if (
				(await this.repository.FindUserByEmail({ email })) ||
				(await this.repository.FindUserByUsername({ username }))
			) {
				return FormateData(null);
			}
		} catch (error) {
			return FormateData({ msg: "Username or Email is registered already!" });
		}

		let hashedPassword = await generateHashPassword(password);
		const newUser = await this.repository.Createuser({
			email,
			username,
			password: hashedPassword,
			firstName,
			lastName,
		});

		return FormateData({ _id: newUser._id });
	}
}

module.exports = UserService;
