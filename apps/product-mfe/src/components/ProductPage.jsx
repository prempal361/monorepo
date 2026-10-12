import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard.jsx';
import { getProductsThunk, selectProduct, setCategory } from '../store/productSlice.js';
import { validateCategoryFilter } from '../rules/productRules.js';
import './product.css';

const categories = [
  { id: 'ALL', label: 'All Products' },
  { id: 'LIFE', label: 'Life Insurance' },
  { id: 'HEALTH', label: 'Health Insurance' },
  { id: 'SAVINGS', label: 'Savings & Wealth' },
  { id: 'MOTOR', label: 'Motor Insurance' }
];

const ProductPage = ({ onProductSelect }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product) || {
    list: [
      { id: 'PRD-101', name: 'Prudential Term Life Protect', category: 'LIFE', price: 1500, tenureYears: 20, description: 'Comprehensive term life cover with critical illness protection.' },
      { id: 'PRD-102', name: 'Prudential Health Shield Plus', category: 'HEALTH', price: 800, tenureYears: 1, description: 'Full medical expense cover including pre & post hospitalization.' }
    ],
    selectedProduct: null,
    selectedCategory: 'ALL'
  };

  useEffect(() => {
    dispatch(getProductsThunk('ALL'));
  }, [dispatch]);

  const handleCategoryChange = (catId) => {
    const error = validateCategoryFilter(catId);
    if (!error) {
      dispatch(setCategory(catId));
      dispatch(getProductsThunk(catId));
    }
  };

  const handleSelectProduct = (product) => {
    dispatch(selectProduct(product));
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  return (
    <div className="product-container">
      <h2>Select Insurance Product</h2>
      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${productState.selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {productState.list && productState.list.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            isSelected={productState.selectedProduct?.id === prod.id}
            onSelect={handleSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
