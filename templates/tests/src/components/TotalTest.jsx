import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  LinearProgress,
  Chip,
} from '@mui/material';
import { PlayCircleOutline, Assignment, Timer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TotalTest = () => {
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();

  const handleStartTest = () => {
    setIsStarting(true);
    // Имитация загрузки теста
    setTimeout(() => {
      navigate('/test/2'); // НУРИК СЮДА САМ ПОСТАВЬ нужный уровень теста 
    }, 1500);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Тест по аудированию (B2 Level)
      </Typography>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Инструкция к тесту
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Assignment color="primary" sx={{ mr: 2 }} />
            <Typography>
              Тест состоит из 10 вопросов по прослушанному аудио
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Timer color="primary" sx={{ mr: 2 }} />
            <Typography>
              Время выполнения: 15 минут
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Chip label="Аудирование" color="primary" sx={{ mr: 1 }} />
            <Chip label="B2 Level" color="secondary" />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', p: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayCircleOutline />}
            onClick={handleStartTest}
            disabled={isStarting}
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
          >
            {isStarting ? 'Загрузка теста...' : 'Начать тест'}
          </Button>
        </CardActions>

        {isStarting && (
          <LinearProgress sx={{ height: 6 }} />
        )}
      </Card>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 3, borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Совет: Перед началом теста убедитесь, что у вас есть хорошее интернет-соединение и наушники.
        </Typography>
      </Box>
    </Box>
  );
};

export default TotalTest;