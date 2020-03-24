const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: { type: String, required: true },
	gradYear: { type: Number, required: true },
	intendedMajor: { type: String },
	extraAct: [{ type: String, required: true }],
	achievement: [{ type: String, required: true }],
	currentHighSchool: { type: String },
	currentUniversity: { type: String },
	posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
	replies: [{ type: mongoose.Types.ObjectId, ref: "Replies" }]
})

module.exports = mongoose.model("User", userSchema)
