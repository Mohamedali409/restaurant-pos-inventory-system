import { useEffect, useState } from 'react';
import { FaEdit, FaHistory, FaCog } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import styles from '../ProductPages/ProductTable.module.css';
import UpdateStockModal from './UpdateStockModal';
import StockHistoryModal from './StockHistoryModal';
import UpdateReorderLevelModal from './UpdateReorderLevelModal';

export default function TableInventory({ activeFilter }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showStockModal, setShowStockModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // fetch products based on filter
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError(null);

      let endpoint = '/inventory';
      if (activeFilter === 'low-stock') endpoint = '/inventory/low-stock';
      if (activeFilter === 'out-of-stock') endpoint = '/inventory/out-of-stock';

      try {
        const res = await axiosInstance.get(endpoint);
        setProducts(res.data?.data || res.data?.inventory || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [activeFilter]);

  const handleEditStock = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
  };

  const handleViewHistory = (product) => {
    setSelectedProduct(product);
    setShowHistoryModal(true);
  };

  const handleEditReorderLevel = (product) => {
    setSelectedProduct(product);
    setShowReorderModal(true);
  };

  return (
    <div className={styles.card}>
      <table className="table align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Stock Level</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading inventory...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <span className={styles.badgeLight}>
                    {item.categoryId?.name || item.category?.name || 'N/A'}
                  </span>
                </td>
                <td className={item.stock <= (item.reorderLevel || 20) ? styles.lowStock : ''}>
                  {item.stock ?? 0}
                </td>
                <td>{item.reorderLevel ?? 20}</td>
                <td>
                  <span className={`${styles.status} ${item.stock <= 0 ? 'text-danger' : item.stock <= (item.reorderLevel || 20) ? 'text-warning' : ''}`}>
                    {item.stock > 0 ? (item.stock <= (item.reorderLevel || 20) ? 'low stock' : 'in stock') : 'out of stock'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={`${styles.icon} ${styles.edit}`}
                      title="Update Stock"
                      onClick={() => handleEditStock(item)}
                    />
                    <FaHistory
                      className={`${styles.icon} text-info ms-2`}
                      title="Stock History"
                      onClick={() => handleViewHistory(item)}
                      style={{ cursor: 'pointer' }}
                    />
                    <FaCog
                      className={`${styles.icon} text-secondary ms-2`}
                      title="Update Reorder Level"
                      onClick={() => handleEditReorderLevel(item)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modals */}
      {showStockModal && (
        <UpdateStockModal
          show={showStockModal}
          product={selectedProduct}
          onClose={() => {
            setShowStockModal(false);
            setSelectedProduct(null);
          }}
          setProducts={setProducts}
        />
      )}

      {showHistoryModal && (
        <StockHistoryModal
          show={showHistoryModal}
          product={selectedProduct}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showReorderModal && (
        <UpdateReorderLevelModal
          show={showReorderModal}
          product={selectedProduct}
          onClose={() => {
            setShowReorderModal(false);
            setSelectedProduct(null);
          }}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
