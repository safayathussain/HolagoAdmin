"use client";
import useImgBBUpload from '@/utils/useImgBBUpload';
import { useState } from 'react';


export default function YourComponent() {
  const [image, setImage] = useState(null);
  const { uploading, error, imageUrl, handleUpload } = useImgBBUpload();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUploadClick = () => {
    handleUpload(image);
  };

  return (
    <main className="my-10">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </main>
  );
}
