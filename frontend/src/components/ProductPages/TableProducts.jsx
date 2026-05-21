import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { axiosInstance } from '../../api/axiosInstance';
import styles from './ProductTable.module.css';
import UpdateTable from './UpdateTable';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get('/products');
        setProducts(res.data?.products || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // handle edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.card}>

      <table className="table align-middle w-100">

        <thead className="table-light">
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading products...
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
                    {item.categoryId?.name || 'N/A'}
                  </span>
                </td>

                <td>${item.price}</td>

                <td className={item.stock < 20 ? styles.lowStock : ''}>
                  {item.stock ?? 0}
                </td>

                <td>
                  <span className={styles.status}>
                    {item.stock > 0 ? 'active' : 'out of stock'}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>

                    <FaEdit
                      className={`${styles.icon} ${styles.edit}`}
                      title="Edit"
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
        <UpdateTable
          show={showModal}
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          setProducts={setProducts}
        />
      )}

    </div>
  );
}