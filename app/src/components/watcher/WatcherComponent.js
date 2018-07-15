/**
 * Thanks to https://ourcodeworld.com/articles/read/160/watch-files-and-directories-with-electron-framework
 */
import React from 'react';
const electron = window.require( 'electron' );
const dialog = electron.remote.dialog;
const chokidar = window.require( 'chokidar' );

export class WatcherComponent extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            watcher: null,
            showInLogFlag: false,
            activity: null,
            events: []
        };
    }

    componentDidUpdate() {
        console.log( this.state.events );
    }

    selectDirectory = e => {
        console.log( 'selectDirectory' );
        e.preventDefault();
        dialog.showOpenDialog( {
            properties: [ 'openDirectory' ]
        }, path => {
            if( path ) {
                this.startWatcher( path[ 0 ] );
            }
            else {
                console.log( 'No path selected' );
            }
        } );
    };

    startWatcher = path => {
        console.log( 'START WATCHER ' );
        // document.getElementById("start").disabled = true;
        this.setState( () => ( { activity: 'Scanning the path, please wait ...' } ) );
        const watcher = chokidar.watch( path, {
            ignored: /[\/\\]\./,
            persistent: true
        } );

        this.setState( () => ( { watcher } ) );

        this.state.watcher
            .on( 'add', path => {
                console.log( 'File', path, 'has been added' );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `File added: ${ path }`, type: 'new' } );
                }
            } )
            .on( 'addDir', path => {
                console.log( 'Directory', path, 'has been added' );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `Folder added: ${ path }`, type: 'new' } );
                }
            } )
            .on( 'change', path => {
                console.log( 'File', path, 'has been changed' );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `A change ocured: ${ path }`, type: 'change' } );
                }
            } )
            .on( 'unlink', path => {
                console.log( 'File', path, 'has been removed' );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `A file was deleted: ${ path }`, type: 'delete' } );
                }
            } )
            .on( 'unlinkDir', path => {
                console.log( 'Directory', path, 'has been removed' );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `A folder was deleted: ${ path }`, type: 'delete' } );
                }
            } )
            .on( 'error', error => {
                console.log( 'Error happened', error );
                if( this.state.showInLogFlag ){
                    this.addEvent( { text: `An error ocurred: ${ path }`, type: 'delete' } );
                    console.log( error );
                }
            } )
            .on( 'ready', this.onWatcherReady )
            .on( 'raw', ( event, path, details ) => {
                // This event should be triggered everytime something happens.
                // console.log( 'Raw event info:', event, path, details );
            } );
    };

    addEvent = ( { text, type } ) => {
        const events = [ ...this.state.events, { text, type } ];
        this.setState( () => ( { events } ) );
    };

    onWatcherReady = () => {
        console.info( 'From here can you check for real changes, the initial scan has been completed.' );
        this.setState( () => ( { showInLogFlag: true } ) );
        // document.getElementById("stop").style.display = "block";
        this.setState( () => ( {
            activity: 'The path is now being watched'
        } ) );
    };

    stopWatcher = e => {
        e.preventDefault();
        console.log( 'stopWatcher' );
        if( !this.state.watcher ){
            console.log( 'You need to start first the watcher' );
        }
        else {
            this.state.watcher.close();
            // document.getElementById("start").disabled = false;
            this.setState( () => ( {
                showInLogFlag: false,
                activity: 'Nothing is being watched'
            } ) );
        }
    };

    renderEventsLogs = () => {
        return (
            this.state.events.length > 0 &&
            <ul>
                {
                    this.state.events.reverse().map( ( event, index ) => {
                        return <li key={index} className={event.type}>{ event.text }</li>;
                    } )
                }
            </ul>
        );
    };

    render() {

        return (
            <div>
                Hello Watcher
                { this.state.activity && <p>{ this.state.activity }</p> }
                { this.renderEventsLogs() }
                <button onClick={this.selectDirectory}>Start</button>
                <button onClick={this.stopWatcher}>Stop</button>
            </div>
        );
    }
}

export default WatcherComponent;
