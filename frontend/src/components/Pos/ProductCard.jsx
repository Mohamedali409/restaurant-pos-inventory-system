import styles from './ProductCard.module.css';

const imgUrl = 'http://localhost:3000/uploads/product/';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className={styles.card} onClick={() => onAddToCart(product)}>
      <img className={styles.image} src={`${imgUrl}${product.image}`} alt={product.name} />

      <h4 className={styles.name}>{product.name}</h4>

      <span className={styles.price}>${product.price}</span>
    </div>
  );
};

export default ProductCard;
