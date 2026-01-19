/* eslint-env node */
const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const user = require("../controllers/userController");

router.put("/me", requireAuth, user.updateMe);

module.exports = router;
