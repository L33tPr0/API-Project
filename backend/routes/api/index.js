// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const spotImageRouter = require("./spotImages.js");
const reviewsRouter = require("./reviews.js");
const reviewsImagesRouter = require("./review-images.js");
const bookingsRouter = require("./bookings");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.use("/spot-images", spotImageRouter);

router.use("/reviews", reviewsRouter);

router.use("/review-images", reviewsImagesRouter);

router.use("/bookings", bookingsRouter);

module.exports = router;
