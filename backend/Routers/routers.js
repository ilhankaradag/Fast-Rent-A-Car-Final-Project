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
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/controllers.js');

const isAdmin = require('../middleware/isAdmin');
//CREATE
router.post('/create', createReservation);
//UPDATE
router.put('/:id', updateReservation);
//DELETE
router.delete('/:id', deleteReservation);
//GET
router.get('/reservation/:id', getReservation);
//GET ALL
router.get('/reservation', isAdmin, getAllReservation);
//REGISTER
router.post('/register', register);
//LOGIN
router.post('/login', login);

//USER
//USER UPDATE
router.put('/user/:id', updateUser);
//USER DELETE
router.delete('/user/:id', deleteUser);
//USER GET
router.get('/user/:id', getUser);
//USER GET ALL
router.get('/users', getAllUsers);

module.exports = router;
