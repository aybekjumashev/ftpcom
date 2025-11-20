import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const Lesson2 = () => {
  const [selectedSkimming, setSelectedSkimming] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scanningAnswers, setScanningAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  const correctAnswer = 'B';

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
        1.2 Reading Skills – Academic Text and Tasks (B2 Level)
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📄 Digital Education in the 21st Century</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            Digital education has become an essential part of modern learning. In the 21st century, online platforms such as Coursera, edX, and Udemy have made knowledge accessible to millions around the world. Unlike traditional classrooms, digital learning allows students to study at their own pace and from any location.

            One of the key advantages of digital education is flexibility. Students who have jobs or family responsibilities can benefit from asynchronous lessons and recorded lectures. In addition, new technologies such as artificial intelligence and virtual reality are helping to create more interactive and personalized learning experiences.

            However, digital education also has its challenges. Limited access to the internet, lack of motivation, and reduced face-to-face interaction can affect the learning process. Educators and institutions must find a balance between online and offline teaching to ensure quality education for all.

            In conclusion, digital education is not just a trend — it is a powerful tool that, if used effectively, can transform the way we learn.
          </Typography>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 1 – Skimming (1 minute)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            What is the main idea of the text?
          </Typography>
          <RadioGroup
            value={selectedSkimming}
            onChange={(e) => setSelectedSkimming(e.target.value)}
          >
            <FormControlLabel value="A" control={<Radio />} label="A) Digital education is less effective than traditional education." />
            <FormControlLabel value="B" control={<Radio />} label="B) Digital education is a flexible and powerful tool in the 21st century." />
            <FormControlLabel value="C" control={<Radio />} label="C) Only technology experts can benefit from digital learning." />
            <FormControlLabel value="D" control={<Radio />} label="D) Online learning should replace teachers entirely." />
          </RadioGroup>

          {submitted && (
            <Typography color={selectedSkimming === correctAnswer ? 'green' : 'error'} sx={{ mt: 1 }}>
              {selectedSkimming === correctAnswer
                ? '✅ Correct!'
                : '❌ Incorrect. The correct answer is B.'}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={submitted}
          >
            Submit Answer
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Task 2 – Scanning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="1. Name two online education platforms mentioned in the text."
                value={scanningAnswers.q1}
                onChange={(e) => setScanningAnswers({ ...scanningAnswers, q1: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="2. What are two technologies helping to improve digital education?"
                value={scanningAnswers.q2}
                onChange={(e) => setScanningAnswers({ ...scanningAnswers, q2: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="3. List one advantage and one disadvantage of digital education."
                value={scanningAnswers.q3}
                onChange={(e) => setScanningAnswers({ ...scanningAnswers, q3: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="4. Who especially benefits from flexible learning options?"
                value={scanningAnswers.q4}
                onChange={(e) => setScanningAnswers({ ...scanningAnswers, q4: e.target.value })}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">✍️ Extra Task – Writing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Write a short summary (50–70 words) of the article "Digital Education in the 21st Century."
          </Typography>
          <Typography variant="caption" gutterBottom>
            Use your own words and include the main point and one advantage and disadvantage.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Your summary here..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            sx={{ mt: 2 }}
          />
        </AccordionDetails>
      </Accordion>

      <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('Skimming answer:', selectedSkimming);
            console.log('Scanning:', scanningAnswers);
            console.log('Summary:', summary);
            alert('Your responses have been saved. ✅');
          }}
          sx={{ px: 4 }}
        >
          Submit All Tasks
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/test/2')}
          sx={{ px: 4 }}
        >
          Пройти тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson2;