const styles = theme => ( {
    list: {
        width: '100%',
        wordWrap: 'break-word',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.sizeS,
    },
    rootBadge: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    },
    secondaryBadge: {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        marginLeft: theme.spacing.unit
    }
} );

export default styles;
