import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import AddAppointment from './components/AddAppointment';
import Settings from './components/Settings';
import Clients from './components/Clients';
import Services from './components/Services';
import History from './components/History';
import Login from './components/Login'; // Import the Login component
import './App.css';

function App() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [
      { id: Date.now(), ...newAppointment },
      ...prevAppointments,
    ]);
  };

  const activeAppointmentsCount = appointments.filter(
    (appt) => appt.status !== 'Completed' && appt.status !== 'Cancelled'
  ).length;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <>
            <Sidebar totalAppointments={activeAppointmentsCount} handleLogout={handleLogout} />
            <div className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard appointments={appointments} setAppointments={setAppointments} />}
                />
                <Route
                  path="/appointments"
                  element={<Appointments appointments={appointments} setAppointments={setAppointments} />}
                />
                <Route
                  path="/add-appointment"
                  element={<AddAppointment addAppointment={addAppointment} />}
                />
                <Route
                  path="/settings"
                  element={<Settings />}
                />
                <Route
                  path="/clients"
                  element={<Clients />}
                />
                <Route
                  path="/services"
                  element={<Services />}
                />
                <Route
                  path="/history"
                  element={<History appointments={appointments} />}
                />
                <Route
                  path="/login"
                  element={<Navigate to="/" />}
                />
                <Route
                  path="/logout"
                  element={<Navigate to="/login" />}
                />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="*"
              element={<Navigate to="/login" />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;