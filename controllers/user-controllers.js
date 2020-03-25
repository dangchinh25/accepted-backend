const HttpError = require("../errors/http-error")
const User = require("../models/user.model")

const signup = async (req, res, next) => {
	const {
		name,
		email,
		password,
		gradYear,
		intendedMajor,
		extraAct,
		achivement,
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

	const createdUser = new User({
		name,
		email,
		password,
		gradYear,
		intendedMajor,
		extraAct,
		achivement,
		currentHighSchool,
		posts: [],
		replies: []
	})

	try {
		await createdUser.save()
	} catch (err) {
		return next(
			new HttpError("Signing up failed, please try again later", 500)
		)
	}

	res.status(201).json({
		createdUser
	})
}

const signin = (req, res, next) => {}

exports.signup = signup
exports.signin = signin
