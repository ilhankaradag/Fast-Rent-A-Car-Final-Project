import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SliderForm from './SliderForm';
import SliderCarousel from './SliderCarousel';
const Slider = ({ getAllReservation }) => {
  return (
    <div className="slider">
      <Container>
        <Row>
          <Col lg={{ span: 7, order: 'first' }}>
            <SliderCarousel />
          </Col>
          <Col lg={{ span: 5, order: 'last' }}>
            <SliderForm getAllReservation={getAllReservation} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Slider;
