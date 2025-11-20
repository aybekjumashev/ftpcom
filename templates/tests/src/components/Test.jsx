import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Paper,
    Modal,
    Fade,
    Backdrop
} from '@mui/material';

function Test() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchTest = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const response = await fetch(`${apiUrl}/test/${testId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTest(data);
                } else if (response.status === 401) {
                    navigate('/login');
                } else if (response.status === 404) {
                    setError('Test not found.');
                } else {
                    setError('Access denied. You must pass previous tests.');
                }
            } catch (err) {
                console.error('Error fetching test:', err);
                setError('Error connecting to the server.');
            }
        };

        fetchTest();
    }, [testId, navigate]);

    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        try {
            const response = await fetch(`${apiUrl}/test/${testId}/submit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers: selectedAnswers }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.passed) {
                    setResult(data.score);
                    setModalOpen(true);
                } else {
                    setError(`You need to score at least 80% to pass. Your score: ${data.score}`);
                }
            } else {
                setError(data.error || 'Failed to submit test.');
            }
        } catch (err) {
            console.error('Error submitting test:', err);
            setError('Error connecting to the server.');
        }
    };

    if (error) {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 10 }}>
                <Paper sx={{
                    p: 4,
                    border: '2px solid #f44336',
                    bgcolor: '#fdecea',
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: 3
                }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        {error.includes('score') ? 'Test Failed' : 'Access Denied'}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>{error}</Typography>
                    <Button variant="contained" onClick={() => navigate('/')}>Return to Home</Button>
                </Paper>
            </Box>
        );
    }

    if (!test) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    textAlign: 'center',
                }}
            >
                <Box sx={{ position: 'relative', width: 100, height: 80, mb: 3 }}>
                    <Box className="book">
                        <Box className="book-cover"></Box>
                        <Box className="book-page"></Box>
                        <Box className="book-page page2"></Box>
                        <Box className="book-page page3"></Box>
                    </Box>
                </Box>
                <Typography variant="h6" sx={{ color: '#444', mb: 1 }}>
                    Opening your test book...
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                    Get ready to learn something new!
                </Typography>
                <style>
                    {`
                        .book {
                            position: relative;
                            width: 100px;
                            height: 80px;
                            transform: perspective(600px) rotateX(10deg);
                        }
                        .book-cover {
                            position: absolute;
                            width: 100px;
                            height: 80px;
                            background: #1976d2;
                            border-radius: 4px;
                            z-index: 1;
                        }
                        .book-page {
                            position: absolute;
                            width: 100px;
                            height: 80px;
                            background: #fff;
                            border-radius: 4px;
                            z-index: 0;
                            animation: flip 2s infinite;
                            transform-origin: left center;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                        }
                        .book-page.page2 { animation-delay: 0.4s; }
                        .book-page.page3 { animation-delay: 0.8s; }

                        @keyframes flip {
                            0% { transform: rotateY(0deg); opacity: 1; }
                            50% { transform: rotateY(-90deg); opacity: 0.5; }
                            100% { transform: rotateY(-180deg); opacity: 0; }
                        }
                    `}
                </style>
            </Box>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <Box sx={{ maxWidth: 800, margin: '40px auto', p: 3 }}>
            <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>{test.name}</Typography>
                <Typography variant="h6" align="center" color="text.secondary" gutterBottom>Level {test.level}</Typography>

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        Question {currentQuestionIndex + 1}/{test.questions.length}:
                    </Typography>
                    <Typography variant="body1" gutterBottom>{currentQuestion.text}</Typography>

                    <RadioGroup
                        value={selectedAnswers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerSelect(currentQuestion.id, parseInt(e.target.value))}
                    >
                        {currentQuestion.answers.map((answer) => (
                            <FormControlLabel
                                key={answer.id}
                                value={answer.id}
                                control={<Radio />}
                                label={answer.text}
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </RadioGroup>
                </Box>

                <Box mt={4} display="flex" justifyContent="space-between">
                    {currentQuestionIndex > 0 && (
                        <Button variant="outlined" onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
                            Previous
                        </Button>
                    )}
                    {currentQuestionIndex < test.questions.length - 1 ? (
                        <Button variant="contained" onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>
                            Next
                        </Button>
                    ) : (
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Modal */}
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    navigate('/');
                }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={modalOpen}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #1976d2',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}>
                        <Typography variant="h5" mb={2}>🎉 Test Completed!</Typography>
                        <Typography variant="h6">Your score: {result}</Typography>
                        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate('/')}>
                            Return to Home
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Test;
