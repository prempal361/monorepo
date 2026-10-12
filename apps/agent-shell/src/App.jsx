import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/index.js';
import './styles/shell.css';

// Webpack 5 Module Federation Remote Component Lazy Loading
const CustomerModule = lazy(() =>
  import('customerMfe/CustomerModule').catch(err => {
    console.error('Failed to load customerMfe remote:', err);
    return { default: () => <FallbackRemote MfeName="Customer MFE (Port 3001)" /> };
  })
);

const ProductModule = lazy(() =>
  import('productMfe/ProductModule').catch(err => {
    console.error('Failed to load productMfe remote:', err);
    return { default: () => <FallbackRemote MfeName="Product MFE (Port 3002)" /> };
  })
);

const PaymentModule = lazy(() =>
  import('paymentMfe/PaymentModule').catch(err => {
    console.error('Failed to load paymentMfe remote:', err);
    return { default: () => <FallbackRemote MfeName="Payment MFE (Port 3003)" /> };
  })
);

const PolicyModule = lazy(() =>
  import('policyMfe/PolicyModule').catch(err => {
    console.error('Failed to load policyMfe remote:', err);
    return { default: () => <FallbackRemote MfeName="Policy MFE (Port 3004)" /> };
  })
);

function FallbackRemote({ MfeName }) {
  return (
    <div style={{ padding: '40px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
      <h3 style={{ color: '#ed1b2e' }}>Connecting to {MfeName}...</h3>
      <p style={{ color: '#666' }}>Ensure the microfrontend service is started (e.g. <code>npm run start:{MfeName.split(' ')[0].toLowerCase()}</code>)</p>
    </div>
  );
}

function ShellHeader() {
  const agent = useSelector(s => s.agentSession);

  return (
    <header className="pru-shell-header">
      <div className="pru-shell-brand">
        <span>PRUDENTIAL New</span>
        <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '1rem' }}>| Agent Portal</span>
      </div>

      <nav className="pru-shell-nav">
        <NavLink to="/payments" className={({ isActive }) => isActive ? 'active' : ''}>
          Payments
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => isActive ? 'active' : ''}>
          Customers
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
          Products
        </NavLink>
        <NavLink to="/policies" className={({ isActive }) => isActive ? 'active' : ''}>
          Policies
        </NavLink>
      </nav>

      <div className="pru-shell-agent-badge">
        Agent: {agent.agentName} ({agent.agentId})
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <ShellHeader />
          <main className="pru-shell-main">
            <Suspense fallback={<div className="pru-loading-spinner">Loading Prudential Microfrontend...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/payments" replace />} />
                <Route path="/payments" element={<PaymentModule />} />
                <Route path="/customers" element={<CustomerModule />} />
                <Route path="/products" element={<ProductModule />} />
                <Route path="/policies" element={<PolicyModule />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="pru-shell-footer">
            &copy; {new Date().getFullYear()} Prudential Financial, Inc. All rights reserved. | Simple Architecture Monorepo
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
