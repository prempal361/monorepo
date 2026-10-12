import React from 'react';
import { createRoot } from 'react-dom/client';
import PolicyPage from './components/PolicyPage.jsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<PolicyPage />);
}
