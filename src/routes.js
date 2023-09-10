const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getStudent);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.removeStudent);

module.exports = router;
