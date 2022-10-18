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
					const user = await this.repository.GetUserById(existingUser._id);
					return FormateData({
						user,
						token,
						status: "success",
					});
				} else {
					return FormateData({ msg: "Incorrect password!", status: "error" });
				}
			} else {
				return FormateData({
					msg: "Email or Password Incorrect!",
					status: "error",
				});
			}
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
			return FormateData({ msg: "Something went wrong!", status: "error" });
		}

		let hashedPassword = await generateHashPassword(password);
		const newUser = await this.repository.AddUser({
			username,
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});
		return FormateData({ _id: newUser._id, status: "success" });
	}

	// delete user service
	async DeleteUser(id) {
		try {
			if (await this.repository.GetUserById(id)) {
				const deletedUser = await this.repository.DeleteUser(id);
				return FormateData({ deletedUser, status: "success" });
			} else {
				return FormateData(null);
			}
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!", status: "error" });
		}
	}

	// load user by id service
	async GetUserById(id) {
		try {
			const user = await this.repository.GetUserById(id);
			return FormateData({ user, status: "success" });
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!", status: "error" });
		}
	}

	// load all users
	async GetAllUsers() {
		try {
			const users = await this.repository.GetAllUsers();
			return FormateData({ users, status: "success" });
		} catch (error) {
			console.error(error);
			return FormateData({ msg: "Something went wrong!", status: "error" });
		}
	}
}

module.exports = AdminService;
