import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../withTheme';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Badge from '@material-ui/core/Badge';
import DroppedFilesListItem from './DroppedFilesListItem';

const styles = theme => ( {
    list: {
        width: '100%',
        wordWrap: 'break-word',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.sizeS,
    },
    rootBadge: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    },
    secondaryBadge: {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        marginLeft: theme.spacing.unit
    }
} );

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
                            <ListSubheader component="div" disableSticky={true}>
                                {this.props.files.length > 1 && (
                                    <Badge
                                        badgeContent={this.props.files.length}
                                        color="secondary"
                                        classes={{
                                            root: classes.rootBadge,
                                            colorSecondary: classes.secondaryBadge
                                        }}
                                    >
                                        Dropped file{this.props.files.length > 1 && 's'}
                                    </Badge>
                                )}
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
    files: state.files
} );

export default connect( mapStateToProps )(
    withTheme( withStyles( styles )( DroppedFilesList ) )
);
