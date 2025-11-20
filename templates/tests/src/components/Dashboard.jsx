import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, IconButton,
  Paper, useMediaQuery, useTheme, Menu, MenuItem,
  InputAdornment, CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Home as HomeIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';



function Dashboard() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const apiUrl = import.meta.env.VITE_API_URL;

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/dashboard?search=${search}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProgress(data.progress);
        } else {
          setError('Failed to fetch progress data. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Server connection error. Please check your network.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [search, navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { 
      field: 'username', 
      headerName: 'Username', 
      flex: 1, 
      minWidth: 120,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'test_name', 
      headerName: 'Test Name', 
      flex: 1.5, 
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'passed',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      type: 'boolean',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value ? theme.palette.success.light : theme.palette.error.light,
            color: params.value ? theme.palette.success.dark : theme.palette.error.dark,
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
        >
          {params.value ? 'Passed' : 'Failed'}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 3,
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 3,
        mb: 3,
        borderRadius: 3,
        backgroundColor: 'white'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main
          }}>
            Admin Dashboard
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="primary"
                onClick={handleMenuClick}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    minWidth: 180,
                    borderRadius: 2,
                    mt: 1
                  }
                }}
              >
                <MenuItem onClick={() => navigate('/')}>
                  <HomeIcon sx={{ mr: 1 }} />
                  Main Page
                </MenuItem>
                <MenuItem onClick={() => navigate('/add-test')}>
                  <AddIcon sx={{ mr: 1 }} />
                  Add Test
                </MenuItem>
                <MenuItem onClick={() => navigate('/get_test')}>
                  <EditIcon sx={{ mr: 1 }} />
                  Edit Test
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                size={isTablet ? 'small' : 'medium'}
              >
                Main Page
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/add-test')}
                size={isTablet ? 'small' : 'medium'}
              >
                Add Test
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => navigate('/get_test')}
                size={isTablet ? 'small' : 'medium'}
              >
                Edit Test
              </Button>
            </Box>
          )}
        </Box>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by username or test name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              backgroundColor: '#f5f7fa'
            }
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ 
          height: 600, 
          width: '100%',
          '& .MuiDataGrid-root': {
            border: 'none',
            borderRadius: 3
          },
          '& .MuiDataGrid-columnHeaders': { 
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            borderRadius: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'white'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: '#f5f7fa',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3
          }
        }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={progress.map((row, index) => ({ id: index, ...row }))}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              disableSelectionOnClick
              loading={loading}
              sx={{
                boxShadow: 1,
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f5f7fa'
                }
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Dashboard;