import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AdminInstrumentsPage = () => {
  const [fileName, setFileName] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setMessage(`Ready to import ${file.name}. Submit to push to the master instrument list.`);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Instrument catalogue
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Upload broker tokens, manage exchange mappings, and refresh the instrument universe.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Import CSV
              </Typography>
              <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                Select file
                <input type="file" hidden accept=".csv" onChange={handleFileChange} />
              </Button>
              {fileName && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
                  {fileName}
                </Typography>
              )}
            </Box>
            <TextField label="Broker" placeholder="zerodha" fullWidth />
            <TextField label="Token column" placeholder="instrument_token" fullWidth />
            <Button variant="contained" color="primary">
              Import instruments
            </Button>
            {message && <Alert severity="info">{message}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminInstrumentsPage;
