
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
})

router.use('/members', require('./members'));

router.use('/templevisits', require('./templeVisits'));

module.exports = router;