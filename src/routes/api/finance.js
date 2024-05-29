const express = require("express");
const router = express.Router();
const financeController = require("../../controllers/financeController");

router.route("/getAllFinance").get(financeController.getAllFinance);

router.route("/addNewFinance").post(financeController.addNewFinance);

module.exports = router;
