import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { MdOutlineDescription } from 'react-icons/md';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import vehicles from '../../data/vehicleList';

const SliderForm = ({ getAllReservations }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  const validationSchema = Yup.object().shape({
    model: Yup.string().required('Car model is required'),
    pickupplace: Yup.string().required('Pick up place is required'),
    dropoffplace: Yup.string().required('Drop off place is required'),
    pickupdate: Yup.date().required('Pick up date is required'),
    dropoffdate: Yup.date().required('Drop off date is required'),
    desc: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('https://fast-rent-a-car.onrender.com/create', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/reservation/user');
      getAllReservations();
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <div className="formContainer mt-4">
      <Formik
        initialValues={{
          model: '',
          pickupplace: '',
          dropoffplace: '',
          pickupdate: '',
          dropoffdate: '',
          desc: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Car Model */}
            <div className="mb-3">
              <Field as="select" name="model" className="form-control">
                <option value="" disabled>
                  Select a car
                </option>
                {vehicles.map((vehicle) => (
                  <option value={vehicle.model} key={vehicle.id}>
                    {vehicle.model}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="model"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Pick up place */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FiMapPin />
                &nbsp;Pick up
              </InputGroup.Text>
              <Field
                type="text"
                name="pickupplace"
                as={FormControl}
                placeholder="Enter a place"
              />
              <ErrorMessage
                name="pickupplace"
                component="div"
                className="text-danger"
              />
            </InputGroup>

            {/* Drop off place */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">
                <FiMapPin />
                &nbsp;Drop off
              </InputGroup.Text>
              <Field
                type="text"
                name="dropoffplace"
                as={FormControl}
                placeholder="Enter a place"
              />
              <ErrorMessage
                name="dropoffplace"
                component="div"
                className="text-danger"
              />
            </InputGroup>

            {/* Pick up date */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                <FiCalendar />
                &nbsp;Pick up
              </InputGroup.Text>
              <Field type="date" name="pickupdate" as={FormControl} />
              <ErrorMessage
                name="pickupdate"
                component="div"
                className="text-danger"
              />
            </InputGroup>

            {/* Drop off date */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon4">
                <FiCalendar />
                &nbsp;Drop off
              </InputGroup.Text>
              <Field type="date" name="dropoffdate" as={FormControl} />
              <ErrorMessage
                name="dropoffdate"
                component="div"
                className="text-danger"
              />
            </InputGroup>

            {/* Description */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon5">
                <MdOutlineDescription />
                &nbsp;Description
              </InputGroup.Text>
              <Field
                type="text"
                name="desc"
                as={FormControl}
                placeholder="Description...."
              />
            </InputGroup>

            {/* Submit Button */}
            <div className="mt-4">
              <Button size="lg" className="w-100" type="submit">
                CONTINUE RESERVATION
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SliderForm;
