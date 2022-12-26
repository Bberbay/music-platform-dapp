import {
	RegisterUser,
	LoginUser,
	DeleteUser,
	updatePassword,
} from '../server/database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const GetHome = (req, res) => {
	res.send('Hello Page');
};

export const RegisterUsers = async (req, res) => {
	try {
		var user = req.body;
		console.log(user);

		await RegisterUser(user.username, user.email, user.password);
		console.log(`User [${user.username}] added to the database.`);
		res.send(`User [${user.username}] added to the database.`);
	} catch (error) {
		console.log(error);
	}
};

export const LoginUsers = async (req, res) => {
	const user = req.body;
	var returns = await LoginUser(user.username, user.password);
	var data = returns[0];
	console.log(data);
	res.send(returns);
};

export const Auth = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers[process.env.TOKEN_HEADER_KEY];

	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

export const DeleteUserAccount = async (req, res) => {
	const user = req.body;
	var data = await DeleteUser(user.username, user.password);
	console.log(data);
	res.send(data);
};

export const UpdatePassword = async (req, res) => {
	const user = req.body;
	var returns = await updatePassword(
		user.username,
		user.password,
		user.newPassword,
	);
	var data = returns[0];
	console.log(data);
	if (data === 'Password Changed Succesfully') {
		var newPassword = returns[1];
		console.log(
			`password has been updated to ${req.body.password} has been updated to ${newPassword}`,
		);
	}
	res.send(data);
};
