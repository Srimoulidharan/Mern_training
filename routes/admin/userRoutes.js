const express = require("express");
const { registerUser, getAllUsers, loginUser, updateUserRole } = require("../../controllers/admin/userController");
const router = express.Router();
router.post("/register", registerUser);
router.get("/", getAllUsers);  
router.post("/login", loginUser);
router.put("/update-role", updateUserRole); 
module.exports = router;
