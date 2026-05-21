import { useState } from 'react';

const HeaderInventory = ({ activeFilter, setActiveFilter }) => {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-3">
      <div>
        <h5 className="fw-bold fs-2">Inventory</h5>
        <p>Manage product stock levels and view inventory status</p>
      </div>

      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveFilter('all')}
        >
          All Inventory
        </button>
        <button
          type="button"
          className={`btn ${activeFilter === 'low-stock' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setActiveFilter('low-stock')}
        >
          Low Stock
        </button>
        <button
          type="button"
          className={`btn ${activeFilter === 'out-of-stock' ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => setActiveFilter('out-of-stock')}
        >
          Out of Stock
        </button>
      </div>
    </header>
  );
};

export default HeaderInventory;
