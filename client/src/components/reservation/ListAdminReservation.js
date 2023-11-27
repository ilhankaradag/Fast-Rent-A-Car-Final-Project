import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import vehicles from '../../data/vehicleList';
import { jwtDecode } from 'jwt-decode';
import EditReservation from './EditReservation';

const ListAdminReservation = ({
  reservation,
  setReservation,
  reservations,
  getAllReservations,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedValue, setUpdatedValue] = useState({
    model: reservation.model,
    pickupplace: reservation.pickupplace,
    dropoffplace: reservation.dropoffplace,
    pickupdate: reservation.pickupdate,
    dropoffdate: reservation.dropoffdate,
    desc: reservation.desc,
    owner: reservation.owner,
  });
  const [id, setId] = useState(null);
  const [currentReservation, setCurrentReservation] = useState({});
  let token = localStorage.getItem('token');
  let decoded = jwtDecode(token);

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
              .delete(`http://localhost:7000/${id}`)
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

  // UPDATE
  function handleInputChange(e) {
    setUpdatedValue({
      ...updatedValue,
      [e.target.name]: e.target.value,
    });
    console.log(updatedValue);
  }

  function updateReservation(id, reservation) {
    console.log(id);
    setIsEdit(true);
    setId(id);
    setCurrentReservation(reservation);
  }

  function saveChanges() {
    try {
      console.log('this is the id', id);
      axios
        .put(`http://localhost:7000/${id}`, {
          model: updatedValue.model,
          pickupplace: updatedValue.pickupplace,
          dropoffplace: updatedValue.dropoffplace,
          pickupdate: updatedValue.pickupdate,
          dropoffdate: updatedValue.dropoffdate,
          desc: updatedValue.desc,
          // owner: updatedValue.owner,
        })
        .then((res) => console.log(res.data))
        .then(() => getAllReservations())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setIsEdit(false);
  }
  return (
    <div className="home">
      <h1>Admin Reservation List</h1>
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
                  <th>Delete</th>
                  <th>Update</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
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
        <div className="text-center mt-4 ">
          {reservations.map((reservation, index) =>
            id === reservation._id ? (
              <EditReservation
                getAllReservations={getAllReservations}
                reservation={reservation}
                setId={setId}
                id={id}
                setIsEdit={setIsEdit}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

export default ListAdminReservation;
