const express = require('express');
const router = express.Router();

const templeVisitsController = require('../controllers/templeVisits');

const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', templeVisitsController.getAll);
router.get('/:id', templeVisitsController.getSingle);
router.post("/", isAuthenticated, validation.saveTempleVisit, templeVisitsController.createTempleVisit);
router.put("/:id", isAuthenticated, validation.saveTempleVisit, templeVisitsController.updateTempleVisit);
router.delete("/:id", isAuthenticated, templeVisitsController.deleteTempleVisit);

module.exports = router;
