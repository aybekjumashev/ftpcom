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
  Link,
  TextField,
  Paper,
  Button
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson10 = () => {
  const videoLinks = [
    { title: 'Video 1', url: 'https://youtu.be/zGCEEfW9j_w?si=Lpkesy2_fd2_Yp-M' },
    { title: 'Video 2', url: 'https://youtu.be/0_zS9G1RV8w?si=KzUbvJoZJYGkYsH7' },
    { title: 'Video 3', url: 'https://youtu.be/WDEDc-IdWCM?si=m_fjtFaHX-3OfQcw' },
    { title: 'Video 4', url: 'https://youtu.be/sFV-LOpSt3A?si=ut6qJDL14uOzlumO' },
    { title: 'Video 5', url: 'https://youtu.be/LTfhpTR4nXg?si=w7c91BWcVpbckmrD' },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        3.4 Watch Videos and Do Analyses
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Objectives:</Typography>
          <Typography>
            To analyze how teachers and learners use technology in real ELT settings and express your opinion.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Task:
          </Typography>
          <Typography gutterBottom>
            Watch the following short videos:
          </Typography>
          <List>
            {videoLinks.map((video, index) => (
              <ListItem key={index}>
                <Link href={video.url} target="_blank" rel="noopener">
                  {video.title}
                </Link>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Fill in an analysis form for each video:
          </Typography>
          <List>
            <ListItem><ListItemText primary="• What tech was used?" /></ListItem>
            <ListItem><ListItemText primary="• How did it help the students?" /></ListItem>
            <ListItem><ListItemText primary="• What could be improved?" /></ListItem>
          </List>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3 }} elevation={2}>
        <Typography variant="h6" gutterBottom>
          Follow-up Assignment
        </Typography>
        <Typography gutterBottom>
          Write a short reflection (100–150 words):
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          "How do you plan to use similar tools in your future lessons?"
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Start your reflection here..."
        />
      </Paper>

      <Box sx={{ 
        textAlign: 'center', 
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
        gap: 2
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/10')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест по видеоанализу
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson10;