import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    let res = await axios.post('http://localhost:7000/register', {
      email,
      password,
      username,
    });
    Swal.fire('Good job!', `${res.data.msg}`, 'success');
    navigate('/login');
  }
  return (
    <div className="home">
      <div className="homepage">
        <div className="register ">
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>
              <h1>Sign Up Form</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleRegister}>
                <Form.Label htmlFor="inputUsername" className="mt-2">
                  User Name:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="user"
                  id="userName"
                  placeholder="Enter your user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Label htmlFor="inputEmail" className="mt-2">
                  Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label htmlFor="inputPassword" className="mt-2">
                  Password:
                </Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="mt-2">
                  <Button type="submit">Sign up</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
