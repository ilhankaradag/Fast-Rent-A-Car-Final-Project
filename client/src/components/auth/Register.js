import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, Button } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        'https://fast-rent-a-car.onrender.com/register',
        {
          email: values.email,
          password: values.password,
          username: values.username,
        },
      );
      Swal.fire('Good job!', `${res.data.msg}`, 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', 'Failed to register', 'error');
    }
    setSubmitting(false);
  };

  return (
    <div className="home">
      <div className="homepage">
        <div className="register">
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>
              <h1>Sign Up Form</h1>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">User Name:</label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mt-2">
                      <Button type="submit">Sign up</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
