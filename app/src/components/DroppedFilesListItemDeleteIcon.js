import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../withTheme';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ( {

} );

class DroppedFilesListItemDeleteIcon extends React.Component {
    onDelete = e => {
        const index = parseInt( e.currentTarget.getAttribute( 'data-index-file' ), 10 );
        this.props.onDelete( index );
    };
    render() {
        const { index } = this.props;
        return (
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={this.onDelete} data-index-file={index}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        );
    }

}

export default withTheme( withStyles( styles )( DroppedFilesListItemDeleteIcon ) );
