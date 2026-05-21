import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderOrders = () => {
  const navigate = useNavigate();

  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded">
      <div>
        <h5 className="fw-bold fs-2">Orders</h5>
        <p>Manage and view all customer orders</p>
      </div>

      <button className="btn btn-orange" onClick={() => navigate('/POS')}>
        <FaPlus className="me-2" />
        Create Order
      </button>
    </header>
  );
};

export default HeaderOrders;
