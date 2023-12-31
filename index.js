import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
/**REST tehtävän koodia */
import { CurrencySelection } from './components/CurrencyContext';
/**REST tehtävän koodia */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/**REST tehtävän koodia */
    <CurrencySelection>'
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CurrencySelection>
/**REST tehtävän koodia */
);


