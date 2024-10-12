import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizInfo from './QuizInfo';
import QuizQuestion from './Question';

const Quiz = () => {
    const navigate = useNavigate();
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    const storedIndex = parseInt(localStorage.getItem('currentQuestionsIndex'), 10) || 0;
    const storedScore = parseInt(localStorage.getItem('currentScore'), 10) || 0;
    const initialTimer = parseInt(localStorage.getItem('timerLeft'), 10) || 300;

    const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(storedIndex);
    const [currentScore, setCurrentScore] = useState(storedScore);
    const [timerLeft, setTimerLeft] = useState(initialTimer);

    useEffect(() => {
        if (currentQuestionsIndex >= questions.length || timerLeft <= 0) {
            localStorage.setItem('currentQuestionsIndex', '0');
            navigate('/result');
        }
    }, [currentQuestionsIndex, timerLeft, navigate, questions.length]);

    const handleNextQuestion = (isCorrect) => {
        if (isCorrect) {
            setCurrentScore(prevScore => prevScore + 1);
        }
        setCurrentQuestionsIndex(prevIndex => prevIndex + 1);
    };

    useEffect(() => {
        localStorage.setItem('currentQuestionsIndex', currentQuestionsIndex);
        localStorage.setItem('currentScore', currentScore);
        localStorage.setItem('timerLeft', timerLeft);
    }, [currentQuestionsIndex, currentScore, timerLeft]);

    useEffect(() => {
        if (timerLeft > 0) {
            const intervalId = setInterval(() => {
                setTimerLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            localStorage.setItem('currentQuestionsIndex', '0');
            navigate('/result');
        }
    }, [timerLeft, navigate]);

    return (
        <div id='quiz-container'>
            <QuizInfo 
                currentQuestionsIndex={currentQuestionsIndex} 
                totalQuestions={questions.length} 
                timerLeft={timerLeft}
            />
            <QuizQuestion
                question={questions[currentQuestionsIndex]}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={currentQuestionsIndex === questions.length - 1}
            />
        </div>
    );
};

export default Quiz;