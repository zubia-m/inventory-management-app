
import { Container, Typography, Box, TextField, Button } from '@mui/material';

export default function ContactPage() {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Contact Us</Typography>
        <Typography variant="body1">
          If you have any questions or feedback, please feel free to reach out.
        </Typography>
        <Box mt={3}>
          <TextField label="Your Email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Message" variant="outlined" fullWidth multiline rows={4} margin="normal" />
          <Button variant="contained" color="primary">Send</Button>
        </Box>
      </Box>
    </Container>
  );
}
