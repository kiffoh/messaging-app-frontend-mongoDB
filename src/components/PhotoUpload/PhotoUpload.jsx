import { useRef } from 'react';
import { FaCamera } from 'react-icons/fa'; // Importing a camera icon (FontAwesome)
import styles from '../UserProfile/userprofile.module.css'

const PhotoUpload = ({file, setFile, className}) => {
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Handle the selected file
    };

    return (
        <div className={`${styles['photo-upload-body']} ${className}`}>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef} // Assign reference
                style={{ display: 'none' }} // Hide the input
                onChange={handleFileChange}
                name="photo"
            />

            {/* Camera icon that triggers the file input */}
            <button type="button" onClick={handleIconClick} style={{ background: 'none', border: 'none' }} className={`${styles['photo-icon']} ${className}`}>
                <FaCamera size={24} />
            </button>

            {/* Display the selected file (optional) */}
            {file ? 
                file.name && <p style={{margin:0}} className={`${styles['file-name']} ${className}`}>Selected file: {file.name}</p>
            :
                <p style={{margin:0}}>No file selected</p>}
        </div>
    );
};


export default PhotoUpload;