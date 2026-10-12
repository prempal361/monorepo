import React from 'react';

const PaymentStatusBadge = ({ status }) => {
  return (
    <span className="badge-success">
      {status || 'SUCCESS'}
    </span>
  );
};

export default PaymentStatusBadge;
