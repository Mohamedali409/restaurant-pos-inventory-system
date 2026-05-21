import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const HeaderUsers = ({ onAddUser }) => {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-3">
      <div>
        <h5 className="fw-bold fs-2">Users</h5>
        <p>Manage system users, roles, and permissions</p>
      </div>

      <button className="btn btn-orange" onClick={onAddUser}>
        <FaPlus className="me-2" />
        Add User
      </button>
    </header>
  );
};

export default HeaderUsers;
