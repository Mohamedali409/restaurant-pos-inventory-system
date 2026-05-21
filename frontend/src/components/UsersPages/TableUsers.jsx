import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import styles from '../ProductPages/ProductTable.module.css';
import UpdateUserModal from './UpdateUserModal';

export default function TableUsers({ refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get('/users');
        const fetchedUsers = res.data?.users || res.data?.data || res.data;
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (err) {
        if (err.response?.status === 404) {
          try {
            const res = await axiosInstance.get('/user');
            const fetchedUsers = res.data?.users || res.data?.data || res.data;
            setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
          } catch (fallbackErr) {
            setError(fallbackErr.response?.data?.message || fallbackErr.message || 'Failed to fetch users');
          }
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshKey]);

  // handle edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await axiosInstance.delete(`/user/${id}`);
          setUsers((prev) => prev.filter((u) => u._id !== id));
        } catch (fallbackErr) {
          console.log(fallbackErr);
          alert('Failed to delete user');
        }
      } else {
        console.log(err);
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div className={styles.card}>
      <table className="table align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading users...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <span className={`${styles.status} ${item.role === 'admin' ? 'text-primary' : item.role === 'manager' ? 'text-warning' : 'text-success'}`}>
                    {item.role || 'cashier'}
                  </span>
                </td>
                <td>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={`${styles.icon} ${styles.edit}`}
                      title="Edit User"
                      onClick={() => handleEdit(item)}
                    />
                    <FaTrash
                      className={`${styles.icon} ${styles.delete}`}
                      title="Delete User"
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
        <UpdateUserModal
          show={showModal}
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}
