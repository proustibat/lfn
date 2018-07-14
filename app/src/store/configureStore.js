import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import filesReducer from '../reducers/files';
import serverInfoReducer from '../reducers/server-info';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        combineReducers( {
            files: filesReducer,
            serverInfo: serverInfoReducer
        } ),
        composeEnhancers( applyMiddleware( thunk ) )
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};
