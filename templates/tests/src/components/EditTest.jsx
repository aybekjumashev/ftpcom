import React, { useState, useEffect } from 'react';

function EditTest() {
    const [testId, setTestId] = useState('');
    const [testName, setTestName] = useState('');
    const [level, setLevel] = useState('');
    const [questions, setQuestions] = useState([]);
    const [deleteQuestions, setDeleteQuestions] = useState([]);
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', answers: [{ text: '', is_correct: false }] }]);
    };

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers.push({ text: '', is_correct: false });
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (questionId) => {
        setDeleteQuestions([...deleteQuestions, questionId]);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Unauthorized. Please log in.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/admin/edit_test`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    test_id: testId,
                    test_name: testName,
                    level: level,
                    questions: questions,
                    delete_questions: deleteQuestions,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (err) {
            console.error('Error editing test:', err);
            setMessage('Error connecting to the server.');
        }
    };

    return (
        <div>
            <h1>Edit Test</h1>
            <input
                type="text"
                placeholder="Test ID"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            />
            {questions.map((question, qIndex) => (
                <div key={qIndex}>
                    <input
                        type="text"
                        placeholder="Question Text"
                        value={question.text}
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[qIndex].text = e.target.value;
                            setQuestions(updatedQuestions);
                        }}
                    />
                    {question.answers.map((answer, aIndex) => (
                        <div key={aIndex}>
                            <input
                                type="text"
                                placeholder="Answer Text"
                                value={answer.text}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[qIndex].answers[aIndex].text = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                            />
                            <input
                                type="checkbox"
                                checked={answer.is_correct}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[qIndex].answers[aIndex].is_correct = e.target.checked;
                                    setQuestions(updatedQuestions);
                                }}
                            />
                        </div>
                    ))}
                    <button onClick={() => handleAddAnswer(qIndex)}>Add Answer</button>
                    <button onClick={() => handleDeleteQuestion(question.question_id)}>Delete Question</button>
                </div>
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={handleSubmit}>Submit Changes</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditTest;