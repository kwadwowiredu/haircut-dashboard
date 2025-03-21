import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ totalAppointments }) => {
  // Format the count: show "99+" if count is 99 or greater
  const displayCount = totalAppointments >= 99 ? '99+' : totalAppointments;

  return (
    <div className="sidebar">
      <div className="logo">CutQUEUE</div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">calendar_month</i>
              <span>Appointments</span>
              <span className="appointment-count">{totalAppointments}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">history</i>
              <span>History</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">groups</i>
              <span>Clients</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">content_cut</i>
              <span>Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <i className="material-icons">settings</i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="logout">
        <NavLink
          to="/logout"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;