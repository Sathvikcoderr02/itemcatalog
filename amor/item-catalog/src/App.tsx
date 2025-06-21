import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button
} from '@mui/material';
import type { Theme } from '@mui/material/styles';

// Import context and pages
import { ItemProvider } from './context/ItemContext';
import ViewItemsPage from './pages/ViewItemsPage';
import AddItemPage from '../src/pages/AddItemPage';

// Create a theme instance with modern design
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#94a3b8',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.04)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    // Update current path when route changes
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ItemProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar 
              position="sticky" 
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)'
                }
              }}
            >
              <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="a" 
                      href="/"
                      sx={{
                        fontWeight: 800,
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mr: 4,
                        '&:hover': {
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Box component="span" sx={{ 
                        background: 'white', 
                        color: '#2563eb',
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }}>
                        IC
                      </Box>
                      ItemCatalog
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                      <Button 
                        href="/" 
                        color="inherit"
                        sx={{
                          fontWeight: currentPath === '/' ? 700 : 500,
                          background: currentPath === '/' ? 'rgba(255,255,255,0.15)' : 'transparent',
                          '&:hover': {
                            background: 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        Browse Items
                      </Button>
                      <Button 
                        href="/add" 
                        color="inherit"
                        sx={{
                          fontWeight: currentPath === '/add' ? 700 : 500,
                          background: currentPath === '/add' ? 'rgba(255,255,255,0.15)' : 'transparent',
                          '&:hover': {
                            background: 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        Add New Item
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      href="/add" 
                      variant="contained" 
                      color="secondary"
                      size="small"
                      startIcon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                      sx={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
                        },
                      }}
                    >
                      Add Item
                    </Button>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            
            <Box component="main" sx={{ flex: 1, py: 4 }}>
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<ViewItemsPage />} />
                  <Route path="/add" element={<AddItemPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </Box>
            
            <Box 
              component="footer" 
              sx={{ 
                py: 4, 
                mt: 'auto', 
                backgroundColor: 'background.paper', 
                borderTop: '1px solid', 
                borderColor: 'divider',
                background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
              }}
            >
              <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date().getFullYear()} ItemCatalog. All rights reserved.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      Terms of Service
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      Privacy Policy
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      Contact Us
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        </Router>
      </ItemProvider>
    </ThemeProvider>
  );
}

export default App;
