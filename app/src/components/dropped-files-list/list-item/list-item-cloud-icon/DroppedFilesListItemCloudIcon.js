import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../../../withTheme';
import CloudQueue from '@material-ui/icons/CloudQueue';
import CloudDone from '@material-ui/icons/CloudDone';
import styles from './DroppedFilesListItemCloudIcon.styles';
import { startUploadFile } from '../../../../actions/files';


export class DroppedFilesListItemCloudIcon extends React.Component {
    componentDidMount() {
        //TODO : delete this time out, just here to simulate api call
        // setTimeout( () => {
        //     this.props.uploadFile( this.props.index );
        // }, Math.round( Math.random() * ( 5000 - 1000 + 1 ) + 1000 ) );
        this.props.startUploadFile( this.props.index );
    }

    render() {
        const { classes } = this.props;
        return (
            this.props.status === 'queue' ?
                <CloudQueue className={ classes.iconCloud } /> :
                <CloudDone className={ classes.iconCloud } />
        );
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
