import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../withTheme';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { startGetServerInfo } from '../../actions/server-info';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getQueuedFilesNumber } from '../../selectors/queue-files';

import styles from './ServerInfo.styles';


export class ServerInfo extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            queuedFiles: null
        };
    }

    componentDidMount() {
        this.props.startGetServerInfo();
    }

    componentDidUpdate() {
        if( this.props.queuedFiles !== this.state.queuedFiles ) {
            this.setState( () => ( { queuedFiles: this.props.queuedFiles } ) );
            // last upload from the queue
            if( this.props.queuedFiles === 0 ) {
                this.props.startGetServerInfo();
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Typography variant="headline" component="h3">Server info</Typography>

                {
                    this.props.loading &&
                    this.props.binaryNumber === 0 &&
                    !this.props.lastUpdate &&
                    <LinearProgress variant="query" className={classes.loading} />
                }

                {
                    this.props.binaryNumber > 0 &&
                    <Typography component="div" className={classes.numberInfo}>
                        Total number of “Binary” items:&nbsp;
                        { this.props.loading ?
                            <CircularProgress className={classes.progressNumberInfo} size={17} /> :
                            <span className={classes.nbItem}>{ this.props.binaryNumber }</span>
                        }
                    </Typography>
                }

                {
                    this.props.lastUpdate &&
                    <Typography component="p" className={classes.updateInfo}>
                        Last update:&nbsp;{ moment( this.props.lastUpdate ).format( 'MMMM Do, YYYY, h:mm:ss a' ) }
                    </Typography>
                }

                { this.props.queuedFiles > 0 &&
                    <div className={classes.queuedInfo}>
                        <p>{this.props.queuedFiles} queued files to upload</p>
                        <LinearProgress variant="query" className={classes.loading} />
                    </div>
                }
            </Paper>
        );
    }
}

const mapStateToProps = state => ( {
    binaryNumber: state.serverInfo.binaryNumber,
    lastUpdate: state.serverInfo.lastUpdate,
    loading: state.serverInfo.isLoading,
    queuedFiles: getQueuedFilesNumber( state.files )
} );

const mapDispatchToProps = dispatch => ( {
    startGetServerInfo: () => dispatch( startGetServerInfo() )
} );

export default connect( mapStateToProps, mapDispatchToProps )(
    withTheme( withStyles( styles )( ServerInfo ) )
);
