import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import vehicles from '../../data/vehicleList';
import { jwtDecode } from 'jwt-decode';
import EditReservation from './EditReservation';

const ListReservation = ({
  reservation,
  setReservation,
  reservations,
  getAllReservations,
  users,
  setUsers,
  getAllUsers,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [ownerReservationIds, setOwnerReservationIds] = useState({});
  const [currentReservation, setCurrentReservation] = useState(reservations);
  let token = localStorage.getItem('token');
  let decoded = jwtDecode(token);

  function filter() {
    let ownerReservationIds = reservations
      .filter((reservation) => reservation.owner._id === decoded.id)
      .map((reservation) => reservation._id);
    console.log('ids', ownerReservationIds);
    setOwnerReservationIds(ownerReservationIds);
  }

  console.log(reservations);
  console.log(reservation);
  console.log(currentReservation.model);

  useEffect(() => {
    filter();
  }, [reservation, decoded.id]);
  // DELETE
  function deleteReservation(id) {
    try {
      let result = window.confirm(
        'Are you sure you want to delete this reservation?',
      );

      if (result) {
        const newReservations = reservations.map((reservation) => {
          if (id === reservation._id) {
            axios
              .delete(`https://fast-rent-a-car.onrender.com/${id}`)
              .then((res) => alert('Deleted completed'))
              .then(() => getAllReservations())
              .catch((err) => console.log(err));
          }
          return reservations;
        });
        console.log('from the delete function', newReservations);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updateReservation(id, reservation) {
    console.log(id);
    setIsEdit(true);
    setId(id);
    setCurrentReservation(reservation);
  }

  return (
    <div>
      {!isEdit ? (
        <div className="mt-4">
          <div className="text-center">
            <Button variant="primary" onClick={() => getAllReservations()}>
              Reservation List
            </Button>
          </div>
          <div className="mt-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car</th>
                  <th>Pick Up</th>
                  <th>Drop Off</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Delete</th>
                  <th>Update</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {reservations
                  .filter((reservation) => reservation.owner._id === decoded.id)
                  .map((reservation, index) => (
                    <tr key={index} className="cursor-hand">
                      <td>{index + 1}</td>
                      <td>{reservation.model}</td>
                      <td>
                        {reservation.pickupplace}
                        <br />
                        {reservation.pickupdate}
                      </td>
                      <td>
                        {reservation.dropoffplace}
                        <br />
                        {reservation.dropoffdate}
                      </td>
                      <td>{reservation.desc}</td>
                      <td>{reservation.status}</td>

                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteReservation(reservation._id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() =>
                            updateReservation(reservation._id, reservation)
                          }
                        >
                          Update
                        </Button>
                      </td>

                      <td>{reservation.owner.email}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          {reservations.map((reservation, index) =>
            id === reservation._id ? (
              <EditReservation
                getAllReservations={getAllReservations}
                reservation={reservation}
                setId={setId}
                id={id}
                setIsEdit={setIsEdit}
                users={users}
                setUsers={setUsers}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

export default ListReservation;
