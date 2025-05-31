import React, { useRef } from 'react';
import { useDocuments } from '../../hooks/useDocuments';

const UploadButton = () => {
  const fileInput = useRef(null);
  const { uploadDocument } = useDocuments();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        await uploadDocument(formData);
        alert('Документ успешно загружен!');
      } catch (error) {
        alert('Ошибка загрузки документа');
      }
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        ref={fileInput}
        onChange={handleUpload}
        hidden
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      />
      <button 
        className="btn-primary"
        onClick={() => fileInput.current.click()}
      >
        📁 Загрузить документ
      </button>
    </div>
  );
};

export default UploadButton;