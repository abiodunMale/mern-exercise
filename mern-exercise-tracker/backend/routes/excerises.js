const router = require('express').Router();

const { Index, addExcerise, GetExercise, DeleteExercise, UpdateExercise } = require('../controllers/exercisecontroller');

router.get('/', Index);
router.get('/:id', GetExercise);
router.post('/add', addExcerise);
router.delete('/:id', DeleteExercise);
router.post('/update/:id', UpdateExercise);




module.exports = router;