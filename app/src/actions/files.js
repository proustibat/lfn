export const addFiles = files => ( {
    type: 'ADD_FILES',
    files
} );

export const removeFile = index => ( {
    type: 'REMOVE_FILE',
    index
} );

export const uploadFile = index => ( {
    type: 'UPLOAD_FILE',
    index
} );

export const failFile = index => ( {
    type: 'FAIL_FILE',
    index
} );

export const startUploadFile = ( index = null ) => {
    return ( dispatch, getState ) => {
        fetch( 'https://fhirtest.uhn.ca/baseDstu3/Binary', {
            method: 'post',
            body: getState().files[ index ]
        } )
            .then( response => {
                if( response.ok ) {
                    return response.json();
                }
            } )
            .then( () => {
                dispatch( uploadFile( index ) );
            } )
            .catch( e => {
                console.log( 'ERROR ', e );
                dispatch( failFile( index ) );
            } );
    };
};
