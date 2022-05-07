import React from 'react';
import Button from '@mui/material/Button';
import {
  AppBar, Box,
  Container,
  CssBaseline,
  Stack,
  Toolbar, Typography,
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

export default function App() {
  const theme = createTheme();
  return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar position="relative">
            <Toolbar>
              <Stack direction="row" spacing={2}>
                <Button variant={'contained'} color={'success'} onClick={() => {
                  electron.webServerApi.sendNotification('start');
                  console.info('Starting Server');
                }}>Start</Button>
                <Button variant={'contained'} color={'error'} onClick={() => {
                  electron.webServerApi.sendNotification('stop');
                  console.info('Stopping Server');
                }}>Stop</Button>
              </Stack>
            </Toolbar>
          </AppBar>
          <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
          >
            <Container maxWidth={'sm'}>
              <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
              >
                RUNDOWN
              </Typography>
            </Container>
          </Box>
        </ThemeProvider>
      </>
  );
}
