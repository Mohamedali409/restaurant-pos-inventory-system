import { useEffect, useState } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import OrderDetailsModal from '../../components/ui/OrderDetailsModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axiosInstance.get('/order');

        setOrders(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);

  const updateOrderStatus = async (orderId) => {
    try {
      await axiosInstance.patch(`/order/${orderId}/status`, {
        status: 'completed',
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: 'completed',
              }
            : order,
        ),
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: 'completed',
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="fw-bold">Orders History</h1>

      <p className="text-muted">View all transactions and order details</p>

      <div className="position-relative mb-4">
        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />

        <input className="form-control ps-5" placeholder="Search by order number..." />
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table mb-0 align-middle">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Total</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}

                  <br />

                  <small>{new Date(order.createdAt).toLocaleTimeString()}</small>
                </td>

                <td>{order.items.length} items</td>

                <td>${order.total}</td>

                <td>{order.customerName}</td>

                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2
                    ${
                      order.status === 'completed'
                        ? 'bg-success-subtle text-success'
                        : 'bg-warning-subtle text-warning'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <FaEye role="button" onClick={() => setSelectedOrder(order)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onComplete={updateOrderStatus}
        />
      )}
    </div>
  );
}
