import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const HeaderCustomers = () => {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-3">
      <div>
        <h5 className="fw-bold fs-2">Customers</h5>
        <p>Manage customer details, view order history and contact information</p>
      </div>

      <button className="btn btn-orange">
        <FaPlus className="me-2" />
        Add Customer
      </button>
    </header>
  );
};

export default HeaderCustomers;
