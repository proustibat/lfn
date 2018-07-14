import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../withTheme';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import numeral from 'numeral';
import DroppedFilesListItemAvatar from './list-item-avatar/DroppedFilesListItemAvatar';
import DroppedFilesListItemDeleteIcon from './list-item-delete-icon/DroppedFilesListItemDeleteIcon';
import styles from './DroppedFilesListItem.styles';


export class DroppedFilesListItem extends React.Component {
    render() {
        const { index, file, classes } = this.props;
        return (
            <ListItem key={index}>
                <DroppedFilesListItemAvatar index={index} file={file} />
                <ListItemText
                    className={ classes.listItemTextRoot }
                    primary={file.name}
                    secondary={numeral( file.size ).format( '0.00b' )}
                />
                <DroppedFilesListItemDeleteIcon index={index} />
            </ListItem>
        );
    }
}


export default withTheme( withStyles( styles )( DroppedFilesListItem ) );
