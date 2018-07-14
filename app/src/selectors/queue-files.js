const getQueuedFilesNumber = files => files.filter( file => file.status === 'queue' ).length || 0;
export {
    getQueuedFilesNumber
};
