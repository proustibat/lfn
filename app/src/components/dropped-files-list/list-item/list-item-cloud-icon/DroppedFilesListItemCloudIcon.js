import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../../withTheme';
import IconButton from '@material-ui/core/IconButton';
import CloudQueue from '@material-ui/icons/CloudQueue';
import CloudDone from '@material-ui/icons/CloudDone';
import CloudOff from '@material-ui/icons/CloudOff';
import styles from './DroppedFilesListItemCloudIcon.styles';
import { startUploadFile } from '../../../../actions/files';


export class DroppedFilesListItemCloudIcon extends React.Component {
    componentDidMount() {
        this.props.startUploadFile( this.props.index );
    }

    onRetry = () => {
        this.props.startUploadFile( this.props.index );
    };

    render() {
        const { classes } = this.props;
        let icon;
        switch( this.props.status ) {
        case 'done':
            icon = <CloudDone className={ classes.iconCloud } />;
            break;
        case 'failed':
            icon = (
                <IconButton
                    className={ classes.buttonRetry }
                    aria-label="Retry upload"
                    onClick={this.onRetry}
                    title="Retry to upload"
                >
                    <CloudOff className={ classes.iconCloudRetry } />
                </IconButton>
            );
            break;
        default: // 'queue'
            icon = <CloudQueue className={ classes.iconCloud } />;
            break;
        }
        return icon;
    }
}

const mapStateTopProps = ( state, ownProps ) => ( {
    status: state.files[ ownProps.index ].status
} );

const mapDispatchToProps = dispatch => ( {
    startUploadFile: index => dispatch( startUploadFile( index ) )
} );

export default connect( mapStateTopProps, mapDispatchToProps )(
    withTheme( withStyles( styles )( DroppedFilesListItemCloudIcon ) )
);
