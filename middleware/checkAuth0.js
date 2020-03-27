const jwt = require("express-jwt")
const jwtAuthz = require("express-jwt-authz")
const jwksRsa = require("jwks-rsa")

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: process.env.JWKS_URI
	}),

	audience: "http://localhost:8000",
	issuer: process.env.AUTH0_ISSUER,
	algorithms: [process.env.AUTH0_ALG]
})

module.exports = checkJwt
