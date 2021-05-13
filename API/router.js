const express = require("express");
const router = express.Router();

const fetch_route = require("./ROUTES/fetch_route");

router.use("/fetch", fetch_route);

module.exports = router;