import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withTheme from '../withTheme';
import NavBar from '../components/NavBar';


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        maxWidth: `${ theme.breakpoints.values.md }px`,
        margin: 'auto'
    }
});

export class PageHome extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                <NavBar />
                <div className={ classes.container }>
                    <Typography variant='display1' gutterBottom>
                        Hello world
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withTheme(
    withStyles( styles )( PageHome )
);
