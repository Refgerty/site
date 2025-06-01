const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post('/api/auth/login', loginHandler);
app.get('/api/documents', authenticateToken, getDocuments);
app.post('/api/documents/upload', authenticateToken, upload.single('file'), uploadDocument);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});