import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from '@mui/material';
import {
  Quiz as QuizIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  RateReview as ReflectIcon,
  Feedback as FeedbackIcon,
  Book as JournalIcon,
  School as GrowthIcon
} from '@mui/icons-material';

const Lesson14 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [lessonReflection, setLessonReflection] = useState({
    strengths: '',
    challenges: '',
    improvements: ''
  });
  const [peerFeedback, setPeerFeedback] = useState('');
  const [journalEntry, setJournalEntry] = useState({
    date: '',
    topic: '',
    successes: '',
    improvements: '',
    newIdeas: ''
  });
  const [essay, setEssay] = useState('');

  const reflectionCycle = [
    { step: 1, name: 'Plan', description: 'Prepare your lesson' },
    { step: 2, name: 'Teach', description: 'Deliver the lesson' },
    { step: 3, name: 'Observe', description: 'Notice what happened during the lesson' },
    { step: 4, name: 'Reflect', description: 'Think about what worked and what didn\'t' },
    { step: 5, name: 'Act', description: 'Make changes to improve next time' }
  ];

  const whyReflect = [
    {
      reason: 'Improve teaching skills',
      explanation: 'Identify strengths and areas for improvement'
    },
    {
      reason: 'Adapt to student needs',
      explanation: 'Customize lessons based on student feedback and learning styles'
    },
    {
      reason: 'Professional growth',
      explanation: 'Continuous learning leads to better career opportunities and personal satisfaction'
    }
  ];

  const handleReflectionChange = (field, value) => {
    setLessonReflection(prev => ({ ...prev, [field]: value }));
  };

  const handleJournalChange = (field, value) => {
    setJournalEntry(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 3,
        textAlign: 'center'
      }}>
        4.4 – Reflective Teaching and Professional Growth
      </Typography>

      {/* Module Info */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            Module: Professional Competence
          </Typography>
          <Typography>
            <strong>Objective:</strong> To understand the importance of self-reflection in teaching and how it contributes to professional growth.
          </Typography>
        </CardContent>
      </Card>

      {/* What is Reflective Teaching */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            What is Reflective Teaching?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Reflective teaching is the process where teachers think critically about their teaching practices, analyze what worked well and what didn't, and use this understanding to improve future lessons.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Why Reflect */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Why Reflect?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Reason</strong></TableCell>
                <TableCell><strong>Explanation</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {whyReflect.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{item.explanation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      {/* Reflection Cycle */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Reflection Cycle (Example Model)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {reflectionCycle.map((step) => (
              <ListItem key={step.step}>
                <ListItemIcon>
                  <Chip label={step.step} color="primary" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography fontWeight="bold">{step.name}</Typography>}
                  secondary={step.description}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Task 1: Reflect on Your Own Teaching Practice */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ReflectIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 1: Reflect on Your Own Teaching Practice
            </Typography>
          </Box>
          
          <Typography paragraph>
            Imagine you have just taught a 45-minute English lesson. Answer these questions (80-100 words total):
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={2}
            label="What activities worked well?"
            value={lessonReflection.strengths}
            onChange={(e) => handleReflectionChange('strengths', e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            multiline
            rows={2}
            label="What challenges did you face?"
            value={lessonReflection.challenges}
            onChange={(e) => handleReflectionChange('challenges', e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            multiline
            rows={2}
            label="How will you improve next time?"
            value={lessonReflection.improvements}
            onChange={(e) => handleReflectionChange('improvements', e.target.value)}
            helperText="80-100 words total"
          />
        </CardContent>
      </Card>

      {/* Task 2: Peer Feedback */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FeedbackIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 2: Peer Feedback
            </Typography>
          </Box>
          
          <Typography paragraph>
            In pairs, share your reflections. Give each other:
          </Typography>
          
          <Typography paragraph sx={{ fontStyle: 'italic', pl: 2 }}>
            • 2 positive comments<br />
            • 1 suggestion for improvement
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your feedback to your partner"
            value={peerFeedback}
            onChange={(e) => setPeerFeedback(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Task 3: Keep a Teaching Journal */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <JournalIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 3: Keep a Teaching Journal
            </Typography>
          </Box>
          
          <Typography paragraph>
            Start a journal entry with these sections:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={journalEntry.date}
                onChange={(e) => handleJournalChange('date', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lesson Topic"
                value={journalEntry.topic}
                onChange={(e) => handleJournalChange('topic', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="What went well"
                value={journalEntry.successes}
                onChange={(e) => handleJournalChange('successes', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="What to improve"
                value={journalEntry.improvements}
                onChange={(e) => handleJournalChange('improvements', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="New ideas to try"
                value={journalEntry.newIdeas}
                onChange={(e) => handleJournalChange('newIdeas', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Why is Professional Growth Important */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Why is Professional Growth Important?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Keeps you motivated" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Helps you stay updated with new teaching methods" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Builds confidence and effectiveness as a teacher" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Homework Task */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <GrowthIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Homework Task
            </Typography>
          </Box>
          
          <Typography paragraph>
            Write a short essay (120-150 words) on:
          </Typography>
          
          <Typography paragraph sx={{ fontStyle: 'italic', textAlign: 'center' }}>
            "How reflective teaching can help me become a better English teacher."
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={6}
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            helperText="120-150 words"
          />
        </CardContent>
      </Card>

      {/* Action Buttons - Updated with consistent styling */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2,
        mt: 4,
        mb: 4
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Submitted:", { lessonReflection, peerFeedback, journalEntry, essay })}
          sx={{ px: 4, py: 1.5 }}
        >
          Submit All Tasks
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<JournalIcon />}
          onClick={() => window.open('https://docs.google.com/document', '_blank')}
          sx={{ px: 4, py: 1.5 }}
        >
          Journal Template
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/14')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест по рефлексии
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson14;