import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson9 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        3.3 Gamification and Interactive Learning
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Objectives:</Typography>
          <Typography variant="body1" gutterBottom>
            To motivate learners through game elements: points, badges, levels, and competition.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Key Concepts:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Leaderboards (top students of the week)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Digital badges for completed tasks" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Levels: Beginner → Explorer → Master" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mini-challenges & reward systems" />
          </ListItem>
        </List>
      </Paper>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Task (Group Work):
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Design a Gamified Lesson Plan. Include:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="A task with points/badges" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Level system (e.g., complete quiz = unlock next stage)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tools: Classcraft, Edmodo, Wordwall" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight="bold">Example:</Typography>
          <Typography variant="body2">
            Use Kahoot for a vocabulary battle. Top 3 get virtual medals.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ 
        textAlign: 'center', 
        mt: 4,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/6')}
          sx={{ 
            px: 4, 
            py: 1.5,
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.dark'
            }
          }}
        >
          Пройти игровой тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson9;