import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { BsImageFill } from 'react-icons/bs';
import styles from './ImageDropzone.module.css';
import cx from 'classnames';

const ImageDropzone = ({ getFile }) => {
    const [ previewSrc, setPreviewSrc ] = useState();
    const [ isPreviewAvailable, setIsPreviewAvailable ] = useState();
    
    const onDrop = (files) => {
        const [uploadedFile] = files;
        getFile(uploadedFile);
      
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    };

    return ( 
        <>
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section className={styles.container}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <BsImageFill className={styles.icon} />
                        </div>
                    </section>
                )}
            </Dropzone>

            {previewSrc ? (
                isPreviewAvailable ? (
                <div className={styles.image__preview}>
                    <img className={styles.preview__image} src={previewSrc} alt="Preview" />
                </div>
                ) : (
                <div className={cx(styles.preview__message, styles.cancel)}>
                    <p>No preview available for this file</p>
                </div>
                )
            ) : (
                <div className={styles.preview__message}>
                    <p>Image preview will be shown here after selection</p>
                </div>
            )}
        </>
     );
}
 
export default ImageDropzone;
