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
  TextField,
  Grid,
  Paper,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const vocabularyData = [
  {
    word: 'Device',
    meaning: 'Qurilma',
    example: 'This device helps you track your heartbeat.',
  },
  {
    word: 'Browse',
    meaning: 'Internetda ko‘rish',
    example: 'I often browse new websites.',
  },
  {
    word: 'Upgrade',
    meaning: 'Yangilash',
    example: 'I need to upgrade my phone.',
  },
  {
    word: 'Install',
    meaning: 'O‘rnatmoq',
    example: 'I installed a new app yesterday.',
  },
  {
    word: 'Notification',
    meaning: 'Bildirishnoma',
    example: 'I get many notifications from Instagram.',
  },
  {
    word: 'Recharge',
    meaning: 'Qayta quvvatlamoq',
    example: 'I need to recharge my battery.',
  },
  {
    word: 'Stream',
    meaning: 'Jonli ko‘rmoq',
    example: 'He likes to stream music on Spotify.',
  },
  {
    word: 'Screen time',
    meaning: 'Ekran vaqti',
    example: 'My screen time is over 5 hours a day.',
  },
  {
    word: 'Download',
    meaning: 'Yuklab olmoq',
    example: 'She downloaded the file in seconds.',
  },
  {
    word: 'Connected',
    meaning: 'Ulangan',
    example: 'We are always connected via Wi-Fi.',
  },
];

const Lesson6 = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e, key) => {
    setAnswers({ ...answers, [key]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        2.2 – Vocabulary Development with Contextualization
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Objective:</Typography>
          <Typography variant="body1">
            Learning and retaining new vocabulary by using context.
          </Typography>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Vocabulary List – Topic: Technology and Daily Life</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {vocabularyData.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 2 }} variant="outlined">
                  <Typography variant="subtitle1" color="primary"><b>{item.word}</b></Typography>
                  <Typography variant="body2"><i>{item.meaning}</i></Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{item.example}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 1 – Vocabulary in Context</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            <b>Fill in the blanks:</b>
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="1. I always ________ movies instead of watching TV."
              />
              <TextField
                size="small"
                onChange={(e) => handleInputChange(e, 'q1')}
                value={answers.q1 || ''}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. My phone died, I need to ________ it."
              />
              <TextField
                size="small"
                onChange={(e) => handleInputChange(e, 'q2')}
                value={answers.q2 || ''}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. How much ________ do you spend every day?"
              />
              <TextField
                size="small"
                onChange={(e) => handleInputChange(e, 'q3')}
                value={answers.q3 || ''}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 2 – Match the Word with Its Meaning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Students match vocabulary words with their meanings in a worksheet format.
          </Typography>
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
          color="success"
          startIcon={<CheckIcon />}
          onClick={() => alert("Submitted for review!")}
          sx={{ px: 4 }}
        >
          Submit Task
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/6')}
          sx={{ px: 4 }}
        >
          Пройти тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson6;