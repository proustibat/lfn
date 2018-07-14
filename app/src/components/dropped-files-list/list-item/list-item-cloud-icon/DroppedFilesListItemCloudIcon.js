import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../../withTheme';
import CloudQueue from '@material-ui/icons/CloudQueue';
import styles from './DroppedFilesListItemCloudIcon.styles';


export class DroppedFilesListItemCloudIcon extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <CloudQueue className={ classes.iconCloud } />
        );
    }
}


export default withTheme( withStyles( styles )( DroppedFilesListItemCloudIcon ) );
