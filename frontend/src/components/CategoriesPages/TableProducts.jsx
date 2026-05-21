import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './ProductTable.module.css';

export default function ProductTable() {
  
  const products = [
    { name: 'Classic Burger', category: 'Burgers', price: 8.99, stock: 45 },
    { name: 'Cheeseburger', category: 'Burgers', price: 9.99, stock: 38 },
    { name: 'Double Burger', category: 'Burgers', price: 12.99, stock: 22 },
    { name: 'Veggie Burger', category: 'Burgers', price: 8.49, stock: 15 },
    { name: 'Cola', category: 'Drinks', price: 2.99, stock: 120 },
    { name: 'Lemonade', category: 'Drinks', price: 2.99, stock: 85 },
    { name: 'Coffee', category: 'Drinks', price: 3.49, stock: 95 },
    { name: 'Combo Meal', category: 'Meals', price: 14.99, stock: 32 },
    { name: 'French Fries', category: 'Sides', price: 3.99, stock: 67 },
    { name: 'Ice Cream', category: 'Desserts', price: 4.99, stock: 8 },
  ];
  return (
    <div className={`${styles.card}`}>
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
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>

              <td>
                <span className={styles.badgeLight}>{item.category}</span>
              </td>

              <td>${item.price}</td>

              <td className={item.stock < 20 ? styles.lowStock : ''}>{item.stock}</td>

              <td>
                <span className={styles.status}>active</span>
              </td>

              <td>
                <div className={styles.actions}>
                  <FaEdit className={`${styles.icon} ${styles.edit}`} />
                  <FaTrash className={`${styles.icon} ${styles.delete}`} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
