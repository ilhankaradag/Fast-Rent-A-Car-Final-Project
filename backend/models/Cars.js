const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  pickupplace: {
    type: String,
    required: true,
  },
  dropoffplace: {
    type: String,
    required: true,
  },
  pickupdate: {
    type: String,
    required: true,
  },
  dropoffdate: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model('Cars', reservationSchema);

module.exports = Reservation;
