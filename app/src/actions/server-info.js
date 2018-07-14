export const setBinaryNumber = number => ( {
    type: 'SET_BINARY_NUMBER',
    number
} );

export const setLastUpdate = date => ( {
    type: 'SET_LAST_UPDATE',
    date
} );

export const setLoadingStatus = isLoading => ( {
    type: 'SET_LOADING_STATUS',
    isLoading
} );

export const startGetServerInfo = () => {
    return dispatch => {
        dispatch( setLoadingStatus( true ) );
        fetch( 'http://hapi.fhir.org/baseDstu3/Binary', {
            method: 'get'
        } )
            .then( response => response.ok ? response.json() : null )
            .then( data => {
                data && data.total && dispatch( setBinaryNumber( data.total ) );
                data && data.meta && data.meta.lastUpdated && dispatch( setLastUpdate( data.meta.lastUpdated ) );
                dispatch( setLoadingStatus( false ) );
            } )
            .catch( e => {
                //TODO: display an error message to user
                console.log( 'ERROR ', e );
                dispatch( setLoadingStatus( false ) );
            } );
    };
};
