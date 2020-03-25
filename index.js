require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const forumRoutes = require("./routes/forums-routes")
const userRoutes = require("./routes/users-routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(function(err, req, res, next) {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		res.status(400).send({
			status: 400,
			error: "Error: Bad request body"
		})
	} else next()
})

//handle routing
app.use("/forum", forumRoutes)
app.use("/user", userRoutes)

//connect mongo
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once("open", () => console.log("Mongo connected"))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
