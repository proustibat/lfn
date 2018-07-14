const filesReducerDefaultState = [];
export default ( state = filesReducerDefaultState, action ) => {
    switch ( action.type ) {
    case 'ADD_FILES':
        return [ ...state, ...action.files ];
    case 'REMOVE_FILE':
        return state.filter( ( file, index ) => action.index !== index );
    default:
        return state;
    }
};
