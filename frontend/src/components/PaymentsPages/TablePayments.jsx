import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import styles from '../ProductPages/ProductTable.module.css';

export default function TablePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get('/payment');
        const fetchedPayments = res.data?.data || res.data?.payments || res.data?.payment || res.data;
        setPayments(Array.isArray(fetchedPayments) ? fetchedPayments : []);
      } catch (err) {
        // Fallback to plural if singular fails
        try {
          const res2 = await axiosInstance.get('/payments');
          const fetchedPayments = res2.data?.data || res2.data?.payments || res2.data;
          setPayments(Array.isArray(fetchedPayments) ? fetchedPayments : []);
        } catch (err2) {
          setError(err2.response?.data?.message || err.response?.data?.message || 'Failed to fetch payments');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className={styles.card}>
      <table className="table align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>Transaction ID</th>
            <th>Order Ref</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading payments...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : payments.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No payment records found
              </td>
            </tr>
          ) : (
            payments.map((item) => (
              <tr key={item._id}>
                <td>{item.transactionId || item._id?.slice(-6).toUpperCase()}</td>
                <td>{item.orderId?._id?.slice(-6).toUpperCase() || item.orderId || 'N/A'}</td>
                <td className="fw-bold">${item.amount?.toFixed(2) || '0.00'}</td>
                <td>
                  <span className={styles.badgeLight}>
                    {item.paymentMethod || item.method || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${item.status === 'failed' ? 'text-danger' : item.status === 'pending' ? 'text-warning' : 'text-success'}`}>
                    {item.status || 'completed'}
                  </span>
                </td>
                <td>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
