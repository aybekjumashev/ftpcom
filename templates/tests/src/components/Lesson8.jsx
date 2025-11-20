import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Divider,
  Button
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson8 = () => {
  const tools = [
    { name: 'Google Forms', purpose: 'Quizzes, feedback collection' },
    { name: 'Kahoot', purpose: 'Live classroom games' },
    { name: 'Quizlet', purpose: 'Flashcards, vocabulary review' },
    { name: 'Padlet', purpose: 'Brainstorming, collaborative wall' },
    { name: 'Canva', purpose: 'Create visual aids, posters' },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        3.2 Using ICT and Digital Tools in ELT
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Objectives:</Typography>
          <Typography variant="body1" gutterBottom>
            To integrate information and communication technology (ICT) into language teaching to increase student engagement.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Suggested Tools & Uses:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Tool</Typography>
            {tools.map((tool, index) => (
              <Typography key={index} sx={{ mb: 0.5 }}>{tool.name}</Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Purpose</Typography>
            {tools.map((tool, index) => (
              <Typography key={index} sx={{ mb: 0.5 }}>{tool.purpose}</Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Task (Pair Work):
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Create a 5-question quiz on Google Forms about 'Travel Vocabulary'." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Design a Quizlet set for 10 new phrasal verbs." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Present the tools in class with demo links or screenshots." />
            </ListItem>
          </List>
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
          color="primary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/8')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест по цифровым инструментам
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson8;