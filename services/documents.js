import api from './api';

export const fetchDocuments = async () => {
  const response = await api.get('/documents');
  return response.data;
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};