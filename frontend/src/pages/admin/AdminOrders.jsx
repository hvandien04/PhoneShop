import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã giao':
        return 'success';
      case 'Đang giao':
        return 'info';
      case 'Đã hủy':
        return 'error';
      default:
        return 'warning';
    }
  };

  const orders = [
    {
      id: 'DH001',
      customer: 'Nguyễn Văn A',
      date: '2024-02-20',
      total: 34990000,
      status: 'Đã giao',
      payment: 'COD',
      items: 2,
    },
    {
      id: 'DH002',
      customer: 'Trần Thị B',
      date: '2024-02-20',
      total: 32990000,
      status: 'Đang giao',
      payment: 'Banking',
      items: 1,
    },
    {
      id: 'DH003',
      customer: 'Lê Văn C',
      date: '2024-02-19',
      total: 29990000,
      status: 'Chờ xác nhận',
      payment: 'Momo',
      items: 3,
    },
    {
      id: 'DH004',
      customer: 'Phạm Thị D',
      date: '2024-02-19',
      total: 24990000,
      status: 'Đã hủy',
      payment: 'COD',
      items: 1,
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Quản lý đơn hàng
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box mb={3} display="flex" gap={2}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Button
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Lọc
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell align="center">Ngày đặt</TableCell>
                <TableCell align="center">Số SP</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="center">PTTT</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell align="center">{formatDate(order.date)}</TableCell>
                  <TableCell align="center">{order.items}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={500}>
                      {formatPrice(order.total)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{order.payment}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleClick(e, order)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            Xem chi tiết
          </MenuItem>
          {selectedOrder?.status === 'Chờ xác nhận' && (
            <MenuItem onClick={handleClose}>
              Xác nhận đơn hàng
            </MenuItem>
          )}
          {selectedOrder?.status === 'Đang giao' && (
            <MenuItem onClick={handleClose}>
              Cập nhật trạng thái
            </MenuItem>
          )}
          {selectedOrder?.status === 'Chờ xác nhận' && (
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
              Hủy đơn hàng
            </MenuItem>
          )}
        </Menu>
      </Paper>
    </Box>
  );
};

export default AdminOrders; 