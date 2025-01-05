const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripsController");
const authController = require("../controllers/authController");
// Lấy danh sách tất cả chuyến đi
router.get("/trips", tripController.getAllTrips);

router.get(
  "/trips/:id",
  authController.verifyToken,
  tripController.getTripById
);

// Thêm chuyến đi
router.post("/trips", tripController.createTrip);

// Sửa chuyến đi
router.put("/trips/:id", tripController.updateTrip);
// xóa chuyến đi
router.delete("/trips/:id", tripController.deleteTrip);

// tìm kiếm chuyến đi
router.get("/search", tripController.searchTrips);

module.exports = router;
