import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import styles from '../ProductPages/ProductTable.module.css';
import UpdateOrder from './UpdateOrder';

export default function TableOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        // Trying /order first, fall back to /orders if needed in future
        const res = await axiosInstance.get('/order');
        console.log("Orders response:", res.data);
        const fetchedOrders = res.data?.orders || res.data?.order || res.data?.data || res.data;
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // handle edit
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this order?")) return;
      await axiosInstance.delete(`/order/${id}`);

      setOrders((prev) =>
        prev.filter((o) => o._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert('Failed to delete order');
    }
  };

  return (
    <div className={styles.card}>
      <table className="table align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Payment</th>
            <th>Total Items</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading orders...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((item) => (
              <tr key={item._id}>
                <td>{item._id?.slice(-6).toUpperCase()}</td>
                <td>{item.customerName || 'Walk-in'}</td>
                <td>
                  <span className={styles.badgeLight}>
                    {item.orderType || 'N/A'}
                  </span>
                </td>
                <td>{item.paymentMethod}</td>
                <td>{item.items?.length || 0}</td>
                <td>
                  <span className={`${styles.status} ${item.status === 'cancelled' ? 'text-danger' : ''}`}>
                    {item.status || 'pending'}
                  </span>
                </td>
                <td>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={`${styles.icon} ${styles.edit}`}
                      title="Edit / Update Status"
                      onClick={() => handleEdit(item)}
                    />
                    <FaTrash
                      className={`${styles.icon} ${styles.delete}`}
                      title="Delete"
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Update Modal */}
      {showModal && (
        <UpdateOrder
          show={showModal}
          order={selectedOrder}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
          }}
          setOrders={setOrders}
        />
      )}
    </div>
  );
}
