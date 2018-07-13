import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../withTheme';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import numeral from 'numeral';
import DroppedFilesListItemAvatar from './DroppedFilesListItemAvatar';
import DroppedFilesListItemDeleteIcon from './DroppedFilesListItemDeleteIcon';


const styles = theme => ( {

} );

export class DroppedFilesListItem extends React.Component {
    onDelete = index => {
        this.props.onDelete( index );
    };

    render() {
        const { index, file } = this.props;
        return (
            <ListItem key={index}>
                <DroppedFilesListItemAvatar index={index} file={file} />
                <ListItemText primary={file.name} secondary={numeral( file.size ).format( '0.00b' )} />
                <DroppedFilesListItemDeleteIcon index={index} onDelete={this.onDelete}/>
            </ListItem>
        );
    }

}

export default withTheme( withStyles( styles )( DroppedFilesListItem ) );
