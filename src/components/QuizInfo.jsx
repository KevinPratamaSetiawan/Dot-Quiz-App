import React from 'react';

const QuizInfo = ({ currentQuestionsIndex, totalQuestions, timerLeft }) => {
    const playerName = localStorage.getItem('playerName');

    return (
        <div id='quiz-nav'>
            <p>{playerName}</p>
            <p>Nº {currentQuestionsIndex + 1} of {totalQuestions}</p>
            <p>{timerLeft}s</p>
        </div>
    );
};

export default QuizInfo;