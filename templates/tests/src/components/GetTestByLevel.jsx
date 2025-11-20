import React, { useState } from 'react';

function GetTestByLevel() {
    const [level, setLevel] = useState('');
    const [testData, setTestData] = useState(null);
    const [newQuestions, setNewQuestions] = useState([]);
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleFetchTest = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Unauthorized. Please log in.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/admin/get_test_by_level`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ level: level }),
            });

            if (response.ok) {
                const data = await response.json();
                setTestData(data.test);
                setMessage('');
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (err) {
            console.error('Error fetching test:', err);
            setMessage('Error connecting to the server.');
        }
    };

    const handleUpdateTest = async () => {
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
                    test_id: testData.test_id,
                    test_name: testData.name,
                    level: testData.level,
                    questions: testData.questions,
                    new_questions: newQuestions,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setNewQuestions([]); // Очищаем новые вопросы после успешного обновления
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (err) {
            console.error('Error updating test:', err);
            setMessage('Error connecting to the server.');
        }
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[index][field] = value;
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].answers[answerIndex][field] = value;
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const handleAddNewQuestion = () => {
        setNewQuestions([...newQuestions, { text: '', answers: [{ text: '', is_correct: false }] }]);
    };

    const handleNewQuestionChange = (index, field, value) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[index][field] = value;
        setNewQuestions(updatedQuestions);
    };

    const handleNewAnswerChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[questionIndex].answers[answerIndex][field] = value;
        setNewQuestions(updatedQuestions);
    };

    const handleAddNewAnswer = (questionIndex) => {
        const updatedQuestions = [...newQuestions];
        updatedQuestions[questionIndex].answers.push({ text: '', is_correct: false });
        setNewQuestions(updatedQuestions);
    };

    return (
        <div>
            <h1>Get Test By Level</h1>
            <input
                type="number"
                placeholder="Enter Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            />
            <button onClick={handleFetchTest}>Fetch Test</button>
            {message && <p>{message}</p>}
            {testData && (
                <div>
                    <h2>Edit Test</h2>
                    <input
                        type="text"
                        placeholder="Test Name"
                        value={testData.name}
                        onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Level"
                        value={testData.level}
                        onChange={(e) => setTestData({ ...testData, level: e.target.value })}
                    />
                    <h3>Questions</h3>
                    {testData.questions.map((question, qIndex) => (
                        <div key={question.question_id}>
                            <input
                                type="text"
                                placeholder="Question Text"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                            />
                            <h4>Answers</h4>
                            {question.answers.map((answer, aIndex) => (
                                <div key={answer.answer_id}>
                                    <input
                                        type="text"
                                        placeholder="Answer Text"
                                        value={answer.text}
                                        onChange={(e) =>
                                            handleAnswerChange(qIndex, aIndex, 'text', e.target.value)
                                        }
                                    />
                                    <input
                                        type="checkbox"
                                        checked={answer.is_correct}
                                        onChange={(e) =>
                                            handleAnswerChange(qIndex, aIndex, 'is_correct', e.target.checked)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <h3>Add New Questions</h3>
                    {newQuestions.map((question, qIndex) => (
                        <div key={qIndex}>
                            <input
                                type="text"
                                placeholder="New Question Text"
                                value={question.text}
                                onChange={(e) => handleNewQuestionChange(qIndex, 'text', e.target.value)}
                            />
                            <h4>Answers</h4>
                            {question.answers.map((answer, aIndex) => (
                                <div key={aIndex}>
                                    <input
                                        type="text"
                                        placeholder="New Answer Text"
                                        value={answer.text}
                                        onChange={(e) =>
                                            handleNewAnswerChange(qIndex, aIndex, 'text', e.target.value)
                                        }
                                    />
                                    <input
                                        type="checkbox"
                                        checked={answer.is_correct}
                                        onChange={(e) =>
                                            handleNewAnswerChange(qIndex, aIndex, 'is_correct', e.target.checked)
                                        }
                                    />
                                </div>
                            ))}
                            <button onClick={() => handleAddNewAnswer(qIndex)}>Add Answer</button>
                        </div>
                    ))}
                    <button onClick={handleAddNewQuestion}>Add New Question</button>
                    <button onClick={handleUpdateTest}>Update Test</button>
                </div>
            )}
        </div>
    );
}

export default GetTestByLevel;