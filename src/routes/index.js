const express = require('express');
const router = express.Router();

/* ROUTES_IMPORTS */
const userRoute = require("./user.route");
router.use("/users", userRoute);


module.exports = router;
