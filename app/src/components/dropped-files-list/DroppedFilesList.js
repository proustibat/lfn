import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../withTheme';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Badge from '@material-ui/core/Badge';
import DroppedFilesListItem from './list-item/DroppedFilesListItem';
import styles from './DroppedFilesList.styles';
import { getUploadedFilesNumber } from '../../selectors/uploaded-files';

export class DroppedFilesList extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            this.props.files.length > 0 && (
                <div className={classes.list}>
                    <List
                        dense
                        component="div"
                        subheader={
                            <ListSubheader component="div" disableSticky={true} className={classes.listSubHeader}>
                                { this.props.files.length > 0 && (
                                    <Badge
                                        badgeContent={this.props.files.length}
                                        color="secondary"
                                        classes={{
                                            root: classes.rootBadge,
                                            colorSecondary: classes.secondaryBadge
                                        }}
                                    >
                                        Dropped file{this.props.files.length > 1 && 's'}:
                                    </Badge>
                                )  }


                                { this.props.files.length > 0 && (
                                    <Badge
                                        badgeContent={this.props.uploadedFiles}
                                        color="secondary"
                                        classes={{
                                            root: classes.rootBadge,
                                            colorSecondary: classes.secondaryBadge
                                        }}
                                    >
                                        Uploaded file{this.props.uploadedFiles > 1 && 's'}:
                                    </Badge>
                                )  }


                            </ListSubheader>
                        }
                    >
                        {this.props.files.map( ( file, index ) => (
                            <DroppedFilesListItem  key={index} index={index} file={file} />
                        ) )}
                    </List>
                </div>
            )
        );
    }
}


const mapStateToProps = state => ( {
    files: state.files,
    uploadedFiles: getUploadedFilesNumber( state.files )
} );

export default connect( mapStateToProps )(
    withTheme( withStyles( styles )( DroppedFilesList ) )
);
