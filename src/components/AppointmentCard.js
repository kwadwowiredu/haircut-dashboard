import React, { useState } from 'react';

const AppointmentCard = ({ appointment, setAppointments }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({ ...appointment });
  const [showConfirmModal, setShowConfirmModal] = useState({ visible: false, action: '' });

  const handleConfirmModal = (action) => {
    setShowConfirmModal({ visible: true, action });
  };

  const handleAction = (action) => {
    if (action === 'complete') {
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointment.id ? { ...appt, status: 'Completed' } : appt
        )
      );
    } else if (action === 'cancel') {
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointment.id ? { ...appt, status: 'Cancelled' } : appt
        )
      );
    }
    setShowConfirmModal({ visible: false, action: '' });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointment.id ? { ...editedAppointment } : appt
      )
    );
    setEditMode(false);
  };

  const handleChange = (e) => {
    setEditedAppointment({ ...editedAppointment, [e.target.name]: e.target.value });
  };

  const isEditable = appointment.status !== 'Completed' && appointment.status !== 'Cancelled';

  return (
    <div className="appointment-card">
      <div
        className="card-header"
        onClick={() => setShowDetails(!showDetails)}
        style={{ cursor: 'pointer' }}
      >
        <div className="client-info">
          <span className="avatar" style={{ backgroundColor: '#e0f7fa' }}>
            {appointment.clientName[0]}
          </span>
          <div>
            <h4>{appointment.clientName}</h4>
            <div className='style-icon'>
              <i className='material-icons'>content_cut</i>
              {appointment.service}
            </div>
          </div>
        </div>
        <div className="appointment-details">
          <p>
            <i className='material-icons'>calendar_today</i>{' '}
            {new Date(appointment.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p>
            <i className='material-icons'>schedule</i>{' '}
            {appointment.time}
          </p>
          <p>
            <i className='material-icons'>person</i>{' '}
            {appointment.barber}
          </p>
          <span className="status">{appointment.status}</span>
        </div>
      </div>
      {showDetails && (
        <div className="card-body">
          <div className="card-details">
            <div className="client-details">
              <h4>Client Details</h4>
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="clientName"
                    value={editedAppointment.clientName}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedAppointment.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedAppointment.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="service"
                    value={editedAppointment.service}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    name="date"
                    value={editedAppointment.date}
                    onChange={handleChange}
                  />
                  <input
                    type="time"
                    name="time"
                    value={editedAppointment.time}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="barber"
                    value={editedAppointment.barber}
                    onChange={handleChange}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel Edit</button>
                </>
              ) : (
                <>
                  <p><strong>Email: </strong>{appointment.email}</p>
                  <p><strong>Phone: </strong>{appointment.phone}</p>
                </>
              )}
            </div>
            <div className="validation-details">
              <h4>Appointment Validation</h4>
              <p><strong>Code: </strong>{appointment.code}</p>
              <p><strong>PIN: </strong>{appointment.pin}</p>
            </div>
          </div>
          <div className="card-actions">
            {(appointment.status === 'Upcoming' || appointment.status === 'Pending') && (
              <>
                <button className="confirm-btn" onClick={() => handleConfirmModal('complete')}>
                  Confirm
                </button>
                <button
                  className="edit-btn"
                  onClick={handleEdit}
                  disabled={!isEditable}
                  style={{ opacity: isEditable ? 1 : 0.5, cursor: isEditable ? 'pointer' : 'not-allowed' }}
                >
                  Edit
                </button>
                <button className="cancel-btn" onClick={() => handleConfirmModal('cancel')}>
                  Cancel
                </button>
              </>
            )}
          </div>
          <button className="close-btn" onClick={() => setShowDetails(false)}>
            ×
          </button>
        </div>
      )}
      {showConfirmModal.visible && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to {showConfirmModal.action} this appointment?</p>
            <button onClick={() => handleAction(showConfirmModal.action)}>Yes</button>
            <button onClick={() => setShowConfirmModal({ visible: false, action: '' })}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;