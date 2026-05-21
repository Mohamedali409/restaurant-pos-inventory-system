import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import CategoriesCard from '../../components/CategoriesPages/CategoriesCard.jsx';
import HeaderCategories from '../../components/CategoriesPages/Header';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get('/category');
        const data = res.data?.category || res.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get('/category');
      const data = res.data?.category || res.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="p-4">
      <HeaderCategories onCategoryAdded={refetchCategories} />

      <div className="d-flex flex-wrap gap-3 mt-3">
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((cat) => <CategoriesCard key={cat._id} category={cat} />)
        )}
      </div>
    </div>
  );
};

export default Categories;
