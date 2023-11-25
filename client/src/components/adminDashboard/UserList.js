import React from 'react';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const UserList = ({ getAllUsers, users, setUsers }) => {
  function deleteUser(id) {
    try {
      let result = window.confirm('Are you sure you want to delete this user?');

      if (result) {
        const newUsers = users.map((user) => {
          if (id === user._id) {
            axios
              .delete(`http://localhost:7000/user/${id}`)
              .then((res) => alert('Deleted completed'))
              .then(() => getAllUsers())
              .catch((err) => console.log(err));
          }
          return users;
        });
        console.log('from the delete function', newUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="home">
      <h1>Admin User List</h1>
      <div className="mt-4">
        <div className="text-center">
          <Button variant="primary" onClick={() => getAllUsers()}>
            Users List
          </Button>
        </div>
        <div className="mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User Id</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="cursor-hand">
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (user.email === 'ilhan@gmail.com') {
                          alert("You can't delete this user!");
                        } else {
                          deleteUser(user._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      // onClick={() =>
                      //   updateReservation(reservation._id, reservation)
                      // }
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
