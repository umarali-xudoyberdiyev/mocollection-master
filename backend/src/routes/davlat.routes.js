const express = require("express");
const router = express.Router();
const controller = require("../controllers/davlat.controllers");
const validate = require("../middlewares/validate");
const { requireAuth } = require("../middlewares/auth.middleware");
const {
  createDavlatSchema,
  updateDavlatSchema,
} = require("../validations/davlat.validations");

router.use(requireAuth);

router.get("/", controller.getAll_Davlat);
router.get("/:id", controller.getById_Davlat);
router.post("/", validate(createDavlatSchema), controller.create_Davlat);
router.put("/:id", validate(updateDavlatSchema), controller.update_Davlat);
router.delete("/:id", controller.remove_Davlat);

module.exports = router;
