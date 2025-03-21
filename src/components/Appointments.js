import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { Link } from 'react-router-dom';

const Appointments = ({ appointments, setAppointments }) => {
  const [searchCode, setSearchCode] = useState('');
  const [searchPin, setSearchPin] = useState('');

  const filteredAppointments = appointments
    .filter((appt) => appt.status !== 'Completed' && appt.status !== 'Cancelled') // Exclude Completed and Cancelled
    .filter((appt) => {
      const matchesCode = searchCode ? appt.code.includes(searchCode) : true;
      const matchesPin = searchPin ? appt.pin.includes(searchPin) : true;
      return matchesCode && matchesPin;
    });

  return (
    <div className="appointments">
      <div className="header">
        <h1>All Appointments</h1>
        <Link to="/add-appointment">
          <button className="add-appointment-btn">
            <div className='add-appt'>
              <i className='material-icons'>add</i>
              Add Appointment
            </div>
          </button>
        </Link>
      </div>
      <div className="search-bar-main">
        <h5>Search by Appointment Code</h5>
        <div className='search-bar'>
          <input
            type="text"
            placeholder="Enter booking code..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter PIN..."
            value={searchPin}
            onChange={(e) => setSearchPin(e.target.value)}
          />
        </div>
      </div>
      <div className="appointment-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              setAppointments={setAppointments}
            />
          ))
        ) : (
          <p>No active appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;