require("dotenv").config()
const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
// const connectionString = configVars.mongoConnectionString

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

// mongoose.connect(connectionString, { useNewUrlParser: true })

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
