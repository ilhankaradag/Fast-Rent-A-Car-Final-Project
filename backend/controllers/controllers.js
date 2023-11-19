const Reservation = require('../models/Cars');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authorization');
require('dotenv').config();

const getAllReservation = async (req, res) => {
  try {
    let reservations = await Reservation.find().populate('owner', 'email');
    res.status(200).send(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'server error from getAll controllers' });
  }
};

const getReservation = async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    res.status(200).send(reservation);
  } catch (error) {
    res
      .status(500)
      .send({ msg: 'server error from getReservation controllers' });
  }
};

const createReservation = async (req, res) => {
  try {
    let owner = req.user.id;
    let { model, pickupplace, dropoffplace, pickupdate, dropoffdate, desc } =
      req.body;
    let newReservation = {
      model,
      pickupplace,
      dropoffplace,
      pickupdate,
      dropoffdate,
      desc,
      owner,
    };
    let reservation = await Reservation.create(newReservation);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).send({ msg: 'server error from create controllers' });
  }
};

const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).send({ msg: 'server error from update controllers' });
  }
};

const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json('Reservation has been deleted.');
  } catch (error) {
    res.status(500).send({ msg: 'server error from delete controllers' });
  }
};
// AUTH
const register = async (req, res) => {
  try {
    let { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.send({ msg: 'All fields are required' });
    }
    let found = await User.findOne({ email });
    if (found) {
      return res.send({ msg: 'Email already exists' });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashPassword });
    return res.send({ msg: 'Registered successfully' });
  } catch (error) {
    res.status(500).send({ msg: 'Internal server error' });
  }
};
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(402)
        .send({ msg: 'Both email and password are required' });
    }
    let oldUser = await User.findOne({ email });
    if (oldUser) {
      let validPassword = await bcrypt.compare(password, oldUser.password);
      if (!validPassword) {
        return res.status(401).send({ msg: 'Invalid password' });
      } else {
        let token = jwt.sign(
          {
            email: oldUser.email,
            id: oldUser._id,
            role: oldUser.role,
          },
          process.env.TOKEN_KEY,
        );
        res.status(200).send({ msg: 'Login successful,Welcome !', token });
      }
    } else {
      return res
        .status(404)
        .send({ msg: 'Invalid email, please register first' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Internal server error' });
  }
};

// USERS
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ msg: 'server error from getAll controllers' });
  }
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ msg: 'server error from getUser controllers' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send({ msg: 'server error from update controllers' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted.');
  } catch (error) {
    res.status(500).send({ msg: 'server error from delete controllers' });
  }
};

module.exports = {
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
};
