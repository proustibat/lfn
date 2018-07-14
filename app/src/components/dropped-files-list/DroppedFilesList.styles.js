const styles = theme => ( {
    list: {
        width: '100%',
        wordWrap: 'break-word',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.sizeS,
    },

    listSubHeader: {
        display: 'flex'
    },

    rootBadge: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        marginRight: theme.spacing.sizeS
    },

    secondaryBadge: {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        marginLeft: theme.spacing.unit / 2
    }
} );

export default styles;
