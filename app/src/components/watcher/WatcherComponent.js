/**
 * Thanks to https://ourcodeworld.com/articles/read/160/watch-files-and-directories-with-electron-framework
 */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../withTheme';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './WatcherComponent.styles';
import { addFiles } from '../../actions/files';

const isElectronAvailable = !!( window && window.process && window.process.type );

const electron = isElectronAvailable && window.require( 'electron' );
const dialog = isElectronAvailable && electron.remote.dialog;
const chokidar = isElectronAvailable && window.require( 'chokidar' );
const fs = isElectronAvailable && window.require( 'fs' );
const path = isElectronAvailable && window.require( 'path' );
const app = isElectronAvailable && electron.remote.app;
const currentPath = isElectronAvailable && app.getAppPath();


export class WatcherComponent extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            isElectronAvailable,
            watcher: null,
            showInLogFlag: false,
            activity: null,
            events: [],
            watchedPath: null,
            buttonsEnable: {
                start: true,
                stop: false
            }
        };
    }

    componentDidMount() {
        if( this.state.isElectronAvailable ) {
            const docsDir = path.join( currentPath, 'FHIR' );
            if ( !fs.existsSync( docsDir ) ) {
                fs.mkdirSync( docsDir, 0o777 );
            }
            this.setState( () => ( { watchedPath: docsDir } ) );
            this.startWatcher( docsDir );
        }
    }

    selectDirectory = e => {
        e.preventDefault();
        dialog.showOpenDialog( {
            properties: [ 'openDirectory' ],
            defaultPath: this.state.watchedPath || undefined
        }, path => {
            if( path ) {
                this.setState( () => ( { watchedPath: path[ 0 ] } ) );
                this.startWatcher( path[ 0 ] );
            }
            else {
                this.addEvent( { text: 'No path selected', type: '' } );
            }
        } );
    };

    startWatcher = async pathFile => {
        const watcher = await chokidar.watch( pathFile, {
            ignored: /[/\\]\./,
            persistent: true,
            recursive: true,
        } );

        this.setState( () => ( {
            activity: 'Scanning the path, please wait ...',
            watcher,
            buttonsEnable: { start: false, stop: true }
        } ) );

        this.state.watcher
            .on( 'add', pathFile => {
                this.state.showInLogFlag && this.addEvent( { text: `File added: ${ pathFile }`, type: 'new' } );
                this.onWatchAdd( pathFile );
            } )
            .on( 'addDir', path => {
                this.state.showInLogFlag && this.addEvent( { text: `Folder added: ${ path }`, type: 'new' } );
            } )
            .on( 'change', path => {
                this.state.showInLogFlag && this.addEvent( { text: `A change ocured: ${ path }`, type: 'change' } );
            } )
            .on( 'unlink', path => {
                this.state.showInLogFlag && this.addEvent( { text: `A file was deleted: ${ path }`, type: 'delete' } );
                // TODO: use removeFileAction ?
            } )
            .on( 'unlinkDir', path => {
                this.state.showInLogFlag && this.addEvent( { text: `A folder was deleted: ${ path }`, type: 'delete' } );
            } )
            .on( 'error', error => {
                this.state.showInLogFlag && this.addEvent( { text: `An error ocurred: ${ pathFile } (${ error.toString() })`, type: 'delete' } );
            } )
            .on( 'ready', this.onWatcherReady )
            .on( 'raw', ( event, path, details ) => {
                // This event should be triggered everytime something happens.
                console.log( 'Raw event info:', event, path, details );
            } );
    };

    createFile = ( blob, pathFile ) => {
        const stats = fs.statSync( pathFile );
        const lastModified = stats.mtimeMs;
        const fileName = path.basename( pathFile );
        const pathProperty = pathFile;
        const size = stats.size; // TODO: something is wrong with size!

        const file = new File( [ blob ], fileName, {
            lastModified: lastModified,
            path: pathProperty,
            type: blob.type || 'unknown',
            size
        } ) ;
        this.props.addFiles( [ file ] );
    };

    onWatchAdd = pathFile => {
        const xhr = new XMLHttpRequest();
        const fileName = path.basename( pathFile );
        const extension = ( /[.]/.exec( fileName ) ) ? /[^.]+$/.exec( fileName )[ 0 ] : undefined;
        if( extension && extension === 'pdf' ) {
            xhr.open( 'GET', pathFile );
            xhr.responseType = 'blob';
            xhr.onload = () => { this.createFile( xhr.response, pathFile ); };
            xhr.send();
        }
        else {
            console.log( 'This is not a pdf file, it won\'t be uploaded!' );
        }
    };

    addEvent = ( { text, type } ) => {
        const events = [ ...this.state.events, { text, type } ];
        const maxEvents = 10;
        // Don't want to stock more than maxEvents events
        while( events.length > maxEvents ) {
            events.splice( 0, events.length - maxEvents );
        }
        this.setState( () => ( { events } ) );
    };

    onWatcherReady = () => {
        const activity = `Now watching ${ this.state.watchedPath }. Try to add pdf files in it!`;
        this.setState( () => ( {
            activity,
            showInLogFlag: true
        } ) );
    };

    stopWatcher = e => {
        e.preventDefault();
        if( !this.state.watcher ){
            console.log( 'You need to start first the watcher' );
        }
        else {
            this.state.watcher.close();
            this.setState( () => ( {
                showInLogFlag: false,
                activity: 'Nothing is being watched',
                watchedPath: null,
                buttonsEnable: { start: true, stop: false }
            } ) );
        }
    };

    renderEventsLogs = () => {
        const { classes } = this.props;
        return (
            this.state.events.length > 0 &&
            <ul>
                {
                    [ ...this.state.events ].reverse().map( ( event, index ) => {
                        return (
                            <Typography key={index} component="li" className={[ classes.event, classes[ event.type ] ].join( ' ' )}>
                                • { event.text }
                            </Typography>
                        );
                    } )
                }
            </ul>
        );
    };

    render() {
        const { classes } = this.props;
        if( !this.state.isElectronAvailable ) {
            return null;
        }
        return (
            <Paper className={classes.root}>
                <Typography variant="headline" component="h3">Directory watcher</Typography>
                { this.state.activity &&
                    <Typography component="div" className={classes.activity}>
                        { this.state.activity }
                    </Typography>
                }

                <Button
                    disabled={!this.state.buttonsEnable.start}
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={this.selectDirectory}
                >
                    Start
                </Button>
                <Button
                    disabled={!this.state.buttonsEnable.stop}
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={this.stopWatcher}
                >
                    Stop
                </Button>

                { this.renderEventsLogs() }
            </Paper>
        );
    }
}

const mapDispatchToProps = dispatch => ( {
    addFiles: files => dispatch( addFiles( files ) )
} );

export default connect( undefined, mapDispatchToProps )(
    withTheme( withStyles( styles )( WatcherComponent ) )
);
