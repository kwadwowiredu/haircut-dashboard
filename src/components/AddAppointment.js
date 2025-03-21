import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAppointment = ({ addAppointment }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    code: '',
    pin: '',
    service: '',
    date: '',
    time: '',
    barber: '',
    status: 'Upcoming',
  });
  const [showModal, setShowModal] = useState({ visible: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.clientName || !formData.email || !formData.phone) {
        setShowModal({ visible: true, message: 'Please fill in all required fields.' });
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (!formData.service || !formData.date || !formData.time || !formData.barber) {
      setShowModal({ visible: true, message: 'Please fill in all required fields.' });
      return;
    }
    addAppointment(formData);
    navigate('/appointments');
  };

  return (
    <div className="add-appointment">
      <h2>Add New Appointment</h2>
      {step === 1 ? (
        <div className="form-step">
          <h3>Client Information</h3>
          <label>
            Client Name*
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email Address*
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number*
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <div className="form-actions">
            <button onClick={() => navigate('/appointments')}>Cancel</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      ) : (
        <div className="form-step">
          <h3>Appointment Details</h3>
          <label>
            Booking Code
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter booking code..."
            />
          </label>
          <label>
            Booking PIN
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter booking PIN..."
            />
          </label>
          <label>
            Service*
            <select name="service" value={formData.service} onChange={handleChange}>
              <option value="">Select a service</option>
              <option value="Haircut & Styling">Haircut & Styling</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Shave">Shave</option>
            </select>
          </label>
          <label>
            Date*
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Time*
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Barber/Stylist*
            <select name="barber" value={formData.barber} onChange={handleChange}>
              <option value="">Select a barber/stylist</option>
              <option value="John Smith">John Smith</option>
              <option value="Jane Doe">Jane Doe</option>
            </select>
          </label>
          <div className="form-actions">
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={handleSubmit}>Create Appointment</button>
          </div>
        </div>
      )}
      {showModal.visible && (
        <div className="modal">
          <div className="modal-content">
            <p>{showModal.message}</p>
            <button onClick={() => setShowModal({ visible: false, message: '' })}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;