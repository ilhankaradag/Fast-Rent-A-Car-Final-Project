import React from 'react';
import Slider from './Slider';

const Reservation = ({ getAllReservations }) => {
  return (
    <div className="home">
      <h1>Reservation</h1>
      <Slider getAllReservations={getAllReservations} />
    </div>
  );
};

export default Reservation;
