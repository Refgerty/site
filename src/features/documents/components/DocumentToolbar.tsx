import { Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function DocumentToolbar() {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => console.log('Upload clicked')}
      >
        Upload Documents
      </Button>
    </Stack>
  );
}