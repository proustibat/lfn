import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../../withTheme';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import FontIcon from '@material-ui/icons/FontDownload';
import CodeIcon from '@material-ui/icons/DeveloperMode';
import styles from './DroppedFilesListItemAvatar.styles';


export class DroppedFilesListItemAvatar extends React.Component {
    chooseImagePreview = ( { file } ) => {
        const { classes } = this.props;
        return file.srcPreviewIcon ? (
            <Avatar alt={file.name} src={file.srcPreviewIcon} className={classes.avatar} />
        ) : (
            <ListItemIcon>
                <PhotoLibrary />
            </ListItemIcon>
        );
    };

    render() {
        const { index, file } = this.props;
        if( file.type.includes( 'audio' ) ) {
            return (
                <ListItemIcon>
                    <LibraryMusic />
                </ListItemIcon>
            );
        }

        if( file.type.includes( 'video' ) ) {
            return (
                <ListItemIcon>
                    <VideoLibrary />
                </ListItemIcon>
            );
        }

        if( file.type.includes( 'epub' ) ||
            file.name.toLowerCase().includes( '.azw3' ) ||
            file.name.toLowerCase().includes( '.kfx' ) ||
            file.name.toLowerCase().includes( '.sdr' ) ||
            file.name.toLowerCase().includes( '.mobi' ) ) {
            return (
                <ListItemIcon>
                    <LibraryBooks />
                </ListItemIcon>
            );
        }

        if( file.type.includes( 'image' ) ||
            file.name.toLowerCase().includes( '.ai' ) ||
            file.name.toLowerCase().includes( '.nef' ) ||
            file.name.toLowerCase().includes( '.eps' ) ||
            file.type.includes( 'photoshop' ) ||
            file.type.includes( 'svg' ) ) {
            return this.chooseImagePreview( { index, file } );
        }

        if( file.name.toLowerCase().includes( '.otf' ) ||
            file.name.toLowerCase().includes( '.eot' ) ||
            file.name.toLowerCase().includes( '.ttc' ) ||
            file.name.toLowerCase().includes( '.woff' ) ||
            file.name.toLowerCase().includes( '.ttf' ) ) {
            return (
                <ListItemIcon>
                    <FontIcon />
                </ListItemIcon>
            );
        }

        if( file.name.toLowerCase().includes( '.js' ) ||
            file.name.toLowerCase().includes( '.jsx' ) ||
            file.name.toLowerCase().includes( '.scss' ) ||
            file.name.toLowerCase().includes( '.less' ) ||
            file.name.toLowerCase().includes( '.css' ) ||
            file.name.toLowerCase().includes( '.html' ) ||
            file.name.toLowerCase().includes( '.ejs' ) ||
            file.name.toLowerCase().includes( '.hbs' ) ||
            file.name.toLowerCase().includes( '.php' ) ||
            file.name.toLowerCase().includes( '.sh' ) ||
            file.name.toLowerCase().includes( '.yml' ) ||
            file.name.toLowerCase().includes( '.xml' ) ||
            file.name.toLowerCase().includes( '.json' ) ) {
            return (
                <ListItemIcon>
                    <CodeIcon />
                </ListItemIcon>
            );
        }

        return (
            <ListItemIcon>
                <AttachFileIcon />
            </ListItemIcon>
        );
    }
}


export default withTheme( withStyles( styles )( DroppedFilesListItemAvatar ) );
