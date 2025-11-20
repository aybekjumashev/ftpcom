import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Fade
} from '@mui/material';
import {
  PersonAdd as RegisterIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as BackIcon,
  Lock as LockIcon,
  Person as PersonIcon
} from '@mui/icons-material';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', severity: 'error' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setMessage({ text: 'Username and password are required', severity: 'error' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ 
                    text: 'Registration successful! Redirecting to login...', 
                    severity: 'success' 
                });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage({ 
                    text: data.error || 'Registration failed. Please try again.', 
                    severity: 'error' 
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage({ text: 'Error connecting to the server.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm" sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            minHeight: '100vh',
            py: 4
        }}>
            <Box sx={{ mb: 2 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <BackIcon />
                </IconButton>
            </Box>

            <Fade in={true} timeout={500}>
                <Paper elevation={isMobile ? 0 : 4} sx={{ 
                    p: isMobile ? 3 : 4,
                    borderRadius: 4,
                    background: isMobile ? 'transparent' : theme.palette.background.paper,
                    boxShadow: isMobile ? 'none' : theme.shadows[4]
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        mb: 4
                    }}>
                        <RegisterIcon sx={{ 
                            fontSize: 60,
                            color: theme.palette.primary.main,
                            mb: 1
                        }} />
                        <Typography 
                            variant={isMobile ? 'h5' : 'h4'} 
                            component="h1" 
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textAlign: 'center' }}
                        >
                            Create Your Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            Join us to start your learning journey
                        </Typography>
                    </Box>

                    {message.text && (
                        <Alert 
                            severity={message.severity} 
                            sx={{ mb: 3 }}
                            onClose={() => setMessage({ text: '', severity: 'error' })}
                        >
                            {message.text}
                        </Alert>
                    )}

                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        noValidate 
                        sx={{ width: '100%' }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                mt: 1,
                                mb: 2,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: isMobile ? '0.875rem' : '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?
                            </Typography>
                        </Divider>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                size={isMobile ? 'medium' : 'large'}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    textTransform: 'none'
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}

export default Register;