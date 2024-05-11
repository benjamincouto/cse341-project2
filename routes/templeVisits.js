const express = require('express');
const router = express.Router();

const templeVisitsController = require('../controllers/templeVisits');
const validation = require('../middleware/validate');

router.get('/', templeVisitsController.getAll);
router.get('/:id', templeVisitsController.getSingle);
router.post("/", validation.saveTempleVisit, templeVisitsController.createTempleVisit);
router.put("/:id", validation.saveTempleVisit, templeVisitsController.updateTempleVisit);
router.delete("/:id", templeVisitsController.deleteTempleVisit);

module.exports = router;
