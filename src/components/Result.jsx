import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const currentScore = parseInt(localStorage.getItem('currentScore'), 10);
    const totalQuestions = parseInt(localStorage.getItem('questionNumber'), 10) || 0;
    const currentAnsweredQuestions = parseInt(localStorage.getItem('currentAnsweredQuestions'), 10) || 0;
    const timerLeft = parseInt(localStorage.getItem('timerLeft'), 10);

    const navigate = useNavigate();

    const handleBackToMenu = (event) => {
        event.preventDefault();
        localStorage.setItem('isAuthenticated', 'false');
        navigate('/');
    };

    return (
        <div id='result-container'>
            <h2>Your Score</h2>
            <h1>{(currentScore/totalQuestions)*100}%</h1>
            <div id='result-data'>
                <div><p>Correct answers</p><span></span><p>{currentScore} out of {totalQuestions}</p></div>
                <div><p>Wrong answers</p><span></span><p>{totalQuestions-currentScore} out of {totalQuestions}</p></div>
                <div><p>Answered Questions</p><span></span><p>{currentAnsweredQuestions} out of {totalQuestions}</p></div>
                <div><p>Time left</p><span></span><p>{timerLeft} out of 300s</p></div>
            </div>
            <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
    );
};

export default Result;