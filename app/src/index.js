import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'reset-css/reset.css';
import './index.css';

import PageHome from './pages/PageHome';

ReactDOM.render(<PageHome />, document.getElementById('root'));
registerServiceWorker();
