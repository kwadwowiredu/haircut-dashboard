import React, { useState } from 'react';

const Settings = () => {
  const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || 'Admin User');
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem('profilePicture') || 'https://via.placeholder.com/100'
  );

  const handleNameChange = (e) => {
    setAdminName(e.target.value);
    localStorage.setItem('adminName', e.target.value);
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('profilePicture', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="profile-section">
        <h2>Profile</h2>
        <div className="profile-picture">
          <img
            src={profilePicture}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <input type="file" accept="image/*" onChange={handleProfileUpload} />
        </div>
        <label>
          Admin Name:
          <input type="text" value={adminName} onChange={handleNameChange} />
        </label>
      </div>
    </div>
  );
};

export default Settings;