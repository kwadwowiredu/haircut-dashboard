import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';

const Dashboard = ({ appointments, setAppointments }) => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]); // State for today

  // Update 'today' every minute to check if the date has changed
  useEffect(() => {
    const interval = setInterval(() => {
      const newToday = new Date().toISOString().split('T')[0];
      if (newToday !== today) {
        setToday(newToday);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [today]);

  // Load admin name and profile picture from localStorage
  const adminName = localStorage.getItem('adminName') || 'Admin User';
  const profilePicture = localStorage.getItem('profilePicture') || 'https://via.placeholder.com/40';

  // Calculate stats
  const todaysAppointments = appointments.filter(
    (appt) => appt.date === today && appt.status === 'Upcoming'
  );
  const pendingConfirmation = appointments.filter(
    (appt) => appt.status === 'Pending'
  );
  const completedToday = appointments.filter(
    (appt) => appt.date === today && appt.status === 'Completed'
  );
  const cancelled = appointments.filter(
    (appt) => appt.status === 'Cancelled'
  );

  // Sort and limit upcoming appointments to 5, with latest first
  const upcomingAppointments = appointments
    .filter((appt) => appt.status === 'Upcoming')
    .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="user">
          <span>{adminName}</span>
          <img src={profilePicture} alt="Profile" className="profile-pic" />
        </div>
      </div>
      <div className="stats">
        <div className="stat-card" onClick={() => setSelectedStat('today')}>
          <div className='stat-display'>
            <i className='material-icons display-1'>calendar_month</i>
            <h3>Today's Appointments</h3>
          </div>
          <p className='p-one'>{todaysAppointments.length}</p>
        </div>
        <div className="stat-card" onClick={() => setSelectedStat('completed')}>
          <div className='stat-display'>
            <i className='material-icons display-2'>task_alt</i>
            <h3>Completed Today</h3>
          </div>
          <p className='p-two'>{completedToday.length}</p>
        </div>
        <div className="stat-card" onClick={() => setSelectedStat('cancelled')}>
          <div className='stat-display'>
            <i className='material-icons display-3'>cancel</i>
            <h3>Cancelled</h3>
          </div>
          <p className='p-three'>{cancelled.length}</p>
        </div>
      </div>
      {selectedStat && (
        <div className="stat-details">
          <button className="close-btn" onClick={() => setSelectedStat(null)}>
            ×
          </button>
          <h2>
            {selectedStat === 'today'
              ? "Today's Appointments"
              : selectedStat === 'completed'
              ? 'Completed Today'
              : 'Cancelled'}
          </h2>
          {selectedStat === 'today' &&
            todaysAppointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                setAppointments={setAppointments}
              />
            ))}
          {selectedStat === 'completed' &&
            completedToday.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                setAppointments={setAppointments}
              />
            ))}
          {selectedStat === 'cancelled' && (
            <>
              <div className="stat-actions">
                <button
                  className="clear-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all cancelled appointments?')) {
                      setAppointments((prev) =>
                        prev.filter((appt) => appt.status !== 'Cancelled')
                      );
                      setSelectedStat(null); // Close the section after clearing
                    }
                  }}
                >
                  Clear All
                </button>
              </div>
              {cancelled.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  appointment={appt}
                  setAppointments={setAppointments}
                />
              ))}
            </>
          )}
        </div>
      )}
      <div className="upcoming-appointments">
        <h2>Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              setAppointments={setAppointments}
            />
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;