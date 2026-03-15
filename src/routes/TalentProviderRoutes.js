const router = require("express").Router();
const talentProviderController = require("../controllers/TalentProviderController");

router.post("/register", talentProviderController.createProvider);

router.get("/all", talentProviderController.getAllProviders);
router.get("/:id", talentProviderController.getProviderById);

router.put("/update/:id", talentProviderController.updateProvider);

router.delete("/delete/:id", talentProviderController.deleteProvider);

module.exports = router;