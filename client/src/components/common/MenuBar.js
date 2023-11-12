import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import {
  RiHome5Line,
  RiShape2Fill,
  RiInformationLine,
  RiHeadphoneLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <Navbar expand="md" className="menubar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} width={'50px'} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/home">
              <RiHome5Line /> Home
            </Nav.Link>
            <Nav.Link href="/reservation">
              <RiShape2Fill /> Reservation
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
  );
};

export default MenuBar;
