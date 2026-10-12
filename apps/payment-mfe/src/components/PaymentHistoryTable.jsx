import React from 'react';
import PaymentStatusBadge from './PaymentStatusBadge.jsx';

const PaymentHistoryTable = ({ history = [] }) => {
  return (
    <div>
      <h3>Recent Payment Transactions</h3>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No transaction history found</td>
            </tr>
          ) : (
            history.map((txn, index) => (
              <tr key={txn.transactionId || index}>
                <td>{txn.transactionId}</td>
                <td>{txn.customerName}</td>
                <td>{txn.productName}</td>
                <td>₹{txn.amount}</td>
                <td><PaymentStatusBadge status={txn.status} /></td>
                <td>{txn.timestamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
