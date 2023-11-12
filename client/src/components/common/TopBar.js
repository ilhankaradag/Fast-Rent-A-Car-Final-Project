import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {
  FiFacebook,
  FiInstagram,
  FiPhoneCall,
  FiTwitter,
  FiYoutube,
  FiUser,
} from 'react-icons/fi';

const TopBar = () => {
  return (
    <div>
      <div className="topbar">
        <Container>
          <Row>
            <Col xs={7}>
              <FiPhoneCall size={16} />
              <span className="d-none d-md-inline">CALL US</span> +31 6 235 987
              95
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
    </div>
  );
};

export default TopBar;
