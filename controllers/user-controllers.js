const HttpError = require("../errors/http-error")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const signup = async (req, res, next) => {
	const {
		name,
		email,
		password,
		gradYear,
		intendedMajor,
		extraAct,
		achievement,
		currentHighSchool
	} = req.body

	//check if user already exist
	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		return next(
			new HttpError("Signing up failed, please try again later", 500)
		)
	}

	if (existingUser) {
		return next(
			new HttpError(
				"User already existed, please try sign in instead",
				422
			)
		)
	}

	let hashedPass
	try {
		hashedPass = await bcrypt.hash(password, 10)
	} catch (err) {
		return next(
			new HttpError("Could not create user, please try again", 500)
		)
	}

	const createdUser = new User({
		name,
		email,
		password: hashedPass,
		gradYear,
		intendedMajor,
		extraAct,
		achievement,
		currentHighSchool,
		posts: [],
		replies: []
	})

	try {
		await createdUser.save()
	} catch (err) {
		console.log(err)
		return next(
			new HttpError("Signing up failed, please try again later", 500)
		)
	}

	res.status(201).json({
		createdUser
	})
}

const signin = async (req, res, next) => {
	const { email, password } = req.body

	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		return next(
			new HttpError("Sign in failed, please try again later", 500)
		)
	}

	if (!existingUser) {
		return next(
			new HttpError("Sign in failed, please try again later", 500)
		)
	}

	let isValidPass = false
	try {
		isValidPass = await bcrypt.compare(password, existingUser.password)
	} catch (err) {
		return next(
			new HttpError(
				"Could not sign in, please check your email/password",
				401
			)
		)
	}

	if (!isValidPass) {
		return next(
			new HttpError(
				"Could not sign in, please check your email/password",
				401
			)
		)
	}

	res.json("Signed in")
}

exports.signup = signup
exports.signin = signin
