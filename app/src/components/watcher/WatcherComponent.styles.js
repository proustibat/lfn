const styles = theme => ( {
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.sizeS,
        paddingBottom: theme.spacing.sizeXS,
        marginTop: theme.spacing.sizeS,
        marginBottom: theme.spacing.sizeS,
    },

    button: {
        padding: '6px 7px',
        minWidth: 40,
        fontSize: theme.sizing.sizeXS,
        minHeight: 20,
        marginRight: theme.spacing.sizeXS,
        marginTop: theme.spacing.sizeXS,
        marginBottom: theme.spacing.sizeXS,
    },

    activity: {
        fontSize: theme.sizing.sizeS,
    },

    event: {
        fontSize: theme.sizing.sizeXS,
    },

    new: {
        color: theme.palette.watchEvents.new
    },

    delete: {
        color: theme.palette.watchEvents.delete
    },

    change: {
        color: theme.palette.watchEvents.change
    }
} );

export default styles;
