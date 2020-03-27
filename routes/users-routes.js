const router = require("express").Router()
const userControllers = require("../controllers/user-controllers")
const checkAuth = require("../middleware/checkAuth0")

//sign up and create a new user
router.post("/onboard", checkAuth, userControllers.onboard)

module.exports = router
