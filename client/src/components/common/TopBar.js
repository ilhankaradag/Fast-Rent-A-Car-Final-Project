import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {
  FiFacebook,
  FiInstagram,
  FiPhoneCall,
  FiTwitter,
  FiYoutube,
  FiUser,
} from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  let token;
  let decoded;

  try {
    token = localStorage.getItem('token');

    if (token) {
      decoded = jwtDecode(token);
    }
    // console.log('Token:', token);
    // console.log('Decoded:', decoded.email);
  } catch (error) {
    console.log('Invalid token', error);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem('token');
      navigate('/home');
      window.location.reload();
    } else {
      return;
    }
  }
  return (
    <div>
      {!token && (
        <div className="topbar">
          <Container>
            <Row>
              <Col xs={7}>
                <FiPhoneCall size={16} />
                <span className="d-none d-md-inline">CALL US</span> +31 6 235
                987 95
              </Col>
              <Col xs={5}>
                <ul>
                  <li className="d-none d-md-block">
                    <FiYoutube />
                  </li>
                  <li className="d-none d-md-block">
                    <FiFacebook />
                  </li>
                  <li className="d-none d-md-block">
                    <FiTwitter />
                  </li>
                  <li className="d-none d-md-block">
                    <FiInstagram />
                  </li>
                  <li className="d-none d-md-block">
                    <Button href="/login">
                      <FiUser />
                      Login
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {token && (
        <div className="topbar">
          <Container>
            <Row>
              <Col xs={7}>
                <FiPhoneCall size={16} />
                <span className="d-none d-md-inline">CALL US</span> +31 62222 22
              </Col>
              <Col xs={5}>
                <ul>
                  <li className="d-none d-md-block">
                    <FiYoutube />
                  </li>
                  <li className="d-none d-md-block">
                    <FiFacebook />
                  </li>
                  <li className="d-none d-md-block">
                    <FiTwitter />
                  </li>
                  <li className="d-none d-md-block">
                    <FiInstagram />
                  </li>
                  <li className="d-none d-md-block">
                    <Button href="/login">{decoded.email}</Button>
                  </li>
                  <li className="d-none d-md-block">
                    <Button href="/login" onClick={handleLogout}>
                      <RiLogoutCircleLine />
                      Log out
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default TopBar;
