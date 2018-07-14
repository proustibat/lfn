import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withTheme from '../../withTheme';
import NavBar from '../../components/navbar/NavBar';
import DropZoneUploader from '../../components/drop-zone-uploader/DropZoneUploader';
import DroppedFilesList from '../../components/dropped-files-list/DroppedFilesList';
import ServerInfo from '../../components/server-info/ServerInfo';

import styles from './home.styles';

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
                    <ServerInfo />
                    <DropZoneUploader />
                    <DroppedFilesList />
                </div>
            </div>
        );
    }
}


export default withTheme( withStyles( styles )( PageHome ) );
