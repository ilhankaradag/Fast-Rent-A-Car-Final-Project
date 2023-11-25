import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const EmailForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_itwidp7',
        'template_bd3eli1',
        form.current,
        'tiCOq7koeD2ghAd35',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
        alert('Email send'),
      );
    e.target.reset();
  };
  return (
    <Container>
      <Row>
        <Col lg={6}>
          {' '}
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Enter your name"
                size="lg"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                placeholder="name@example.com"
                size="lg"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="message"
                placeholder="Enter your message"
                size="lg"
              />
            </Form.Group>
            <Button size="lg" className="w-100" type="submit" value="Send">
              SEND
            </Button>
          </Form>
        </Col>
        <Col lg={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.3807052715392!2d6.561489275866482!3d53.21102198484127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9cd534ba57e77%3A0xf04c895d20845efe!2sStation%20Groningen!5e0!3m2!1snl!2snl!4v1700941983567!5m2!1snl!2snl"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailForm;
