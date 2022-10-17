// class to interact with user/admin services

const { AdminRepository } = require("../database");
const {
	FormateData,
	validatePassword,
	generateAccessToken,
	generateHashPassword,
} = require("../utils");

class AdminService {
	// constructor to set repository instance
	constructor() {
		this.repository = new AdminRepository();
	}

	// signin service
	async SignIn(userInput) {
		const { email, password } = userInput;
		const existingUser = await this.repository.GetUserByEmail(email);
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
			} else {
				return FormateData({ msg: "Email or Password Incorrect!" });
			}
			return FormateData(null);
		} catch (error) {
			console.error(error);
		}
	}

	// register service
	async SignUp(userInput) {
		const { username, email, password, firstName, lastName } = userInput;
		try {
			if (
				(await this.repository.GetUserByEmail(email)) ||
				(await this.repository.GetUserByUsername(username))
			) {
				return FormateData(null);
			}
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}

		let hashedPassword = await generateHashPassword(password);
		const newUser = await this.repository.AddUser({
			username,
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});
		return FormateData({ _id: newUser._id });
	}

	// delete user service
	async DeleteUser(id) {
		try {
			if (await this.repository.GetUserById(id)) {
				const deletedUser = await this.repository.DeleteUser(id);
				return FormateData(deletedUser);
			} else {
				return FormateData(null);
			}
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load user by id service
	async GetUserById(id) {
		try {
			const user = await this.repository.GetUserById(id);
			return FormateData(user);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}

	// load all users
	async GetAllUsers() {
		try {
			const users = await this.repository.GetAllUsers();
			return FormateData(users);
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!" });
		}
	}
}

module.exports = AdminService;
