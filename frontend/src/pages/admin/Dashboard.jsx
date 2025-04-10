import React from 'react';
import { Container } from '@mui/material';
import { Box, Grid, Paper, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {
  Phone as PhoneIcon,
  ShoppingCart as CartIcon,
  People as UserIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 2,
      height: '100%',
      bgcolor: 'white',
      border: '1px solid',
      borderColor: 'grey.200'
    }}
  >
    <Box>
      <Typography color="text.secondary" variant="subtitle2" fontWeight={500}>
        {title}
      </Typography>
      <Typography color="text.primary" variant="h4" fontWeight={600} mt={1}>
        {value}
      </Typography>
    </Box>
    <IconButton
      sx={{
        backgroundColor: `${color}15`,
        '&:hover': { backgroundColor: `${color}25` },
        width: 48,
        height: 48,
      }}
    >
      {icon}
    </IconButton>
  </Paper>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '124',
      icon: <PhoneIcon sx={{ color: '#1976d2' }} />,
      color: '#1976d2'
    },
    {
      title: 'Đơn hàng mới',
      value: '45',
      icon: <CartIcon sx={{ color: '#2e7d32' }} />,
      color: '#2e7d32'
    },
    {
      title: 'Khách hàng',
      value: '1,234',
      icon: <UserIcon sx={{ color: '#ed6c02' }} />,
      color: '#ed6c02'
    },
    {
      title: 'Doanh thu tháng',
      value: '45.5M',
      icon: <MoneyIcon sx={{ color: '#9c27b0' }} />,
      color: '#9c27b0'
    }
  ];

  const chartData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Doanh thu (triệu)',
        data: [30, 35, 25, 45, 40, 50, 45, 55, 45, 60, 55, 65],
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const topProducts = [
    { name: 'iPhone 15 Pro Max', price: '34.990.000đ', sold: 45, image: '/images/iphone-15.jpg' },
    { name: 'Samsung Galaxy S24 Ultra', price: '32.990.000đ', sold: 38, image: '/images/s24-ultra.jpg' },
    { name: 'OPPO Find X7 Ultra', price: '29.990.000đ', sold: 32, image: '/images/find-x7.jpg' },
    { name: 'Xiaomi 14 Pro', price: '24.990.000đ', sold: 28, image: '/images/xiaomi-14.jpg' },
  ];

  return (
    <Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '400px',
              width: '900px',
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Doanh thu theo tháng
              </Typography>
              <IconButton>
                <TrendingUpIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: 'calc(100% - 60px)' }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '400px',
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Sản phẩm bán chạy
              </Typography>
            </Box>
            <List sx={{ width: '100%' }}>
              {topProducts.map((product, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar variant="rounded" sx={{ width: 48, height: 48, bgcolor: 'grey.100' }}>
                      <PhoneIcon sx={{ color: 'grey.500' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={500}>
                        {product.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography component="span" variant="body2" color="text.primary" fontWeight={500}>
                          {product.price}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          — Đã bán {product.sold}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 