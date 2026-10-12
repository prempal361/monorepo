import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentForm from './PaymentForm.jsx';
import PaymentHistoryTable from './PaymentHistoryTable.jsx';
import { submitPaymentThunk, getPaymentHistoryThunk } from '../store/paymentSlice.js';
import './payment.css';

const PaymentPage = ({ selectedCustomer, selectedProduct, onPaymentSuccess }) => {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment) || {
    history: [
      { transactionId: 'TXN-984321', customerName: 'Rahul Sharma', productName: 'Prudential Term Life Protect', amount: 1500, status: 'SUCCESS', timestamp: '2025-02-10 14:30' }
    ]
  };

  useEffect(() => {
    dispatch(getPaymentHistoryThunk());
  }, [dispatch]);

  const handleSubmitPayment = (payload) => {
    dispatch(submitPaymentThunk(payload)).then((action) => {
      if (action.payload && onPaymentSuccess) {
        onPaymentSuccess(action.payload);
      }
    });
  };

  return (
    <div className="payment-container">
      <h2>Payment & Billing Gateway</h2>
      <PaymentForm
        customer={selectedCustomer}
        product={selectedProduct}
        onSubmitPayment={handleSubmitPayment}
      />
      <PaymentHistoryTable history={paymentState.history} />
    </div>
  );
};

export default PaymentPage;
