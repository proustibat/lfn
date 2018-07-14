export const addFiles = files => ( {
    type: 'ADD_FILES',
    files
} );

export const removeFile = index => ( {
    type: 'REMOVE_FILE',
    index
} );
