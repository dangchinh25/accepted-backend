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

	createdUser.save()

	res.json("New users added")
}

const signin = (req, res, next) => {}

exports.signup = signup
exports.signin = signin
