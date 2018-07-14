import React from 'react';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles/index';
import withTheme from '../../withTheme';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DroppedFilesList from '../dropped-files-list/DroppedFilesList';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { addFiles } from '../../actions/files';
import styles from './DropZoneUploader.styles';


export class DropZoneUploader extends React.Component {
    state = {
        loading: false,
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
            '.xlsx',
            '.kfx',
            '.sdr',
            '.mobi',
            '.nef',
            '.pptx',
            '.otf',
            '.ttf',
            '.eot',
            '.woff',
            '.woff2',
            '.ttc',
            '.docx',
            '.odt',
            '.eps',
            '.ai',
            '.js',
            '.jsx',
            '.scss',
            '.less',
            '.css',
            '.html',
            '.yml',
            '.ejs',
            '.hbs',
            '.php',
            '.json',
        ].join( ',' ),
    };

    onDrop = acceptedFiles => {
        // TODO: display an error message if rejected because of extension
        // TODO: find a way to check if the files are already dropped
        if( acceptedFiles.length > 0 ) {
            this.setState( () => ( { loading: true } ) );
            const asyncPromises = [ ...acceptedFiles ].map( this.pFileReader );
            let previews;
            Promise.all( asyncPromises ).then( events => {
                previews = events.map( event => event.currentTarget.result );
                const formattedFiles = this.getFormattedFiles( acceptedFiles, previews );
                this.setState( () => ( { loading: false } ) );
                this.props.addFiles( formattedFiles );
            } );
        }
    };

    pFileReader = async file => {
        return new Promise( resolve => {
            const fileReader = new FileReader();
            fileReader.onloadend = resolve;
            fileReader.readAsDataURL( file );
        } );
    };

    getFormattedFiles = ( files, previews ) => {
        return [ ...files ].map( ( file, index ) => {
            if ( file.type.includes( 'image' ) &&
                !file.type.includes( 'photoshop' ) &&
                !file.type.includes( 'svg' )
                && !file.srcPreviewIcon ) {
                file.srcPreviewIcon = previews[index];
            }
            return file;
        } );
    };

    renderDropzoneContent = ( { isDragActive, isDragReject, acceptedFiles, rejectedFiles } ) => {
        if ( isDragReject ) {
            return 'At least one file will be rejected!';
        }
        if ( isDragActive ) {
            return 'Authorized';
        }
        return acceptedFiles.length || rejectedFiles.length
            ? `Accepted ${ acceptedFiles.length } file${ acceptedFiles.length > 1 ? 's' : '' }, rejected ${
                rejectedFiles.length
            } file${ rejectedFiles.length > 1 ? 's' : '' }`
            : 'Drop some files here';
    };

    render() {
        const { classes } = this.props;
        let dropzoneRef;
        return (
            <section>
                <Dropzone
                    className={classes.stripes}
                    ref={node => {
                        dropzoneRef = node;
                    }}
                    onDrop={this.onDrop}
                    accept={this.state.acceptedFiles}
                    maxSize={10000000} // 10mb
                >
                    {this.renderDropzoneContent}
                </Dropzone>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => { dropzoneRef.open(); }}
                >
                    Upload from your device
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>

                { this.state.loading && <LinearProgress /> }

                <DroppedFilesList />
            </section>
        );
    }
}


const mapDispatchToProps = dispatch => ( {
    addFiles: files => dispatch( addFiles( files ) )
} );

export default connect( undefined, mapDispatchToProps )(
    withTheme( withStyles( styles )( DropZoneUploader ) )
);

