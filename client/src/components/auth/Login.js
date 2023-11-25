import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post('http://localhost:7000/login', {
        email,
        password,
      });
      console.log(res.data);

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
        Swal.fire('Yes!', `${res.data.msg}`, 'success');
      }
    } catch (error) {
      Swal.fire(
        'Cannot log in',
        'please check your email or password',
        'warning',
      );
    }
  }

  return (
    <div className="home ">
      <div className="homepage ">
        <div className="login">
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>
              <h1>Login Form</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Label htmlFor="inputEmail" className="mt-2">
                  Email:
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label htmlFor="inputPassword" className="mt-2">
                  Password:
                </Form.Label>
                <Form.Control
                  id="pass"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-2">
                  <Button type="submit">Login</Button>
                </div>
              </Form>
            </Card.Body>
            <Link to="/register">Create new user</Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
