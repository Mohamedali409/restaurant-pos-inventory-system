import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import styles from '../ProductPages/ProductTable.module.css';

export default function TableCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get('/customer');
        console.log("Customers response:", res.data);
        const fetchedCustomers = res.data?.data || res.data?.customers || res.data?.customer || res.data;
        setCustomers(Array.isArray(fetchedCustomers) ? fetchedCustomers : []);
      } catch (err) {
        // Fallback to plural if singular fails
        try {
          const res2 = await axiosInstance.get('/customers');
          const fetchedCustomers = res2.data?.data || res2.data?.customers || res2.data;
          setCustomers(Array.isArray(fetchedCustomers) ? fetchedCustomers : []);
        } catch (err2) {
          setError(err2.response?.data?.message || err.response?.data?.message || 'Failed to fetch customers');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axiosInstance.delete(`/customer/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
      alert('Failed to delete customer');
    }
  };

  return (
    <div className={styles.card}>
      <table className="table align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Total Orders</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading customers...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No customers found
              </td>
            </tr>
          ) : (
            customers.map((item) => (
              <tr key={item._id}>
                <td>{item.name || item.customerName || 'N/A'}</td>
                <td>{item.phone || 'N/A'}</td>
                <td>{item.email || 'N/A'}</td>
                <td>{item.address || item.deliveryAddress || 'N/A'}</td>
                <td>{item.totalOrders || item.orders?.length || 0}</td>
                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={`${styles.icon} ${styles.edit}`}
                      title="Edit Customer"
                      onClick={() => alert("Edit customer feature coming soon!")}
                    />
                    <FaTrash
                      className={`${styles.icon} ${styles.delete}`}
                      title="Delete Customer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
