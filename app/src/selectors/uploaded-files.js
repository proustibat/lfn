const getUploadedFilesNumber = files => files.filter( file => file.status === 'done' ).length || 0;
export {
    getUploadedFilesNumber
};
