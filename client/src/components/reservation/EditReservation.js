import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import vehicles from '../../data/vehicleList';

const EditReservation = ({
  reservation,
  getAllReservations,
  setId,
  id,
  setIsEdit,
}) => {
  const [updatedValue, setUpdatedValue] = useState({
    model: reservation.model,
    pickupplace: reservation.pickupplace,
    dropoffplace: reservation.dropoffplace,
    pickupdate: reservation.pickupdate,
    dropoffdate: reservation.dropoffdate,
    desc: reservation.desc,
    owner: reservation.owner,
  });
  // UPDATE
  function handleInputChange(e) {
    setUpdatedValue({
      ...updatedValue,
      [e.target.name]: e.target.value,
    });
    console.log(updatedValue);
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
    <div className="text-center mt-4 " key={reservation._id}>
      <Form className="form1">
        <Form.Select
          size="lg"
          className="mb-3"
          type="text"
          name="model"
          onChange={(e) => handleInputChange(e)}
          value={updatedValue.model}
          placeholder="enter"
        >
          <option>Select Model</option>
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
            style={{ flex: 2 }}
          />
        </InputGroup>
      </Form>

      <div>
        <Button variant="primary" className="m-1" onClick={() => saveChanges()}>
          Save
        </Button>
        <Button variant="danger" onClick={() => setIsEdit(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditReservation;
