import React, { useState } from 'react';
import { validatePaymentRequest } from '../rules/paymentRules.js';

const PaymentForm = ({ customer, product, onSubmitPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [errors, setErrors] = useState({});

  const handlePayClick = (e) => {
    e.preventDefault();
    const payload = {
      customerName: customer?.name || 'Rahul Sharma',
      customerId: customer?.id || 'CUST-001',
      productName: product?.name || 'Prudential Term Life Protect',
      productId: product?.id || 'PRD-101',
      amount: product?.price || 1500,
      paymentMethod
    };

    const validationErrors = validatePaymentRequest(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (onSubmitPayment) {
      onSubmitPayment(payload);
    }
  };

  return (
    <div className="payment-summary-card">
      <h3>Checkout & Policy Purchase</h3>
      <div style={{ marginBottom: '12px' }}>
        <p><strong>Customer:</strong> {customer ? customer.name : 'Rahul Sharma (Default)'}</p>
        <p><strong>Selected Product:</strong> {product ? product.name : 'Prudential Term Life Protect (Default)'}</p>
        <p style={{ fontSize: '18px', color: '#28a745', marginTop: '8px' }}>
          <strong>Total Amount Payable:</strong> ₹{product ? product.price : 1500}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="UPI">UPI / GPay / PhonePe</option>
          <option value="CREDIT_CARD">Credit / Debit Card</option>
          <option value="NET_BANKING">Net Banking</option>
        </select>
      </div>

      {errors.amount && <div style={{ color: '#d9534f', marginBottom: '8px' }}>{errors.amount}</div>}

      <button
        onClick={handlePayClick}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#28a745',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Pay ₹{product ? product.price : 1500} & Issue Policy
      </button>
    </div>
  );
};

export default PaymentForm;
