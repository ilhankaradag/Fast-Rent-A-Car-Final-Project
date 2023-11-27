import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import vehicles from '../../data/vehicleList';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDescription } from 'react-icons/md';

const SliderForm = ({ getAllReservations }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  const [reservation, setReservation] = useState({
    model: '',
    pickupplace: '',
    dropoffplace: '',
    pickupdate: '',
    dropoffdate: '',
    desc: '',
    // owner: '',
  });

  const handleInputChange = (e, fieldName) => {
    setReservation({
      ...reservation,
      [fieldName]: e.target.value,
    });
  };

  function addNewReservation(e) {
    try {
      axios
        .post('http://localhost:7000/create', reservation, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(navigate('/reservation/user'))
        .then((res) => {
          getAllReservations();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer mt-4" border="secondary">
      <Form className="form1" onSubmit={addNewReservation}>
        <Form.Select
          size="lg"
          className="mb-3"
          type="text"
          name="model"
          onChange={(e) => handleInputChange(e, 'model')}
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
            onChange={(e) => handleInputChange(e, 'pickupplace')}
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
            onChange={(e) => handleInputChange(e, 'dropoffplace')}
            placeholder="Enter a place"
            style={{ flex: 2 }}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
            <FiCalendar />
            &nbsp;Pick up
          </InputGroup.Text>
          <FormControl
            type="date"
            name="pickupdate"
            style={{ flex: 2 }}
            onChange={(e) => handleInputChange(e, 'pickupdate')}
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
            onChange={(e) => handleInputChange(e, 'dropoffdate')}
            style={{ flex: 2 }}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
            <MdOutlineDescription />
            &nbsp;Description
          </InputGroup.Text>
          <FormControl
            type="text"
            name="desc"
            onChange={(e) => handleInputChange(e, 'desc')}
            style={{ flex: 2 }}
            placeholder="Description...."
          />
        </InputGroup>

        <div className="mt-4">
          <Button size="lg" className="w-100" type="submit">
            CONTINUE RESERVATION
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SliderForm;
