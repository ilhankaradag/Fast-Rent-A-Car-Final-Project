import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/img/logo1.png';
import {
  RiHome5Line,
  RiShape2Fill,
  RiInformationLine,
  RiHeadphoneLine,
  RiAdminLine,
} from 'react-icons/ri';
import { BsListCheck } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  let token;
  let decoded;

  try {
    token = localStorage.getItem('token');

    if (token) {
      decoded = jwtDecode(token);
    }
    // console.log('Token:', token);
    // console.log('Decoded:', decoded.role);
  } catch (error) {
    console.log('Invalid token', error);
  }

  return (
    <div>
      {!token && (
        <Navbar expand="md" className="menubar">
          <Container>
            <Navbar.Brand as={Link} to="/home">
              <Image src={logo} width={'150px'} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">
                  <RiHome5Line /> Home
                </Nav.Link>
                {/* <Nav.Link href="/reservation">
                  <RiShape2Fill /> Reservation
                </Nav.Link> */}
                <Nav.Link href="/vehicles">
                  <RiInformationLine /> Vehicles
                </Nav.Link>
                <Nav.Link href="/about">
                  <RiInformationLine /> About Us
                </Nav.Link>
                <Nav.Link href="/contact">
                  <RiHeadphoneLine /> Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      {token && decoded.role === 'user' ? (
        <Navbar expand="md" className="menubar">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <Image src={logo} width={'150px'} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">
                  <RiHome5Line /> Home
                </Nav.Link>
                <Nav.Link href="/reservation">
                  <RiShape2Fill /> Reservation
                </Nav.Link>
                <Nav.Link href="/vehicles">
                  <RiInformationLine /> Vehicles
                </Nav.Link>
                <Nav.Link href="/reservation/user">
                  <BsListCheck /> Reservation User List
                </Nav.Link>
                <Nav.Link href="/about">
                  <RiInformationLine /> About Us
                </Nav.Link>
                <Nav.Link href="/contact">
                  <RiHeadphoneLine /> Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null}
      {token && decoded.role === 'admin' ? (
        <Navbar expand="md" className="menubar">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <Image src={logo} width={'150px'} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">
                  <RiHome5Line /> Home
                </Nav.Link>
                <Nav.Link href="/reservation">
                  <RiShape2Fill /> Reservation
                </Nav.Link>
                <Nav.Link href="/vehicles">
                  <RiInformationLine /> Vehicles
                </Nav.Link>
                <Nav.Link href="/reservation/user">
                  <BsListCheck /> Reservation User List
                </Nav.Link>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/reservation/admin">
                    <GrUserAdmin /> Reservation Admin List
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/users">
                    <RiAdminLine /> Users List
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="/reservation/admin">
                  <GrUserAdmin /> Reservation Admin List
                </Nav.Link>
                <Nav.Link href="/users">
                  <RiAdminLine /> Users List
                </Nav.Link> */}
                <Nav.Link href="/about">
                  <RiInformationLine /> About Us
                </Nav.Link>
                <Nav.Link href="/contact">
                  <RiHeadphoneLine /> Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null}
    </div>
  );
};

export default MenuBar;
