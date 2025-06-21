import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Item } from '@/types';
import type { Theme } from '@mui/material/styles';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Box,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  useMediaQuery as useMuiMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
  Email as EmailIcon
} from '@mui/icons-material';
import { useItems } from '../hooks/useItems';

const ViewItemsPage: React.FC = () => {
  // Hooks must be called at the top level
  const { items } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const theme = useTheme<Theme>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMuiMediaQuery(theme.breakpoints.down('sm'));

  // Don't return early here, as it would prevent the rest of the component from rendering

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleNextImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex((prev) =>
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  const handleEnquire = () => {
    if (!selectedItem) return;
    const subject = `Enquiry about ${selectedItem.name}`;
    const body = `Hello,%0D%0A%0D%0AI am interested in the following item:%0D%0A%0D%0AItem: ${selectedItem.name}%0D%0AType: ${selectedItem.type}%0D%0ADescription: ${selectedItem.description}%0D%0A%0D%0APlease provide more information.`;
    window.location.href = `mailto:enquiries@example.com?subject=${subject}&body=${body}`;
  };

  const filteredItems = items.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.type.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          View Items
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
      </Box>
      {filteredItems.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary">
            No items found. Try adjusting your search or add a new item.
          </Typography>
        </Box>
      ) : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fill, minmax(280px, 1fr))',
            md: 'repeat(auto-fill, minmax(320px, 1fr))'
          },
          gap: 3,
          p: 2,
          width: '100%',
          '& > *': {
            minWidth: 0, // Prevent flex items from overflowing
          }
        }}>
          {filteredItems.map((item) => (
            <Box key={item.id} sx={{ width: '100%' }}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}>
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <Box sx={{ position: 'relative', width: '100%', pt: '133.33%', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={item.coverImage}
                      alt={item.name}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Type: {item.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Added: {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Item Detail Dialog - Only render if selectedItem exists */}
      {selectedItem && (
        <Dialog
          open={true}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {selectedItem.name}
                <IconButton edge="end" color="inherit" onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ flex: 1, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, p: 2 }}>
                <Box sx={{ flex: '1 1 400px' }}>
                  <Box position="relative">
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 0,
                        paddingBottom: '100%',
                        overflow: 'hidden',
                        borderRadius: 1,
                      }}
                    >
                      <img
                        src={selectedItem.images[currentImageIndex] || selectedItem.coverImage}
                        alt={`${selectedItem.name} - ${currentImageIndex + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    
                    {selectedItem.images.length > 1 && (
                      <>
                        <IconButton
                          onClick={handlePrevImage}
                          sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            },
                          }}
                        >
                          <NavigateBefore />
                        </IconButton>
                        <IconButton
                          onClick={handleNextImage}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            },
                          }}
                        >
                          <NavigateNext />
                        </IconButton>
                      </>
                    )}
                  </Box>
                  
                  {selectedItem.images.length > 1 && (
                    <Box display="flex" gap={1} mt={2} overflow="auto" py={1}>
                      {selectedItem.images.map((img: string, index: number) => (
                        <Box
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: currentImageIndex === index ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
                            opacity: currentImageIndex === index ? 1 : 0.8,
                            '&:hover': {
                              opacity: 1,
                            },
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                <Box sx={{ flex: '1 1 400px' }}>
                  <Typography variant="h5" gutterBottom>
                    {selectedItem.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Type: {selectedItem.type}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    {selectedItem.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Added on: {new Date(selectedItem.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={handleCloseDialog} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EmailIcon />}
                onClick={handleEnquire}
              >
                Enquire
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </Container>
  );
};

export default ViewItemsPage;
