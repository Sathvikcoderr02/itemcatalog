import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ChangeEvent } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  AlertColor,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { PhotoCamera, CloudUpload, Close } from '@mui/icons-material';
// Define types locally to avoid import issues
type ItemType = 'Shirt' | 'Pant' | 'Shoes' | 'Sports Gear' | 'Accessories' | 'Outerwear' | 'Underwear' | 'Swimwear' | 'Activewear' | 'Other';

interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  coverImage: string;
  images: string[];
  createdAt: string;
}

interface ItemFormData extends Omit<Item, 'id' | 'createdAt'> {
  // This interface is the same as Item but without id and createdAt
  // as they are generated when the item is created
}

// Import useItems hook using relative path
import { useItems } from '../hooks/useItems';

// Item types for the dropdown
const ITEM_TYPES: ItemType[] = [
  'Shirt',
  'Pant',
  'Shoes',
  'Sports Gear',
  'Accessories',
  'Outerwear',
  'Underwear',
  'Swimwear',
  'Activewear',
  'Other'
];

// Define the schema with proper type validation for ItemType
const schema = yup.object().shape({
  name: yup.string().required('Item name is required'),
  type: yup
    .mixed<ItemType>()
    .oneOf(ITEM_TYPES, 'Please select a valid item type')
    .required('Item type is required'),
  description: yup.string().required('Description is required'),
  coverImage: yup.string().required('Cover image is required'),
  images: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one image is required')
    .required('Images are required')
}) as yup.ObjectSchema<ItemFormData>;

const AddItemPage = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as AlertColor
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ItemFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      type: '' as ItemType,
      description: '',
      coverImage: '',
      images: []
    },
    mode: 'onChange'
  });

  // No need to watch values as we're using controlled components

  const handleCoverImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setSnackbar({
        open: true,
        message: 'Please upload an image file',
        severity: 'error'
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setCoverImagePreview(result);
      setValue('coverImage', result, { shouldValidate: true });
    };
    reader.onerror = () => {
      setSnackbar({
        open: true,
        message: 'Error reading image file',
        severity: 'error'
      });
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const handleAdditionalImagesChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setSnackbar({
        open: true,
        message: 'Some files were not images and were skipped',
        severity: 'warning'
      });
    }

    if (imageFiles.length === 0) return;

    const newImagePreviews: string[] = [];
    let processed = 0;
    const totalFiles = imageFiles.length;

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        newImagePreviews.push(result);
        processed++;

        if (processed === totalFiles) {
          setAdditionalImagesPreview(prev => [...prev, ...newImagePreviews]);
          setValue('images', [...additionalImagesPreview, ...newImagePreviews], { 
            shouldValidate: true 
          });
        }
      };
      reader.onerror = () => {
        processed++;
        console.error('Error reading file:', file.name);
      };
      reader.readAsDataURL(file);
    });
  }, [additionalImagesPreview, setValue]);

  const removeAdditionalImage = useCallback((index: number) => {
    const newImages = [...additionalImagesPreview];
    newImages.splice(index, 1);
    setAdditionalImagesPreview(newImages);
    setValue('images', newImages, { shouldValidate: true, shouldDirty: true });
  }, [additionalImagesPreview, setValue]);

  const onSubmit = async (formData: ItemFormData) => {
    try {
      // Validate images
      if (!formData.coverImage || !formData.images || formData.images.length === 0) {
        setSnackbar({
          open: true,
          message: 'Please upload at least one image',
          severity: 'error'
        });
        return;
      }

      // Create new item with current timestamp
      const newItem: Item = {
        ...formData,
        id: Date.now().toString(), // Simple ID generation for demo
        createdAt: new Date().toISOString(),
      };

      // Add item through context
      addItem(newItem);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Item successfully added!',
        severity: 'success'
      });
      
      // Reset form and navigate
      reset();
      setCoverImagePreview('');
      setAdditionalImagesPreview([]);
      
      // Navigate to home after a short delay
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error adding item:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add item. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Form submission handler
  const handleFormSubmit = handleSubmit((data) => {
    return onSubmit(data);
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Item
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 3 }}>
          <Box display="grid" sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Item Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Item Type</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Item Type"
                      value={field.value || ''}
                    >
                      {ITEM_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.type && (
                  <FormHelperText>{errors.type.message}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="h6" gutterBottom>
                Cover Image
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    fullWidth
                  >
                    Upload Cover Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                  </Button>
                  {coverImagePreview && (
                    <Box mt={2}>
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="h6" gutterBottom>
                Additional Images
              </Typography>
              <Box>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  fullWidth
                >
                  Upload Additional Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleAdditionalImagesChange}
                  />
                </Button>
                <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                  {additionalImagesPreview.map((image, index) => (
                    <Box key={index} position="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeAdditionalImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'grey.200' }
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            
            <Box mt={4} display="flex" justifyContent="space-between" sx={{ gridColumn: '1 / -1' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isDirty || !isValid}
              >
                Add Item
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddItemPage;
