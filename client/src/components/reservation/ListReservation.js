import React from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const ListReservation = ({
  reservation,
  setReservation,
  reservations,
  getAllReservations,
}) => {
  // Delete part
  // function deleteReservation(id) {
  //   console.log(reservations);
  //   console.log(id);
  //   try {
  //     axios
  //       .delete(`http://localhost:7000/${id}`)
  //       .then(() => {
  //         getAllReservations();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  function deleteReservation(id) {
    try {
      let result = window.confirm(
        'Are you sure you want to delete this reservation?',
      );

      if (result) {
        const newReservations = reservations.map((reservation) => {
          if (id === reservation._id) {
            axios
              .delete(`http://localhost:7000/${id}`)
              .then((res) => alert('Deleted complet'))
              .then(() => getAllReservations())
              .catch((err) => console.log(err));
          }
          return reservations;
        });
        console.log('from the delete function', newReservations);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-4">
      <div className="text-center">
        <Button variant="primary" onClick={() => getAllReservations()}>
          Reservation List
        </Button>
      </div>
      <div className="mt-4">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>Pick Up</th>
              <th>Drop Off</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((item, index) => (
              <tr key={index} className="cursor-hand">
                <td>{index + 1}</td>
                <td>{item.model}</td>
                <td>
                  {item.pickupplace}
                  <br />
                  {item.pickupdate}
                </td>
                <td>
                  {item.dropoffplace}
                  <br />
                  {item.dropoffdate}
                </td>
                <td>{item.desc}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteReservation(item._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button variant="warning">Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListReservation;
