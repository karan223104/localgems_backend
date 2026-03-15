const router = require("express").Router();
const talentController = require("../controllers/TalentController");

router.post("/register", talentController.createTalent);

router.get("/all", talentController.getAllTalents);
router.get("/:id", talentController.getTalentById);

router.put("/update/:id", talentController.updateTalent);

router.delete("/delete/:id", talentController.deleteTalent);

module.exports = router;