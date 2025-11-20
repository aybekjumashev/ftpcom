import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Chip,
  Grid
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson3 = () => {
  const [task1Answers, setTask1Answers] = useState({ a: '', b: '', c: '' });
  const [task3Text, setTask3Text] = useState('');
  const navigate = useNavigate();

  const handleTask1Change = (key, value) => {
    setTask1Answers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Task 1:', task1Answers);
    console.log('Task 3 Paragraph:', task3Text);
    alert('Responses submitted!');
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        1.3 Teaching Writing: From Sentences to Paragraphs
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            TASK 1: Sentence Construction (Grammar Focus)
          </Typography>
          <Typography gutterBottom>
            Reorder the following words to make a correct and meaningful sentence:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="a) important / education / for / English / is / communication" />
            </ListItem>
            <TextField
              fullWidth
              label="Your Answer (a)"
              value={task1Answers.a}
              onChange={(e) => handleTask1Change('a', e.target.value)}
              sx={{ mb: 2 }}
            />
            <ListItem>
              <ListItemText primary="b) students / online / prefer / many / learning" />
            </ListItem>
            <TextField
              fullWidth
              label="Your Answer (b)"
              value={task1Answers.b}
              onChange={(e) => handleTask1Change('b', e.target.value)}
              sx={{ mb: 2 }}
            />
            <ListItem>
              <ListItemText primary="c) grow / help / social / platforms / learning / can" />
            </ListItem>
            <TextField
              fullWidth
              label="Your Answer (c)"
              value={task1Answers.c}
              onChange={(e) => handleTask1Change('c', e.target.value)}
            />
          </List>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">TASK 2: Paragraph Structure Identification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            <strong>Paragraph:</strong>
            <br />
            Learning a second language has many benefits. Firstly, it improves memory and problem-solving skills.
            Secondly, it allows people to communicate with others from different countries and cultures. In addition,
            bilingual individuals have better job opportunities in many fields. For these reasons, studying a second
            language can be a valuable investment in the future.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" gutterBottom>
            🔹 Identify:
          </Typography>
          <List>
            <ListItem><ListItemText primary="• Topic sentence: Learning a second language has many benefits." /></ListItem>
            <ListItem><ListItemText primary="• Supporting details: Improves memory, communication, job opportunities." /></ListItem>
            <ListItem><ListItemText primary="• Concluding sentence: Studying a second language can be a valuable investment in the future." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Card sx={{ my: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            TASK 3: Guided Paragraph Writing
          </Typography>
          <Typography gutterBottom>
            ✍️ Write a well-structured paragraph (80–100 words) on the topic:
            <br />
            <strong>"Why is learning English important for university students?"</strong>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Include: Topic sentence – 2–3 supporting sentences – 1 concluding sentence
          </Typography>
          <TextField
            multiline
            rows={5}
            fullWidth
            placeholder="Type your paragraph here..."
            value={task3Text}
            onChange={(e) => setTask3Text(e.target.value)}
          />
        </CardContent>
      </Card>

      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">(Optional) TASK 4: Peer Feedback Activity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem><ListItemText primary="• Is there a clear topic sentence?" /></ListItem>
            <ListItem><ListItemText primary="• Are the ideas logically connected?" /></ListItem>
            <ListItem><ListItemText primary="• Are there grammar or punctuation errors?" /></ListItem>
            <ListItem><ListItemText primary="• Does the concluding sentence summarize the paragraph?" /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ✅ Assessment Rubric (5-point scale):
          </Typography>
          <Grid container spacing={2}>
            {[
              { criterion: 'Content Relevance' },
              { criterion: 'Paragraph Structure' },
              { criterion: 'Grammar & Mechanics' },
              { criterion: 'Vocabulary Use' },
              { criterion: 'Linking & Cohesion' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="body2">
                  <strong>{item.criterion}:</strong> Excellent (5), Good (4), Fair (3), Needs Improvement (2–1)
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={handleSubmit}
          sx={{ px: 4 }}
        >
          Submit All Tasks
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/test/3')}
          sx={{ px: 4 }}
        >
          Пройти тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson3;