import React from 'react';
import ReactDOM from 'react-dom';
import { Body } from 'vienna-ui';
import './index.css';
import App from './screens/App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Body>
            <Router>
                <App />
            </Router>
        </Body>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
