import React from 'react';
import Dropzone from 'react-dropzone'
import { withStyles } from "@material-ui/core/styles/index";
import withTheme from "../withTheme";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DroppedFilesList from './DroppedFilesList';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ( {
    stripes: {
        display: 'none',
        // The drop zone is necessary only on desktop
        [ theme.breakpoints.up( 'sm' ) ]: { //TODO: what about tablets or landscape mode on mobile ?!
            display: 'flex',
            width: '100%',
            height: '20rem',
            cursor: 'pointer',
            border: 'solid',
            borderColor: theme.palette.secondary.dark,
            backgroundImage: `repeating-linear-gradient(-45deg, ${ theme.palette.secondary.veryLight }, ${ theme.palette.secondary.veryLight } 10px, ${ theme.palette.secondary.light } 10px, ${ theme.palette.secondary.light } 20px)`,
            animation: 'progress 2s linear infinite !important',
            backgroundSize: '150% 100%',
            marginBottom: theme.spacing.sizeM,
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.secondary.dark,
            fontWeight: 'bold',
        },
    },
    button: {
      marginBottom: theme.spacing.sizeS
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
} );

export class DropZoneFile extends React.Component {
    state = {
        loading: false,
        files: [],
        // https://www.iana.org/assignments/media-types/media-types.xhtml
        acceptedFiles: [
            'image/*',
            'audio/*',
            'text/*',
            'video/*',
            'application/msword',
            'application/pdf',
            'application/xml',
            'application/json',
            'image/vnd.adobe.photoshop',
            'application/epub+zip',
            '.azw3',
            '.xlsx'
        ].join( ',' )
    };

    onDrop = acceptedFiles => {
        console.log( acceptedFiles );
        this.setState( () => ( { loading: true } ) );
        // TODO: find a way to check if the files are already dropped
        const files = [
            ...this.state.files,
            ...acceptedFiles
        ];

        if( files.length > 0 ) {
            const asyncPromises = [ ...files ].map( this.pFileReader );
            let previews;
            Promise
                .all( asyncPromises )
                .then( events => {
                    previews = events.map( event => event.currentTarget.result );
                    const formattedFiles = [ ...files ].map( ( file, index ) => {
                        if( file.type.includes( 'image' ) && !file.type.includes( 'photoshop' ) && !file.srcPreviewIcon ) {
                            file.srcPreviewIcon = previews[ index ];
                        }
                        return file;
                    } );
                    this.setState( () => ( { files: formattedFiles, loading: false } ) );
                } );
        }
    };

    pFileReader = async ( file ) => {
        return new Promise( ( resolve, reject ) => {
            const fileReader = new FileReader();
            fileReader.onloadend = resolve;
            fileReader.readAsDataURL( file );
        });
    };

    onDelete = index => {
        this.setState( () => ( { files: this.state.files.filter( ( file, i ) => i !== index ) } ) )
    };

    renderDropzoneContent = ( { isDragActive, isDragReject, acceptedFiles, rejectedFiles } ) => {
        if ( isDragReject ) {
            return 'At least one file will be rejected!';
        }
        if ( isDragActive ) {
            return 'Authorized';
        }
        return acceptedFiles.length || rejectedFiles.length
            ? `Accepted ${ acceptedFiles.length } file${ acceptedFiles.length > 1 ? 's' : '' }, rejected ${ rejectedFiles.length } file${ rejectedFiles.length > 1 ? 's' : '' }`
            : "Drop some files here";
    };

    render() {
        const { classes } = this.props;
        let dropzoneRef;
        return (
            <section>
                <Dropzone
                    className={ classes.stripes }
                    ref={(node) => { dropzoneRef = node; }}
                    onDrop={ this.onDrop }
                    accept={ this.state.acceptedFiles }
                    maxSize={10000000} // 10mb
                >
                    { this.renderDropzoneContent }
                </Dropzone>

                <Button variant="contained" color="primary" className={classes.button} onClick={() => { dropzoneRef.open() }}>
                    Upload from your device
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>

                { this.state.loading && <LinearProgress /> }

                <DroppedFilesList
                    files={ this.state.files }
                    onDelete={ this.onDelete }
                />

            </section>
        );
    }
};

export default withTheme(
    withStyles( styles )( DropZoneFile )
);
