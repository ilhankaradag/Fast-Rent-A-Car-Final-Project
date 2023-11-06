const express = require('express');
const router = express.Router();
const {
  getAllReservation,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  register,
  login,
} = require('../controllers/controllers.js');

//CREATE
router.post('/create', createReservation);
//UPDATE
router.put('/:id', updateReservation);
//DELETE
router.delete('/:id', deleteReservation);
//GET
router.get('/reservation/:id', getReservation);
//GET ALL
router.get('/reservation', getAllReservation);
//REGISTER
router.post('/register', register);
//LOGIN
router.post('/login', login);

module.exports = router;
