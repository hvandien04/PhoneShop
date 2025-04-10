import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      image: '/images/iphone-15.jpg',
      price: 34990000,
      stock: 15,
      category: 'Apple',
      status: 'Còn hàng',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      image: '/images/s24-ultra.jpg',
      price: 32990000,
      stock: 8,
      category: 'Samsung',
      status: 'Còn hàng',
    },
    {
      id: 3,
      name: 'OPPO Find X7 Ultra',
      image: '/images/find-x7.jpg',
      price: 29990000,
      stock: 0,
      category: 'OPPO',
      status: 'Hết hàng',
    },
    {
      id: 4,
      name: 'Xiaomi 14 Pro',
      image: '/images/xiaomi-14.jpg',
      price: 24990000,
      stock: 12,
      category: 'Xiaomi',
      status: 'Còn hàng',
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 500 }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="center">Tồn kho</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      </Avatar>
                      <Typography variant="body2">{product.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={500}>
                      {formatPrice(product.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.status}
                      color={product.stock > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'error.main', ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminProducts; 