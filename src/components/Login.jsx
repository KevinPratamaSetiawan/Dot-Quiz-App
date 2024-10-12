import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../utils/api';

const LoginForm = () => {
    const [playerName, setPlayerName] = React.useState('');
    const [questionNumber, setQuestionNumber] = React.useState('5');
    const navigate = useNavigate();

    const onPlayerNameChangeEventHandler = (event) => {
        setPlayerName(event.target.value);
    };

    const onQuestionNumberChangeEventHandler = (event) => {
        setQuestionNumber(event.target.value);
    };

    const onStartEventHandler = async (event) => {
        event.preventDefault();
        const questions = await fetchQuestions(questionNumber, 'boolean');

        if (playerName.trim()) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('playerName', playerName);
            localStorage.setItem('questionNumber', questionNumber);
            localStorage.setItem('questions', JSON.stringify(questions));
            localStorage.setItem('currentScore', '0');
            localStorage.setItem('currentQuestionsIndex', '0');
            localStorage.setItem('timerLeft', '0');
            localStorage.setItem('currentAnsweredQuestions', '0');
            console.log(localStorage.getItem('questions'))
            console.log('Navigating to /quiz');
            navigate('/quiz');
        }
    };

    return (
        <div id='login-container'>
            <h1>Login</h1>
            <form onSubmit={onStartEventHandler}>
                <label htmlFor="playerName">Player name</label>
                <input
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={onPlayerNameChangeEventHandler}
                    placeholder='Your name'
                />
                <br />
                <label htmlFor="questionNumber">Number of questions</label>
                <input
                    id="questionNumber"
                    type="number"
                    value={questionNumber}
                    onChange={onQuestionNumberChangeEventHandler}
                />
                <br />
                <button type="submit">Start</button>
            </form>
        </div>
    );
};

export default LoginForm;