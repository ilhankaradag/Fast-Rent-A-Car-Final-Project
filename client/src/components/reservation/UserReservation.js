import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import vehicles from '../../data/vehicleList';
import { useNavigate } from 'react-router-dom';

const UserReservation = ({ reservation, getAllReservations }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedValue, setUpdatedValue] = useState({
    model: reservation.model,
    pickupplace: reservation.pickupplace,
    dropoffplace: reservation.dropoffplace,
    pickupdate: reservation.pickupdate,
    dropoffdate: reservation.dropoffdate,
    desc: reservation.desc,
  });
  const [id, setId] = useState(null);
  const [currentReservation, setCurrentReservation] = useState({});
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const showDetails = (id) => {
    navigate(`/reservation/${id}`);
  };

  useEffect(() => {
    getAllReservations().then((resp) => {
      setReservations(resp.data);
    });
  }, [reservations]);

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
        .put(`https://fast-rent-a-car.onrender.com/${id}`, {
          model: updatedValue.model,
          pickupplace: updatedValue.pickupplace,
          dropoffplace: updatedValue.dropoffplace,
          pickupdate: updatedValue.pickupdate,
          dropoffdate: updatedValue.dropoffdate,
          desc: updatedValue.desc,
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
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    key={index}
                    onClick={() => showDetails(reservation.id)}
                    className="cursor-hand"
                  >
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 ">
          <Form className="form1">
            <Form.Select
              size="lg"
              className="mb-3"
              type="text"
              name="model"
              onChange={(e) => handleInputChange(e)}
              value={updatedValue.model}
              onFocus={() =>
                setCurrentReservation({
                  ...setUpdatedValue,
                  model: '',
                })
              }
            >
              <option>Select a car</option>
              {vehicles.map((vehicle) => (
                <option value={vehicle.model} key={vehicle.id}>
                  {vehicle.model}
                </option>
              ))}
            </Form.Select>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
                <FiMapPin />
                &nbsp;Pick up
              </InputGroup.Text>
              <FormControl
                style={{ flex: 2 }}
                type="text"
                name="pickupplace"
                onChange={(e) => handleInputChange(e)}
                value={updatedValue.pickupplace}
                onFocus={() =>
                  setCurrentReservation({
                    ...setUpdatedValue,
                    pickupplace: '',
                  })
                }
                placeholder="Enter a place"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
                <FiMapPin />
                &nbsp;Drop off
              </InputGroup.Text>
              <FormControl
                type="text"
                name="dropoffplace"
                onChange={(e) => handleInputChange(e)}
                value={updatedValue.dropoffplace}
                onFocus={() =>
                  setCurrentReservation({
                    ...setUpdatedValue,
                    dropoffplace: '',
                  })
                }
                placeholder="Enter a place"
                style={{ flex: 2 }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
                <FiMapPin />
                &nbsp;Pick up
              </InputGroup.Text>
              <FormControl
                type="date"
                name="pickupdate"
                style={{ flex: 2 }}
                onChange={(e) => handleInputChange(e)}
                value={updatedValue.pickupdate}
                onFocus={() =>
                  setCurrentReservation({
                    ...setUpdatedValue,
                    pickupdate: '',
                  })
                }
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
                <FiCalendar />
                &nbsp;Drop off
              </InputGroup.Text>
              <FormControl
                type="date"
                name="dropoffdate"
                onChange={(e) => handleInputChange(e)}
                value={updatedValue.dropoffdate}
                onFocus={() =>
                  setCurrentReservation({
                    ...setUpdatedValue,
                    dropoffdate: '',
                  })
                }
                style={{ flex: 2 }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
                <FiCalendar />
                &nbsp;Description
              </InputGroup.Text>
              <FormControl
                type="text"
                name="desc"
                onChange={(e) => handleInputChange(e)}
                value={updatedValue.desc}
                onFocus={() =>
                  setCurrentReservation({
                    ...setUpdatedValue,
                    desc: '',
                  })
                }
                style={{ flex: 2 }}
                placeholder="Description...."
              />
            </InputGroup>
          </Form>

          <div>
            <Button
              variant="primary"
              className="m-1"
              onClick={() => saveChanges()}
            >
              Save
            </Button>
            <Button variant="danger" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReservation;
