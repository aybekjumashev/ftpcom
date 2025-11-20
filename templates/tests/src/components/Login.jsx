import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as BackIcon
} from '@mui/icons-material';

function Login() {
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
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: 'Login successful! Redirecting...', severity: 'success' });
                localStorage.setItem('token', data.token);
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMessage({ 
                    text: data.error || 'Login failed. Please check your credentials.', 
                    severity: 'error' 
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage({ text: 'Error connecting to the server.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
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

            <Paper elevation={isMobile ? 0 : 3} sx={{ 
                p: isMobile ? 2 : 4,
                borderRadius: 4,
                background: isMobile ? 'transparent' : theme.palette.background.paper
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    mb: 4
                }}>
                    <LockIcon sx={{ 
                        fontSize: 60,
                        color: theme.palette.primary.main,
                        mb: 1
                    }} />
                    <Typography 
                        variant={isMobile ? 'h5' : 'h4'} 
                        component="h1" 
                        fontWeight="bold"
                        gutterBottom
                    >
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Sign in to continue to your account
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
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Link 
                            component={RouterLink} 
                            to="/forgot-password" 
                            variant="body2"
                            color="text.secondary"
                        >
                            Forgot password?
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            mb: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: isMobile ? '0.875rem' : '1rem'
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            OR
                        </Typography>
                    </Divider>

                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                        Don't have an account?{' '}
                        <Link 
                            component={RouterLink} 
                            to="/register" 
                            color="primary"
                            fontWeight="medium"
                        >
                            Create one
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;