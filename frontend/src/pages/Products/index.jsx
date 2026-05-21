import { useCallback, useState } from 'react';
import HeaderProducts from '../../components/ProductPages/Header';
import ProductTable from '../../components/ProductPages/TableProducts';

const Products = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <HeaderProducts onProductAdded={handleProductAdded} />
      <ProductTable key={refreshKey} />
    </>
  );
};

export default Products;
