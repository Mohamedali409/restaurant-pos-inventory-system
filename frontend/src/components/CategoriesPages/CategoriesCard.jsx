import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './CategoryCard.module.css';

const CategoriesCard = ({ category }) => {
  return (
    <div className={styles.card}>
      {/* top */}
      <div className={styles.top}>
        <div className={styles.iconBox}>🍔</div>

        <div className={styles.actions}>
          <FaEdit className={`${styles.icon} ${styles.edit}`} />
          <FaTrash className={`${styles.icon} ${styles.delete}`} />
        </div>
      </div>

      {/* content */}
      <div className={styles.content}>
        <h5 className={styles.title}>{category.name}</h5>
        <p className={styles.subtitle}>{category.productsCount || 0} products</p>
      </div>
    </div>
  );
};

export default CategoriesCard;
