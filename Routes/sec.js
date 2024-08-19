const express = require('express');
const router = express.Router();

router.get("/in", (req, res) => {
    res.render("Login");
  });
module.exports = router;
