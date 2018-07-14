const serverInfoReducerDefaultState = {
    binaryNumber: 0,
    lastUpdate: null
};

export default ( state = serverInfoReducerDefaultState, action ) => {
    switch ( action.type ) {
    case 'SET_BINARY_NUMBER':
        return {
            ...state,
            binaryNumber: parseInt( action.number, 10 )
        };
    case 'SET_LAST_UPDATE':
        return {
            ...state,
            lastUpdate: action.date
        };
    case 'SET_LOADING_STATUS':
        return {
            ...state,
            isLoading: action.isLoading
        };
    default:
        return state;
    }
};
