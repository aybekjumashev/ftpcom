import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper
} from '@mui/material';

const apiUrl = import.meta.env.VITE_API_URL;
function AddTest() {
  const [testName, setTestName] = useState('');
  const [level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', answers: [{ text: '', is_correct: false }] }]);
  };

  const handleAddAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({ text: '', is_correct: false });
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/admin/add_test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_name: testName, level, questions }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Test added! ID: ${data.test_id}`);
      } else {
        const err = await response.json();
        setMessage(`❌ Error: ${err.error}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Server error.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Test
      </Typography>

      <Box mb={3}>
        <TextField
          label="Test Name"
          variant="outlined"
          fullWidth
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Level"
          type="number"
          variant="outlined"
          fullWidth
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </Box>

      {questions.map((q, qIndex) => (
        <Paper key={qIndex} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Question {qIndex + 1}
          </Typography>

          <TextField
            label="Question Text"
            fullWidth
            variant="outlined"
            value={q.text}
            onChange={(e) => {
              const updated = [...questions];
              updated[qIndex].text = e.target.value;
              setQuestions(updated);
            }}
            sx={{ mb: 2 }}
          />

          {q.answers.map((a, aIndex) => (
            <Box key={aIndex} display="flex" alignItems="center" gap={2} mb={1}>
              <TextField
                label={`Answer ${aIndex + 1}`}
                fullWidth
                variant="outlined"
                value={a.text}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[qIndex].answers[aIndex].text = e.target.value;
                  setQuestions(updated);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={a.is_correct}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[qIndex].answers[aIndex].is_correct = e.target.checked;
                      setQuestions(updated);
                    }}
                  />
                }
                label="Correct"
              />
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={() => handleAddAnswer(qIndex)}
            sx={{ mt: 1 }}
          >
            ➕ Add Answer
          </Button>
        </Paper>
      ))}

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={handleAddQuestion}>
          ➕ Add Question
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          ✅ Submit Test
        </Button>
      </Box>

      {message && (
        <Typography color={message.includes('Error') ? 'error' : 'primary'} mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default AddTest;
