import React from 'react';

const ProductCard = ({ product, isSelected, onSelect }) => {
  const handleSelectProduct = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`}>
      <div>
        <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px' }}>
          {product.category}
        </span>
        <h3 style={{ margin: '10px 0 6px 0' }}>{product.name}</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
        <p style={{ fontSize: '13px', color: '#555' }}>Tenure: {product.tenureYears} Year(s)</p>
      </div>
      <div>
        <div className="product-price">₹{product.price} / yr</div>
        <button
          onClick={handleSelectProduct}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isSelected ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {isSelected ? 'Selected' : 'Select Product'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
