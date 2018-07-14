import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../../withTheme';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFile } from '../../../../actions/files';
import styles from './DroppedFilesListItemDeleteIcon.styles';


export class DroppedFilesListItemDeleteIcon extends React.Component {
    onDelete = e => {
        const index = parseInt( e.currentTarget.getAttribute( 'data-index-file' ), 10 );
        this.props.removeFile( index );
    };

    render() {
        const { index, classes } = this.props;
        return (
            <IconButton aria-label="Delete" onClick={this.onDelete} data-index-file={index}>
                <DeleteIcon className={ classes.iconDelete } />
            </IconButton>
        );
    }
}


const mapDispatchToProps = dispatch => ( {
    removeFile: index => dispatch( removeFile( index ) )
} );

export default connect( undefined, mapDispatchToProps )(
    withTheme( withStyles( styles )( DroppedFilesListItemDeleteIcon ) )
);
