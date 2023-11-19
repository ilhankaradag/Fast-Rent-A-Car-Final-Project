import axios from 'axios';
import '../src/assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/common/MenuBar';
import TopBar from './components/common/TopBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Reservation from './components/reservation/Reservation';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useState, useEffect, useCallback } from 'react';
import ListAdminReservation from './components/reservation/ListAdminReservation';

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({
    model: '',
    pickupplace: '',
    dropoffplace: '',
    pickupdate: '',
    dropoffdate: '',
    desc: '',
    // owner: '',
  });

  // function getAllReservations() {
  //   try {
  //     axios
  //       .get('http://localhost:7000/reservation')
  //       .then((res) => {
  //         setReservations(res.data);
  //         console.log('ALL', res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const getAllReservations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:7000/reservation');
      setReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <BrowserRouter>
      <TopBar />
      <MenuBar />
      <Routes>
        <Route path="/home" element={<Home />} />
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
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
