import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../withTheme';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';

const styles = theme => ( {
    avatar: {
        width: 24,
        height: 24,
        marginRight: theme.spacing.sizeS,
        borderRadius: '0 !important',
    },
} );

class DroppedFilesListItemAvatar extends React.Component {

    chooseImagePreview = ( { file } ) => {
        const { classes } = this.props;
        return file.srcPreviewIcon ? (
            <Avatar alt={file.name} src={file.srcPreviewIcon} className={classes.avatar} />
        ) : (
            <ListItemIcon>
                <ImageIcon />
            </ListItemIcon>
        );
    };

    render() {
        const { index, file } = this.props;
        return (
            <div>
                {
                    file.type.includes( 'image' ) ? (
                        this.chooseImagePreview( { index, file } )
                    ) : (
                        <ListItemIcon>
                            <AttachFileIcon />
                        </ListItemIcon>
                    )
                }
            </div>
        );
    }
}

export default withTheme( withStyles( styles )( DroppedFilesListItemAvatar ) );
