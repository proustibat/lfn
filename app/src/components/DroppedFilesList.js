import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../withTheme';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ImageIcon from '@material-ui/icons/Image';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import numeral from 'numeral';

const styles = theme => ( {
    list: {
        width: '100%',
        wordWrap: 'break-word',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.sizeS,
    },
    avatar: {
        width: 24,
        height: 24,
        marginRight: theme.spacing.sizeS,
        borderRadius: '0 !important',
    },
    badge: {
        margin: theme.spacing.unit * 2,
    },
} );

export class DroppedFilesList extends React.Component {
    onDelete = e => {
        const index = parseInt( e.currentTarget.getAttribute( 'data-index-file' ), 10 );
        this.props.onDelete( index );
    };

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

    renderIcon = ( { index, file } ) =>
        file.type.includes( 'image' ) ? (
            this.chooseImagePreview( { index, file } )
        ) : (
            <ListItemIcon>
                <AttachFileIcon />
            </ListItemIcon>
        );

    renderText = file => <ListItemText primary={file.name} secondary={numeral( file.size ).format( '0.00b' )} />;

    renderDeleteIcon = index => (
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={this.onDelete} data-index-file={index}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    );

    render() {
        const { classes } = this.props;
        return (
            this.props.files.length > 0 && (
                <div className={classes.list}>
                    <List
                        dense
                        component="div"
                        subheader={
                            <ListSubheader component="div">
                                Dropped file{this.props.files.length > 1 && 's'}
                                {this.props.files.length > 1 && (
                                    <Badge
                                        className={classes.badge}
                                        badgeContent={this.props.files.length}
                                        color="secondary"
                                    />
                                )}
                            </ListSubheader>
                        }
                    >
                        {this.props.files.map( ( file, index ) => (
                            <ListItem key={index}>
                                {this.renderIcon( { index, file } )}
                                {this.renderText( file )}
                                {this.renderDeleteIcon( index )}
                            </ListItem>
                        ) )}
                    </List>
                </div>
            )
        );
    }
}

export default withTheme( withStyles( styles )( DroppedFilesList ) );
