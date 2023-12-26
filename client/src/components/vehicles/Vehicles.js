import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import VehiclesData from '../../data/vehicleList';
import { Table } from 'react-bootstrap';

import './style.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { FiCheck, FiX } from 'react-icons/fi';

const vehicles = () => {
  return (
    <div className="home">
      <h1>Vehicles</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {VehiclesData.map((vehicle, index) => (
          <SwiperSlide key={index}>
            <img src={vehicle.image} />
            <p>{vehicle.model}</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={2}>
                    <h3>€ {vehicle.pricePerDay} per day</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="50%">Model</td>
                  <td>{vehicle.model}</td>
                </tr>
                <tr>
                  <td>Doors</td>
                  <td>{vehicle.doors}</td>
                </tr>
                <tr>
                  <td>Seats</td>
                  <td>{vehicle.seats}</td>
                </tr>
                <tr>
                  <td>Luggage</td>
                  <td>{vehicle.luggage}</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{vehicle.transmission}</td>
                </tr>
                <tr>
                  <td>Air Conditioning</td>
                  <td>{vehicle.airConditioning ? <FiCheck /> : <FiX />}</td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{vehicle.fuelType}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{vehicle.age}</td>
                </tr>
              </tbody>
            </Table>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default vehicles;
