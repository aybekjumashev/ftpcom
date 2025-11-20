import React, { useState, useRef } from 'react';
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
  Divider,
  IconButton,
  useTheme,
  Paper,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Chip
} from '@mui/material';
import {
  VolumeUp as VolumeUpIcon,
  Quiz as QuizIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  Mic as MicIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const EnglishLesson = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(1); // 1 - Listening, 2 - Reading, 3 - Writing, 4 - Speaking
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [peerFeedback, setPeerFeedback] = useState({
    clearTopic: false,
    logicalFlow: false,
    grammarErrors: false,
    goodConclusion: false
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const audioRef = useRef(null);

  // Аудио файлы
  const audioFiles = {
    1: '../src/assets/lesson1.mp3',
    2: '../src/assets/lesson2.mp3',
    3: '../src/assets/lesson3.mp3',
    4: '../src/assets/lesson4.mp3'
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration || 1;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const lessons = {
    1: {
      title: "1.1 Listening Skills in ELT: Strategies and Tools",
      type: "listening",
      content: {/* ... предыдущее содержимое ... */}
    },
    2: {
      title: "1.2 Reading Skills – Academic Text and Tasks (B2 Level)",
      type: "reading",
      content: {/* ... предыдущее содержимое ... */}
    },
    3: {
      title: "1.3 Teaching Writing: From Sentences to Paragraphs",
      type: "writing",
      content: {/* ... предыдущее содержимое ... */}
    },
    4: {
      title: "1.4 Speaking Skills: Fluency and Accuracy",
      type: "speaking",
      content: {
        tasks: [
          // ... предыдущее содержимое ...
        ],
        rubric: {
          title: "Speaking Assessment Rubric (5-point scale):",
          criteria: [
            // ... предыдущее содержимое ...
          ]
        }
      }
    }
  };

  const currentLesson = lessons[activeLesson];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Переключение между уроками */}
      <Box sx={{ display: 'flex', mb: 4, gap: 1 }}>
        {[1, 2, 3, 4].map((lessonNum) => (
          <Button
            key={lessonNum}
            variant={activeLesson === lessonNum ? 'contained' : 'outlined'}
            onClick={() => setActiveLesson(lessonNum)}
            sx={{ flex: 1 }}
          >
            {lessons[lessonNum].type.charAt(0).toUpperCase() + lessons[lessonNum].type.slice(1)}
          </Button>
        ))}
      </Box>

      {/* Аудио плеер (только для урока по аудированию) */}
      {currentLesson.type === 'listening' && (
        <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <audio
            ref={audioRef}
            src={audioFiles[activeLesson]}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
          />
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton 
              color="primary" 
              size="large"
              onClick={handlePlayPause}
              sx={{ width: 56, height: 56 }}
            >
              {isPlaying ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
            </IconButton>
            <Box flexGrow={1}>
              <Typography variant="body1" fontWeight="medium">
                {`Listening Practice: Lesson ${activeLesson}`}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ height: 8, borderRadius: 4, mt: 1 }}
              />
            </Box>
            <IconButton color="primary">
              <VolumeUpIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      <Typography variant="h4" gutterBottom sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 3,
        textAlign: 'center'
      }}>
        {currentLesson.title}
      </Typography>

      {/* Контент урока */}
      {/* ... остальной контент урока ... */}

      {/* Кнопки внизу страницы */}
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
          onClick={() => console.log('Submit all tasks')}
          sx={{ px: 4 }}
        >
          Submit All Tasks
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/test/4')}
          sx={{ px: 4 }}
        >
          Пройти тест
        </Button>
      </Box>

      {/* Таймер для устных ответов (только для speaking) */}
      {currentLesson.type === 'speaking' && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="h6">
            Preparation Time: <strong>02:00</strong>
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<MicIcon />}
          >
            Start Recording
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EnglishLesson;