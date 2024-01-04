import axios from 'axios';
import '../src/assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/common/MenuBar';
import TopBar from './components/common/TopBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reservation from './components/reservation/Reservation';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useState, useEffect, useCallback } from 'react';
import ListAdminReservation from './components/reservation/ListAdminReservation';
import HomePage from './components/home/HomePage';
import Footer from './components/common/Footer';
import UserList from './components/adminDashboard/UserList';
import Vehicles from './components/vehicles/Vehicles';
import ListReservation from './components/reservation/ListReservation';

function App() {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservation, setReservation] = useState({
    // model: '',
    // pickupplace: '',
    // dropoffplace: '',
    // pickupdate: '',
    // dropoffdate: '',
    // desc: '',
    // owner: '',
  });

  const getAllReservations = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://fast-rent-a-car.onrender.com/reservation',
      );
      setReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function getAllUsers() {
    try {
      axios
        .get('https://fast-rent-a-car.onrender.com/users')
        .then((res) => {
          setUsers(res.data);
          console.log('ALL', res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllReservations();
    getAllUsers();
  }, []);

  return (
    <BrowserRouter>
      <TopBar />
      <MenuBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/reservation"
          element={
            <Reservation
              reservation={reservation}
              reservations={reservations}
              setReservation={setReservation}
              getAllReservations={getAllReservations}
            />
          }
        />
        <Route
          path="/reservation/admin"
          element={
            <ListAdminReservation
              reservation={reservation}
              reservations={reservations}
              setReservation={setReservation}
              getAllReservations={getAllReservations}
              users={users}
              setUsers={setUsers}
              getAllUsers={getAllUsers}
            />
          }
        />
        <Route
          path="/reservation/user"
          element={
            <ListReservation
              reservation={reservation}
              reservations={reservations}
              setReservation={setReservation}
              getAllReservations={getAllReservations}
              users={users}
              setUsers={setUsers}
              getAllUsers={getAllUsers}
            />
          }
        />
        <Route
          path="/users"
          element={
            <UserList
              getAllUsers={getAllUsers}
              users={users}
              setUsers={setUsers}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
