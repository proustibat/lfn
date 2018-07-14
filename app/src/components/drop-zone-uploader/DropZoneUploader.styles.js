const styles = theme => ( {
    stripes: {
        display: 'none',
        // The drop zone is necessary only on desktop
        [theme.breakpoints.up( 'sm' )]: {
            //TODO: what about tablets or landscape mode on mobile ?!
            display: 'flex',
            width: '100%',
            height: '20rem',
            cursor: 'pointer',
            border: 'solid',
            borderColor: theme.palette.secondary.dark,
            backgroundImage: `repeating-linear-gradient(-45deg, ${
                theme.palette.secondary.veryLight
            }, ${
                theme.palette.secondary.veryLight
            } 10px, ${
                theme.palette.secondary.light
            } 10px, ${
                theme.palette.secondary.light
            } 20px)`,
            animation: 'progress 2s linear infinite !important',
            backgroundSize: '150% 100%',
            marginBottom: theme.spacing.sizeM,
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.secondary.dark,
            fontWeight: 'bold',
        },
    },
    button: {
        marginBottom: theme.spacing.sizeS,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
} );

export default styles;
