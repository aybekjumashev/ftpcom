import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  TextField,
  Divider,
  Paper,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const ListeningTaskB2 = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedOption, setSelectedOption] = useState('speaking');
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const navigate = useNavigate();

  const handleOptionChange = (option) => setSelectedOption(option);

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>

      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        1.1 Listening Task (B2 Level)
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Topic:</Typography>
          <Typography variant="body1" gutterBottom>
            “The Effects of Social Media on Communication”
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" gutterBottom>🎧 Audio Length: ~1 minute</Typography>

          <Button
            variant="contained"
            startIcon={<PlayIcon />}
            href="https://ttsmp3.com"
            target="_blank"
            sx={{ mt: 1, mb: 2 }}
          >
            Listen to Audio
          </Button>

          <Button
            size="small"
            onClick={() => setShowTranscript(!showTranscript)}
            sx={{ ml: 2 }}
          >
            {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
          </Button>

          {showTranscript && (
            <Paper sx={{ mt: 2, p: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="body2">
                In today’s digital age, social media has drastically changed the way people communicate...
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Pre-listening Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem><ListItemText primary="1. How often do you use social media per day?" /></ListItem>
            <ListItem><ListItemText primary="2. What are the pros and cons of social media in communication?" /></ListItem>
            <ListItem><ListItemText primary="3. Which platform do you use the most and why?" /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">While-listening Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>Answer the following:</Typography>
          <List dense>
            <ListItem><ListItemText primary="1. What is one negative impact of social media mentioned in the audio?" /></ListItem>
            <ListItem><ListItemText primary="2. What percentage of university students prefer texting?" /></ListItem>
            <ListItem><ListItemText primary="3. What is the key to using social media effectively?" /></ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">True / False / Not Given:</FormLabel>

            <Box sx={{ mt: 2 }}>
              <Typography>1. Social media always improves communication.</Typography>
              <RadioGroup row name="q1" value={answers.q1} onChange={handleRadioChange}>
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
                <FormControlLabel value="notgiven" control={<Radio />} label="Not Given" />
              </RadioGroup>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography>2. Emotional intelligence may be reduced due to less face-to-face interaction.</Typography>
              <RadioGroup row name="q2" value={answers.q2} onChange={handleRadioChange}>
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
                <FormControlLabel value="notgiven" control={<Radio />} label="Not Given" />
              </RadioGroup>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography>3. The speaker believes social media should be banned.</Typography>
              <RadioGroup row name="q3" value={answers.q3} onChange={handleRadioChange}>
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
                <FormControlLabel value="notgiven" control={<Radio />} label="Not Given" />
              </RadioGroup>
            </Box>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Post-listening Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label="Option A – Speaking"
              clickable
              color={selectedOption === 'speaking' ? 'primary' : 'default'}
              onClick={() => handleOptionChange('speaking')}
            />
            <Chip
              label="Option B – Writing"
              clickable
              color={selectedOption === 'writing' ? 'primary' : 'default'}
              onClick={() => handleOptionChange('writing')}
            />
          </Box>

          {selectedOption === 'speaking' ? (
            <List>
              <ListItem>
                <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                <ListItemText primary="Do you think social media is more helpful or harmful for students? Why?" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                <ListItemText primary="Give at least 2 reasons and examples from your own experience." />
              </ListItem>
            </List>
          ) : (
            <Box>
              <Typography gutterBottom>✍️ Write a short reflection (100–120 words):</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                “How has social media affected your communication with friends and family?”
              </Typography>
              <Typography variant="caption">
                Use at least 3 academic linkers (e.g., however, in contrast, as a result).
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                placeholder="Start writing your reflection here..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<EditIcon />}
          onClick={() => console.log("User answers:", answers)}
        >
          Submit Task
        </Button>
        <Button
      variant="outlined"
      color="primary"
      onClick={() => navigate('/test/1')}
    >
      Пройти тест
    </Button>
      </Box>
    </Box>
  );
};

export default ListeningTaskB2;
