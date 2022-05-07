import React from 'react';
import ReactDOM from 'react-dom/client';
import Preview from './Preview';

const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<Preview />);
