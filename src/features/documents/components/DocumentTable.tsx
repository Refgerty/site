import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { FileDownload, MoreVert } from '@mui/icons-material';

interface Document {
  id: string;
  name: string;
  type: string;
  modified: string;
  size: string;
}

export default function DocumentTable() {
  const documents: Document[] = [
    { id: '1', name: 'Project_Proposal.pdf', type: 'PDF', modified: '2025-06-01', size: '2.4 MB' },
    { id: '2', name: 'Technical_Specs.docx', type: 'Word', modified: '2025-06-02', size: '1.8 MB' }
  ];

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'background.paper' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Modified</TableCell>
            <TableCell>Size</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.modified}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <FileDownload />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}