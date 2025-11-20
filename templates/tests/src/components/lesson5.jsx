import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
  Chip,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson5 = () => {
  const [highlightedTense, setHighlightedTense] = useState(null);
  const navigate = useNavigate();

  const toggleHighlight = (tense) => {
    setHighlightedTense(tense === highlightedTense ? null : tense);
  };

  const examplePairs = [
    {
      presentPerfect: 'She has worked here for five years.',
      pastSimple: 'She worked here from 2015 to 2020.'
    },
    {
      presentPerfect: 'I have never tried sushi.',
      pastSimple: 'I tried sushi last weekend.'
    }
  ];

  const interviewQuestions = [
    'Have you ever met a celebrity?',
    'Have you ever broken a bone?',
    'What did you do when it happened?'
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        2.1 – Teaching Grammar in Context
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            Objective:
          </Typography>
          <Typography variant="body1">
            To enable students to apply grammar effectively in real-life situations through contextualized instruction.
          </Typography>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Grammar Focus: Present Perfect vs Past Simple</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            <b>Example:</b>
            <br />
            "I have visited London three times." → <i>emphasizes experience</i><br />
            "I visited London last year." → <i>states when it happened exactly</i>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 1 – Inductive Practice</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Read the following sentences and identify the difference in usage. Underline the time expressions and decide which tense is used.
          </Typography>

          <Grid container spacing={2}>
            {examplePairs.map((pair, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Paper sx={{ p: 2 }} variant="outlined">
                  <Typography variant="body2">
                    <b>Present Perfect:</b> {pair.presentPerfect}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <b>Past Simple:</b> {pair.pastSimple}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Time Expression Highlight:</Typography>
            <Chip
              label="Present Perfect"
              color={highlightedTense === 'perfect' ? 'primary' : 'default'}
              onClick={() => toggleHighlight('perfect')}
              sx={{ mr: 1 }}
            />
            <Chip
              label="Past Simple"
              color={highlightedTense === 'past' ? 'primary' : 'default'}
              onClick={() => toggleHighlight('past')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 2 – Communicative Exercise</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            <b>"Have You Ever...?" Interview</b><br />
            Instructions: Walk around the room and ask classmates the questions below. Use follow-up questions in Past Simple to learn more details.
          </Typography>
          <List dense>
            {interviewQuestions.map((q, i) => (
              <ListItem key={i}>
                <ListItemText primary={`• ${q}`} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

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
          startIcon={<CheckIcon />}
          onClick={() => alert('Activity Completed!')}
          sx={{ px: 4 }}
        >
          Complete Lesson
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/5')}
          sx={{ px: 4 }}
        >
          Пройти тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson5;