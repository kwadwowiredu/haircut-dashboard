import React, { useState } from 'react';

const History = ({ appointments }) => {
  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11 (January is 0)

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // List of months for the dropdown
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate years for the dropdown (e.g., from 2020 to current year)
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

  // Filter appointments for the selected month and year, excluding today
  const todayStr = today.toISOString().split('T')[0];
  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    return (
      apptDate.getFullYear() === selectedYear &&
      apptDate.getMonth() === selectedMonth &&
      appt.date < todayStr // Exclude today's appointments
    );
  });

  // Group appointments by date
  const appointmentsByDate = filteredAppointments.reduce((acc, appt) => {
    const date = appt.date;
    if (!acc[date]) {
      acc[date] = { total: 0, completed: 0, cancelled: 0 };
    }
    acc[date].total += 1;
    if (appt.status === 'Completed') {
      acc[date].completed += 1;
    } else if (appt.status === 'Cancelled') {
      acc[date].cancelled += 1;
    }
    return acc;
  }, {});

  // Convert grouped data into an array for rendering
  const historyData = Object.keys(appointmentsByDate)
    .sort((a, b) => new Date(b) - new Date(a)) // Sort by date, most recent first
    .map((date) => ({
      date,
      total: appointmentsByDate[date].total,
      completed: appointmentsByDate[date].completed,
      cancelled: appointmentsByDate[date].cancelled,
    }));

  // Calculate monthly summary
  const monthlySummary = filteredAppointments.reduce(
    (acc, appt) => {
      acc.total += 1;
      if (appt.status === 'Completed') {
        acc.completed += 1;
      } else if (appt.status === 'Cancelled') {
        acc.cancelled += 1;
      }
      return acc;
    },
    { total: 0, completed: 0, cancelled: 0 }
  );

  return (
    <div className="history">
      <div className="header">
        <h1>Appointment History</h1>
        <div className="month-selector">
          <select
            value={`${selectedMonth}-${selectedYear}`}
            onChange={(e) => {
              const [month, year] = e.target.value.split('-').map(Number);
              setSelectedMonth(month);
              setSelectedYear(year);
            }}
          >
            {years.map((year) =>
              months.map((month, index) => (
                <option key={`${index}-${year}`} value={`${index}-${year}`}>
                  {month} {year}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Bookings</th>
              <th>Completed</th>
              <th>Cancelled</th>
            </tr>
          </thead>
          <tbody>
            {historyData.length > 0 ? (
              historyData.map((entry) => (
                <tr key={entry.date}>
                  <td>
                    <i className='material-icons'>calendar_month</i>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='p-1'>{entry.total}</td>
                  <td className='p-2'>{entry.completed}</td>
                  <td className='p-3'>{entry.cancelled}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No appointments for this month.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="monthly-summary">
        <h2>Monthly Summary</h2>
        <div className="summary-stats">
          <div className="summary-card total">
            <h3>Total Appointments</h3>
            <p className='p-one'>{monthlySummary.total}</p>
          </div>
          <div className="summary-card completed">
            <h3>Completed</h3>
            <p className='p-two'>{monthlySummary.completed}</p>
          </div>
          <div className="summary-card cancelled">
            <h3>Cancelled</h3>
            <p className='p-three'>{monthlySummary.cancelled}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;