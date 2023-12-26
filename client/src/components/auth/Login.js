import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post('http://localhost:7000/login', {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
        Swal.fire('Yes!', `${res.data.msg}`, 'success');
      }
    } catch (error) {
      Swal.fire(
        'Cannot log in',
        'Please check your email or password',
        'warning',
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="home">
      <div className="homepage">
        <div className="login">
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>
              <h1>Login Form</h1>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Link to="/register">Create new user</Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
