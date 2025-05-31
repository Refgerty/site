import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUploadModal() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => setOpen(true)}
      >
        Upload Documents
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Documents</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '2px dashed',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              bgcolor: 'action.hover'
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography>Drag files here or click to browse</Typography>
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => setFiles([...files, ...Array.from(e.target.files || [])])}
            />
          </Box>

          {files.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Selected Files:</Typography>
              {files.map((file, index) => (
                <Typography key={index}>{file.name}</Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled={files.length === 0}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}