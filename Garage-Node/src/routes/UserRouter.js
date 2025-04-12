//router
const   routes = require("express").Router()
//controller --> userController
const userController = require("../controllers/UserController")
// Import auth middleware
const { verifyToken, checkRole } = require('../middleware/auth');

// Public routes - no authentication required
routes.post("/add", userController.signup)
routes.post("/user/login", userController.loginUser)

// Protected routes with role-based access
routes.get("/users", verifyToken, userController.getAllUsers)
routes.get("/all", userController.getUserAll)
routes.get("/user/:id", verifyToken, checkRole(['Admin', 'ServiceProvider', 'Customer']), userController.getUserById)
routes.delete("/user/:id", verifyToken, checkRole(['Admin']), userController.deleteUserById)

module.exports = routes   