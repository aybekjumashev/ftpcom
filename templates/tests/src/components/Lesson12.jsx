import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson12 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        4.2 – Lesson Planning for Integrated Skills
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Module:</Typography>
          <Typography sx={{ mb: 1 }}>Professional Competence</Typography>

          <Typography variant="h6" color="secondary">Objective:</Typography>
          <Typography sx={{ mb: 1 }}>
            To develop the ability to plan effective lessons that integrate all four language skills: listening, speaking, reading, and writing.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          🔍 What is an "Integrated Skills" Lesson?
        </Typography>
        <Typography>
          An integrated skills lesson combines two or more of the four main language skills in a single lesson. For example:
        </Typography>
        <List>
          <ListItem><ListItemText primary="• Reading + Speaking" /></ListItem>
          <ListItem><ListItemText primary="• Listening + Writing" /></ListItem>
          <ListItem><ListItemText primary="• All four skills in one 60–90 minute lesson" /></ListItem>
        </List>
      </Paper>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🧩 Example Structure of an Integrated Skills Lesson
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Topic: "Technology in Education"
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}><strong>Stage</strong></Grid>
            <Grid item xs={4}><strong>Skill(s) Involved</strong></Grid>
            <Grid item xs={4}><strong>Activity Example</strong></Grid>

            <Grid item xs={4}>Lead-in</Grid>
            <Grid item xs={4}>Speaking</Grid>
            <Grid item xs={4}>Pair discussion: "How do you use technology to learn English?"</Grid>

            <Grid item xs={4}>Pre-reading</Grid>
            <Grid item xs={4}>Listening (video)</Grid>
            <Grid item xs={4}>Watch a 1-minute clip about EdTech trends</Grid>

            <Grid item xs={4}>While-reading</Grid>
            <Grid item xs={4}>Reading</Grid>
            <Grid item xs={4}>Read an article on digital classrooms</Grid>

            <Grid item xs={4}>Post-reading</Grid>
            <Grid item xs={4}>Speaking/Writing</Grid>
            <Grid item xs={4}>Discuss in pairs and write a short opinion paragraph</Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>✅ Key Elements in Lesson Planning</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}><strong>Element</strong></Grid>
          <Grid item xs={8}><strong>Description</strong></Grid>

          <Grid item xs={4}>Lesson Objective</Grid>
          <Grid item xs={8}>What will students achieve by the end of the lesson?</Grid>

          <Grid item xs={4}>Materials</Grid>
          <Grid item xs={8}>Texts, videos, apps, whiteboard, handouts</Grid>

          <Grid item xs={4}>Timing</Grid>
          <Grid item xs={8}>Allocate time per stage (e.g., 10 min lead-in, 15 min reading)</Grid>

          <Grid item xs={4}>Interaction</Grid>
          <Grid item xs={8}>Individual / Pair / Group work</Grid>

          <Grid item xs={4}>Assessment</Grid>
          <Grid item xs={8}>How will you measure learning? (quiz, writing, oral feedback)</Grid>
        </Grid>
      </Paper>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📝 Task 1: Identify Skills (Individual)</Typography>
          <Typography gutterBottom>
            Read the mini lesson description below and identify the skills practiced:
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Students watch a short TED video, answer comprehension questions, and then write a short summary to share with their partner.
          </Typography>
          <List>
            <ListItem><ListItemText primary="1. Which skills are used?" /></ListItem>
            <ListItem><ListItemText primary="2. Is this integrated skills? Why?" /></ListItem>
          </List>
          <Typography fontStyle="italic">
            Answer: Short paragraph (50–70 words)
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🤝 Task 2: Plan a Mini Integrated Lesson (Pair Work)</Typography>
          <Typography gutterBottom>
            In pairs, choose a topic (e.g., Travel, Social Media, Environment) and design a 30-minute integrated skills lesson plan.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Include:
          </Typography>
          <List>
            <ListItem><ListItemText primary="• Objectives" /></ListItem>
            <ListItem><ListItemText primary="• Skills used" /></ListItem>
            <ListItem><ListItemText primary="• Steps and timing" /></ListItem>
            <ListItem><ListItemText primary="• Materials" /></ListItem>
            <ListItem><ListItemText primary="• Assessment ideas" /></ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📢 Task 3: Present and Peer Review</Typography>
          <Typography gutterBottom>
            Each group presents its plan in 5 minutes.
          </Typography>
          <Typography gutterBottom>
            Other students give "2 strengths" and "1 suggestion."
          </Typography>
          <Typography fontStyle="italic">
            Soft skills involved: presentation, collaboration, constructive feedback
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>🏠 Homework Task</Typography>
          <Typography gutterBottom>
            Design a full 45-minute lesson that integrates at least 2 skills.
          </Typography>
          <Typography gutterBottom>
            Topic: Free choice (e.g., Healthy Living, Education, Jobs)
          </Typography>
          <Typography>
            Submit a typed lesson plan using the template.
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
          onClick={() => navigate('/test/12')}
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Пройти тест по планированию уроков
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson12;