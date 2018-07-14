const styles = theme => ( {
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.sizeS,
        paddingBottom: theme.spacing.sizeS,
        marginTop: theme.spacing.sizeS,
        marginBottom: theme.spacing.sizeS,
    },
    numberInfo: {
        fontSize: theme.sizing.sizeS,
    },
    updateInfo: {
        fontSize: theme.sizing.sizeXS,
    },
    nbItem: {
        color: theme.palette.primary.light,
        fontWeight: 'bold',
    },
    loading: {
        marginTop: theme.spacing.sizeS,
        marginBottom: theme.spacing.sizeS,
    },
    queuedInfo: {
        marginTop: theme.spacing.sizeS,
        marginBottom: theme.spacing.sizeS,
        fontSize: theme.sizing.sizeXS,
    },
    progressNumberInfo: {
        marginLeft: 5,
        top: 2,
        position: 'relative'
    }
} );

export default styles;
