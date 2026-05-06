import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const initialPath = window.location.pathname;
const tree = (
  <React.StrictMode>
    <App path={initialPath} />
  </React.StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
