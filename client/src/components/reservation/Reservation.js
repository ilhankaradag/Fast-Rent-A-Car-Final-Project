import React from 'react';
import Slider from './Slider';
import ListReservation from './ListReservation';

const Reservation = ({
  reservation,
  setReservation,
  getAllReservations,
  reservations,
}) => {
  return (
    <div className="home">
      <h1>Reservation</h1>
      <Slider getAllReservations={getAllReservations} />
      <ListReservation
        reservation={reservation}
        reservations={reservations}
        setReservation={setReservation}
        getAllReservations={getAllReservations}
      />
    </div>
  );
};

export default Reservation;
