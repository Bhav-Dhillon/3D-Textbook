import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';
import store from './components/redux/store'
import './global-styles.css';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  // </React.StrictMode>

);


/* Old way of rendering:

// ReactDOM.render(<MyComponent />, document.getElementById('root'));

// import ReactDOM from 'react-dom';
// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// )

*/