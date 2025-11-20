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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lesson7 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        3.1 Pronunciation Teaching with Technology
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Objectives:</Typography>
          <Typography variant="body1">
            To improve students' pronunciation using digital tools such as speech recognition apps, IPA charts, and video/audio tools.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Content Overview:</Typography>
          <List>
            <ListItem><ListItemText primary="• Word stress: Record vs. reCORD" /></ListItem>
            <ListItem><ListItemText primary="• Sentence stress: 'She CAN come.' vs. 'She can COME.'" /></ListItem>
            <ListItem><ListItemText primary="• Intonation patterns: rising/falling tone" /></ListItem>
            <ListItem><ListItemText primary="• Use of phonemic transcriptions (IPA)" /></ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>Tools:</Typography>
          <List>
            <ListItem><ListItemText primary="• YouGlish" /></ListItem>
            <ListItem><ListItemText primary="• Sounds of Speech (App)" /></ListItem>
            <ListItem><ListItemText primary="• Google Translate's pronunciation tool" /></ListItem>
            <ListItem><ListItemText primary="• ELSA Speak (AI-powered pronunciation coach)" /></ListItem>
          </List>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Assignment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem><ListItemText primary="1. Watch a short video on YouTube about 'English Sentence Stress'." /></ListItem>
            <ListItem><ListItemText primary="2. Practice mimicking the speaker using YouGlish or ELSA." /></ListItem>
            <ListItem><ListItemText primary="3. Submit a short audio recording repeating 5 sentences." /></ListItem>
            <ListItem><ListItemText primary="4. Mark word stress using capital letters (e.g., I 'WANT to 'GO TO the 'STORE.)" /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

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
          onClick={() => navigate('/test/7')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест по произношению
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson7;