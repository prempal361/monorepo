import React from 'react';
import { PaymentStatusBadge } from './PaymentStatusBadge.jsx';

export function PaymentHistoryTable({ history = [] }) {
  if (!history || history.length === 0) {
    return <p style={{ color: '#777' }}>No payment records found for this policy.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="pru-table" data-testid="payment-history-table">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Policy ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Ref Number</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id || item.payment_id}>
              <td style={{ fontWeight: '600' }}>{item.id || item.payment_id}</td>
              <td>{item.policyId || item.policy_id}</td>
              <td>{item.currency || 'USD'} {item.amount}</td>
              <td>{item.paymentMethod || item.payment_method}</td>
              <td><code>{item.referenceNumber || item.ref_no}</code></td>
              <td>{new Date(item.transactionDate || item.txn_date || Date.now()).toLocaleDateString()}</td>
              <td><PaymentStatusBadge status={item.status || item.payment_status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
