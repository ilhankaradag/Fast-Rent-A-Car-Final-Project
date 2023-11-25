import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import about from '../../assets/img/about-img.jpg';

const About = () => {
  return (
    <div className="home">
      <h1>About</h1>
      <Container>
        <Row>
          <Col lg={6}>
            <Image src={about} className="img-fluid" alt="About Us" />
          </Col>
          <Col lg={6}>
            <h3>Mission: </h3>
            <p>
              Our mission at Fast Rent a Car is to provide our customers with
              the fastest, most reliable, and comfortable car rental experience.
              We aim to welcome each customer with satisfaction, offering a
              seamless and enjoyable travel experience through our extensive
              fleet of vehicles and commitment to quality service. By being
              responsive to the needs of our passengers and providing
              environmentally friendly and innovative solutions, we strive to be
              a leader in the industry.
            </p>
            <hr />
            <h3>Vision: </h3>
            <p>
              Fast Rent a Car envisions becoming a leading and trusted brand in
              the industry. We seek to utilize advancing technology effectively
              to provide innovative solutions to our customers, embrace
              sustainability and environmental consciousness, support the
              continuous development of our employees, and contribute to our
              community.
            </p>
            <hr />
            <h3>Objectives: </h3>
            <p>
              <h6>Customer Satisfaction:</h6> Our goal is to maximize customer
              satisfaction by continuously improving the quality of our services
              and valuing customer feedback.
              <br />
              <h6>Expansion:</h6> As Fast Rent a Car, we aim to expand our
              service network, reaching more regions and cities to better serve
              our customers. <br />
              <h6>Utilizing Technology:</h6> Keeping up with the latest
              technological advancements in the industry, we aim to continually
              update our online reservation system to provide customers with a
              faster and more convenient booking experience. <br />
              <h6>Environmentally Friendly Policies:</h6> Focusing on minimizing
              our environmental impact, we aim to update our vehicle fleet by
              choosing eco-friendly and energy-efficient vehicles.
              <br />
              <h6>Employee Development:</h6> By supporting the continuous
              development of our employees through training and motivation
              programs, we aim to maximize their professional potential.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
