import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withTheme from '../withTheme';
import NavBar from '../components/NavBar';
import DropZoneFile from '../components/DropZoneFile';

const styles = theme => ( {
    container: {
        maxWidth: `${ theme.breakpoints.values.md }px`,
        margin: 'auto',
        padding: theme.spacing.sizeS,
    },
} );

export class PageHome extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar />
                <div className={classes.container}>
                    <Typography variant="display1" gutterBottom>
                        Welcome to your documents uploader
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </Typography>
                    <DropZoneFile />
                </div>
            </div>
        );
    }
}

export default withTheme( withStyles( styles )( PageHome ) );
