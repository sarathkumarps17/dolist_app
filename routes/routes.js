const router = require("express").Router();

router.use("/login", require("./api/loginRout"));
router.use("/home", require("./api/homeRoute"));
router.use("/register", require("./api/registerRout"));
router.use("/admin", require("./api/adminRout"));
router.use("/dolist", require("./api/doListRout"));

module.exports = router;
