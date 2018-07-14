import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import PageHome from './pages/PageHome';
import configureStore from './store/configureStore';

import 'reset-css/reset.css';

import 'typeface-roboto';
import './index.css';

const store = configureStore();

const jsx = (
    <Provider store = { store }>
        <PageHome />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById( 'root' ) );
registerServiceWorker();
