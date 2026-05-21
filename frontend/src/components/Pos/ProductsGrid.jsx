import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import ProductCard from './ProductCard';

const ProductsGrid = ({ onAddToCart, searchTerm = '' }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error(err.message || 'Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  return (
    <div className="d-flex flex-wrap gap-2 p-2">
      {filteredProducts.map((p) => (
        <ProductCard key={p._id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductsGrid;
