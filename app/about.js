// pages/about.js
import { Container, Typography, Box } from '@mui/material';

export default function AboutPage() {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>About the Pantry</Typography>
        <Typography variant="body1">
          The Pantry Tracker helps you keep an organized inventory of your kitchen pantry. 
          You can add, remove, and track items to ensure you never run out of essential ingredients.
          This tool is designed to make your life easier by providing a clear view of what's in your pantry.
        </Typography>
      </Box>
    </Container>
  );
}
