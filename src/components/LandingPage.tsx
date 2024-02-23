import { Container, Typography, Button, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" color="primary" gutterBottom>
            Welcome to Our Course App
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Explore a wide range of courses and enhance your skills with our interactive learning platform.
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
