import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';

const History = ({ appointments, setAppointments }) => {
  const [expandedDate, setExpandedDate] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const appointmentsByDate = appointments
    .filter((appt) => appt.date < today)
    .reduce((acc, appt) => {
      const date = appt.date;
      if (!acc[date]) {
        acc[date] = { total: 0, completed: 0, cancelled: 0, appointments: [] };
      }
      acc[date].total += 1;
      if (appt.status === 'Completed') {
        acc[date].completed += 1;
      } else if (appt.status === 'Cancelled') {
        acc[date].cancelled += 1;
      }
      acc[date].appointments.push(appt);
      return acc;
    }, {});

  const historyData = Object.keys(appointmentsByDate)
    .sort((a, b) => new Date(b) - new Date(a))
    .map((date) => ({
      date,
      total: appointmentsByDate[date].total,
      completed: appointmentsByDate[date].completed,
      cancelled: appointmentsByDate[date].cancelled,
      appointments: appointmentsByDate[date].appointments,
    }));

  return (
    <div className="history">
      <div className="header">
        <h1>Appointment History</h1>
      </div>
      {historyData.length > 0 ? (
        <div className="history-list">
          {historyData.map((entry) => (
            <div key={entry.date} className="history-card">
              <div
                className="history-header"
                onClick={() => setExpandedDate(expandedDate === entry.date ? null : entry.date)}
                style={{ cursor: 'pointer' }}
              >
                <h3>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <p><strong>Total Booked:</strong> {entry.total}</p>
                <p><strong>Completed:</strong> {entry.completed}</p>
                <p><strong>Cancelled:</strong> {entry.cancelled}</p>
              </div>
              {expandedDate === entry.date && (
                <div className="history-details">
                  {entry.appointments.map((appt) => (
                    <AppointmentCard
                      key={appt.id}
                      appointment={appt}
                      setAppointments={setAppointments}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No appointment history available for previous days.</p>
      )}
    </div>
  );
};

export default History;