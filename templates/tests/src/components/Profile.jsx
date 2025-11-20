import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Button,
  useMediaQuery,
  useTheme,
  Chip,
  Divider,
  Grid
} from '@mui/material';
import {
  Person as PersonIcon,
  Home as HomeIcon,
  CheckCircle as PassedIcon,
  Cancel as FailedIcon,
  CalendarToday as CalendarIcon,
  Assignment as TestIcon
} from '@mui/icons-material';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data.profile);
                } else if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    navigate('/login');
                } else if (response.status === 404) {
                    setError('Profile not found.');
                } else {
                    setError('Failed to load profile data.');
                }
            } catch (err) {
                console.error('Error:', err);
                setError('Network error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '80vh' 
            }}>
                <CircularProgress size={60} thickness={4} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/login')}
                    fullWidth
                >
                    Go to Login
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ 
            py: isMobile ? 2 : 4,
            minHeight: '100vh'
        }}>
            <Card sx={{ 
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden'
            }}>
                <Box sx={{
                    height: 120,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    position: 'relative'
                }} />

                <CardContent sx={{ position: 'relative', mt: -8 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        mb: 1
                    }}>
                        <Button 
                            variant="outlined" 
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                            size={isMobile ? 'small' : 'medium'}
                        >
                            {isMobile ? 'Home' : 'Back to Home'}
                        </Button>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        mb: 4
                    }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: 'primary.main',
                                fontSize: 42,
                                border: '4px solid white',
                                boxShadow: 3,
                                mb: 2
                            }}
                        >
                            {profile.username
                                ? profile.username.charAt(0).toUpperCase()
                                : <PersonIcon fontSize="large" />}
                        </Avatar>
                        
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {profile.username}
                        </Typography>
                        
                        <Chip
                            icon={<CalendarIcon />}
                            label={`Joined ${formatDate(profile.created_at)}`}
                            variant="outlined"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h5" sx={{ 
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <TestIcon color="primary" />
                        Test Progress
                    </Typography>

                    {profile.progress && profile.progress.length > 0 ? (
                        <TableContainer 
                            component={Paper} 
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                overflow: 'hidden'
                            }}
                        >
                            <Table>
                                <TableHead sx={{ 
                                    backgroundColor: theme.palette.grey[100] 
                                }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Test</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profile.progress.map((test, index) => (
                                        <TableRow 
                                            key={index}
                                            hover
                                            sx={{ 
                                                '&:last-child td': { borderBottom: 0 },
                                                '&:hover': { backgroundColor: theme.palette.action.hover }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography fontWeight="medium">
                                                    {test.test_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {test.passed ? (
                                                    <Chip
                                                        icon={<PassedIcon />}
                                                        label="Passed"
                                                        color="success"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ) : (
                                                    <Chip
                                                        icon={<FailedIcon />}
                                                        label="Failed"
                                                        color="error"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                )}
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Paper elevation={0} sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            backgroundColor: theme.palette.grey[50],
                            borderRadius: 2
                        }}>
                            <Typography variant="body1" color="text.secondary">
                                No test progress available yet.
                            </Typography>
                            <Button 
                                variant="text" 
                                color="primary" 
                                sx={{ mt: 1 }}
                                onClick={() => navigate('/')}
                            >
                                Start Learning Now
                            </Button>
                        </Paper>
                    )}
                </CardContent>
            </Card>

        </Container>
    );
}

export default Profile;