import { useEffect, useState } from 'react';
import CustomModal from '../ui/CustomModal';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function StockHistoryModal({
  show,
  product,
  onClose,
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && product) {
      const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await axiosInstance.get(`/inventory/${product._id}/history`);
          setHistory(res.data?.data || res.data?.history || []);
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch history');
        } finally {
          setLoading(false);
        }
      };

      fetchHistory();
    }
  }, [show, product]);

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title={`Stock History - ${product?.name}`}
    >
      {loading ? (
        <div className="text-center p-3">Loading history...</div>
      ) : error ? (
        <div className="text-center text-danger p-3">{error}</div>
      ) : history.length === 0 ? (
        <div className="text-center p-3">No history found.</div>
      ) : (
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Quantity Change</th>
              <th>Stock After</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.createdAt || record.date).toLocaleDateString()}</td>
                <td>{record.action || 'Manual Update'}</td>
                <td className={record.quantityChange > 0 ? 'text-success' : record.quantityChange < 0 ? 'text-danger' : ''}>
                  {record.quantityChange > 0 ? `+${record.quantityChange}` : record.quantityChange}
                </td>
                <td>{record.newStock || record.currentStock}</td>
                <td>{record.user?.name || record.userId || 'System'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </CustomModal>
  );
}
