const router = require("express").Router()
const userControllers = require("../controllers/user-controllers")

//sign up and create a new user
router.post("/signup", userControllers.signup)

router.post("/signin", userControllers.signin)

module.exports = router
