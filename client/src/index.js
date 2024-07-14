import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
//import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

/*root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);*/