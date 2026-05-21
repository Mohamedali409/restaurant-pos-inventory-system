import { useState } from 'react';
import styles from './Categories.module.css';

const categories = ['All', 'Burgers', 'Drinks', 'Meals', 'Sides', 'Desserts'];

const Categories = () => {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.list}>
      {categories.map((cat, i) => (
        <button
          key={i}
          className={`${styles.pill} ${i === active ? styles.active : ''}`}
          onClick={() => setActive(i)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
