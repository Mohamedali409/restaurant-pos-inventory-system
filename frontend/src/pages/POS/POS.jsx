import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Cart from '../../components/Pos/Cart';
import Categories from '../../components/Pos/Categories';
import ProductsGrid from '../../components/Pos/ProductsGrid';
import Navbar from '../../components/shared/Navbar/Navbar';
import styles from './POS.module.css';

const POS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product._id === product._id);

      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Categories />
          <ProductsGrid onAddToCart={handleAddToCart} searchTerm={searchTerm} />
        </div>
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default POS;
