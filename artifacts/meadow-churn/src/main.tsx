import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

document.getElementById('slow-load-message')?.remove();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Meadow & Churn root element is missing.');
}

createRoot(rootElement, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
