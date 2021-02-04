const router = require('express').Router();

const { Index, addUser } = require('../controllers/usercontroller');


router.get('/', Index);
router.post('/add', addUser);


module.exports = router;