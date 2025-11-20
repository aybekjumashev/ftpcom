import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline,
  Grid, Paper, Avatar, Chip, Divider, Fab, Zoom, IconButton, useMediaQuery,
  useTheme, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Logo from '../assets/education.png';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2b4eff', contrastText: '#fff' },
    secondary: { main: '#ff6d00' },
    background: { default: '#f4f7fe', paper: '#ffffff' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 500, textTransform: 'none' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.8)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(43, 78, 255, 0.15)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px'
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
          overflow: 'hidden',
        },
      },
    },
  },
});

const LessonCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 200,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  cursor: 'pointer',
  background: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(43, 78, 255, 0.12)',
    borderColor: 'rgba(43, 78, 255, 0.2)',
  },
}));

const LessonGrid = styled(Grid)({
  '& > .MuiGrid-item': {
    display: 'flex',
  }
});

function ScrollTop({ children }) {
  const trigger = useMediaQuery('(min-height: 600px)');
  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 32, right: 32 }}>
        {children}
      </Box>
    </Zoom>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const themeHook = useTheme();
  const isMobile = useMediaQuery(themeHook.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    handleMenuClose();
  };

  const lessonBlocks = [
    {
      id: 1,
      name: 'Integrated skills (Foundational Level)',
      lessons: [
        { id: 1, name: 'Listening Skills in ELT: Strategies and Tools', description: 'pre-, while-, post-listening strategiyalari' },
        { id: 2, name: 'Teaching Reading Skills for Comprehension', description: 'Akademik va aniq maqsadli matnlarni o‘qish texnikasi' },
        { id: 3, name: 'Teaching Writing: From Sentences to Paragraphs', description: 'Yozish ko‘nikmasini bosqichma-bosqich shakllantirish usullari' },
        { id: 4, name: 'Integrating CLIL in English Teaching', description: 'Content and Language Integrated Learning and its impact on competence' },
        { id: 5, name: 'Teaching Grammar in Context', description: 'Inductive, deductive and communicative grammar exercises' },
      ],
    },
    {
      id: 2,
      name: 'Intermediate (Core Skills Level)',
      lessons: [
        { id: 6, name: 'Vocabulary Development with Contextualization', description: 'Methods for teaching vocabulary in context using visual aids' },
        { id: 7, name: 'Listening Skills in ELT: Strategies and Tools', description: 'Developing listening skills: pre-, while-, and post-listening strategies' },
        { id: 8, name: 'Teaching Reading Skills for Comprehension', description: 'Techniques for reading academic and purpose-specific texts' },
        { id: 9, name: 'Teaching Writing: From Sentences to Paragraphs', description: 'Step-by-step methods for developing writing skills' },
        { id: 10, name: 'Speaking Skills: Fluency and Accuracy', description: 'Developing speaking skills through role plays, debates and discussions' },
      ],
    },
    {
      id: 3,
      name: 'Advanced (Professional Development Level)',
      lessons: [
        { id: 11, name: 'Pronunciation Teaching with Technology', description: 'Teaching pronunciation through intonation, stress and transcription tools' },
        { id: 12, name: 'Using ICT and Digital Tools in ELT', description: 'Online and offline tools for English teaching (Kahoot, Quizlet, Google Forms etc.)' },
        { id: 13, name: 'Gamification and Interactive Learning', description: 'Student motivation techniques using badges and level systems' },
        { id: 14, name: 'Lesson Planning for Integrated Skills', description: 'Creating lesson plans that cover all four language skills' },
        { id: 15, name: 'Student-Centered Teaching Techniques', description: 'TBLT, pair/group work and other learner-centered approaches' },
      ],
    },
    {
      id: 4,
      name: 'Test',
      lessons: [
        {
          id: 1000,
          name: 'Test',
          description: 'Comprehensive assessment of all learned materials across levels'
        }
      ]
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={Logo} variant="rounded" sx={{ height: 40, width: 40 }} />
            <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={700}>
              Future teachers professional competence
            </Typography>
          </Box>
          {isLoggedIn ? (
            <Box>
              <IconButton color="inherit" onClick={handleMenuClick} size="large" sx={{ color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    minWidth: 200,
                    border: '1px solid rgba(0,0,0,0.05)'
                  }
                }}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                  <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                  <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button component={Link} to="/register" color="inherit" sx={{ px: 2 }}>Register</Button>
              <Button component={Link} to="/login" variant="contained" color="primary"
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: '0 4px 12px rgba(43, 78, 255, 0.2)' } }}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <div id="back-to-top-anchor" />
      <Container maxWidth="xl" sx={{ my: 6, px: { xs: 2, sm: 3 } }}>
        {isLoggedIn ? lessonBlocks.map((block) => (
          <Box key={block.id} sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <MenuBookIcon color="primary" />
              <Typography variant="h5" fontWeight={700}>{block.name}</Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <LessonGrid container spacing={3}>
              {block.lessons.map((lesson) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={lesson.id}>
                  <LessonCard elevation={0} onClick={() => {
                    if (lesson.id === 1000) {
                      navigate('/totaltest');
                    } else {
                      navigate(`/lesson/${lesson.id}`);
                    }
                  }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" fontWeight={600} color="text.primary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.3,
                          flexGrow: 1
                        }}>
                        {lesson.name}
                      </Typography>
                      <Chip label={`#${lesson.id}`} color="secondary" size="small"
                        sx={{
                          ml: 1,
                          flexShrink: 0,
                          height: 24,
                          '& .MuiChip-label': { px: 1 }
                        }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{
                      mb: 2,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.5
                    }}>
                      {lesson.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="text" color="primary" size="small"
                        sx={{
                          px: 0,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline'
                          }
                        }}>
                        {lesson.id === 1000 ? 'Start test →' : 'Start lesson →'}
                      </Button>
                    </Box>
                  </LessonCard>
                </Grid>
              ))}
            </LessonGrid>
          </Box>
        )) : (
          <Box sx={{
            textAlign: 'center',
            mt: { xs: 8, sm: 12 },
            mb: { xs: 8, sm: 12 },
            px: { xs: 0, sm: 4 }
          }}>
            <Typography variant="h2" fontWeight={800} gutterBottom color="primary" sx={{
              fontSize: { xs: '2rem', sm: '3rem' },
              lineHeight: 1.2,
              mb: 3
            }}>
              Welcome to Teacher's Platform
            </Typography>
            <Typography variant="h5" color="text.secondary" mb={6} sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              maxWidth: 700,
              mx: 'auto',
              opacity: 0.8
            }}>
              Professional development courses for educators to enhance teaching skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" component={Link} to="/register" size="large"
                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}>Get Started</Button>
              <Button variant="outlined" color="primary" component={Link} to="/login" size="large"
                sx={{ px: 4, py: 1.5, fontSize: '1rem', borderWidth: 2, '&:hover': { borderWidth: 2 } }}>Sign In</Button>
            </Box>
          </Box>
        )}
      </Container>
      <ScrollTop>
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
}
