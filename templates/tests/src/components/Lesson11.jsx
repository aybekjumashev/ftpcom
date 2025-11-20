import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const qualities = [
  {
    quality: 'Leadership',
    description: 'Ability to guide, motivate and inspire students.',
    example: 'A teacher sets learning goals with the class and motivates them to reach higher.',
  },
  {
    quality: 'Communication Skills',
    description: 'Clear instructions, active listening, and effective classroom interaction.',
    example: 'Explaining grammar in simple words and checking if students understand.',
  },
  {
    quality: 'Cultural Sensitivity',
    description: 'Respect and adapt to different cultures and backgrounds.',
    example: 'Avoiding slang or idioms that may confuse international learners.',
  },
  {
    quality: 'Classroom Management',
    description: 'Handle discipline, engagement, and time effectively.',
    example: 'Organizing group work and managing talkative or shy students fairly.',
  },
];

const Lesson11 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        4.1 – Qualities of an Effective English Teacher
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Module:</Typography>
          <Typography sx={{ mb: 1 }}>Professional Competence</Typography>

          <Typography variant="h6" color="secondary">Objective:</Typography>
          <Typography sx={{ mb: 1 }}>
            To identify and develop the key qualities of successful English language teachers.
          </Typography>

          <Typography variant="h6" color="secondary">Target Audience:</Typography>
          <Typography>Future English teachers (pre-service B2-level university students)</Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          🔹 Key Qualities of an Effective English Teacher
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography fontWeight="bold" sx={{ mb: 1 }}>Quality</Typography>
            {qualities.map((q, idx) => (
              <Typography key={idx} sx={{ mb: 1 }}>{q.quality}</Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold" sx={{ mb: 1 }}>Description</Typography>
            {qualities.map((q, idx) => (
              <Typography key={idx} sx={{ mb: 1 }}>{q.description}</Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📌 Real-Life Examples</Typography>
          <List>
            {qualities.map((q, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={<>
                    <strong>{q.quality}:</strong> {q.example}
                  </>}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📝 Task 1: Self-Assessment (Individual)</Typography>
          <Typography gutterBottom>
            Read the qualities above. Reflect on yourself as a future teacher.
          </Typography>
          <Typography gutterBottom>
            Answer the following questions (3–5 sentences per answer):
          </Typography>
          <List>
            <ListItem><ListItemText primary="1. Which quality do you already have?" /></ListItem>
            <ListItem><ListItemText primary="2. Which one do you need to develop more?" /></ListItem>
            <ListItem><ListItemText primary="3. How can you improve it?" /></ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🤝 Task 2: Discussion in Pairs</Typography>
          <Typography gutterBottom>
            Discuss and rank the four qualities from most important to least important.
            Justify your ranking with personal experiences or teaching perspectives.
          </Typography>
          <Typography fontStyle="italic">
            Goal: Encourage critical thinking and verbal communication.
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>📊 Task 3: Mini Survey (Class Activity)</Typography>
          <Typography gutterBottom>
            • Create a Google Form or worksheet with the four qualities.
          </Typography>
          <Typography gutterBottom>
            • Ask 5–10 classmates to rate each quality from 1 (low) to 5 (high).
          </Typography>
          <Typography gutterBottom>
            • Summarize your results using a bar chart or brief oral report in class.
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
          color="primary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/11')}
          sx={{ 
            px: 4, 
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Пройти тест по качествам преподавателя
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson11;