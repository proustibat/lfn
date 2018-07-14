const filesReducerDefaultState = [];

export default ( state = filesReducerDefaultState, action ) => {
    switch ( action.type ) {
    case 'ADD_FILES':
        return [
            ...state,
            ...action.files.map( file => {
                file.status = 'queue';  // Should be 'queue' or 'done' when it will be uploaded
                return file;
            } )
        ];
    case 'REMOVE_FILE':
        const files = [ ...state ];
        files.splice( action.index, 1 );
        return files;
    case 'UPLOAD_FILE':
        return state.map( ( file, index ) => {
            file.status = action.index === index ? 'done' : file.status;
            return file;
        } );
    case 'FAIL_FILE':
        return state.map( ( file, index ) => {
            file.status = action.index === index ? 'failed' : file.status;
            return file;
        } );
    default:
        return state;
    }
};
