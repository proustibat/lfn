import React from 'react';
import { connect } from 'react-redux';
import withTheme from '../../../../withTheme';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFile } from '../../../../actions/files';


export class DroppedFilesListItemDeleteIcon extends React.Component {
    onDelete = e => {
        const index = parseInt( e.currentTarget.getAttribute( 'data-index-file' ), 10 );
        this.props.removeFile( index );
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


const mapDispatchToProps = dispatch => ( {
    removeFile: index => dispatch( removeFile( index ) )
} );

export default connect( undefined, mapDispatchToProps )(
    withTheme( DroppedFilesListItemDeleteIcon )
);
