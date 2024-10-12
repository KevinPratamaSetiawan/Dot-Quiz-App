import React, { useState } from 'react';

const QuizQuestion = ({ question, onNextQuestion, isLastQuestion }) => {
    if (!question) {
        return null;
    }

    const decodeHtmlEntities = (text) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        return textarea.value;
    };

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const { category, difficulty, question: quizQuestion, correct_answer: correctAnswer } = question;

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === correctAnswer;
        let currentAnsweredQuestions = parseInt(localStorage.getItem('currentAnsweredQuestions'), 10) || 0;
        if(selectedAnswer){
            currentAnsweredQuestions++;
            localStorage.setItem('currentAnsweredQuestions', currentAnsweredQuestions);
        }

        if(isLastQuestion){
            localStorage.setItem('currentQuestionsIndex', '0');
            localStorage.setItem('timerLeft', '0');
        }
        onNextQuestion(isCorrect);
        setSelectedAnswer('');
    };

    return (
        <div id='quiz-question-container'>
            <div id='quiz-info'>
                <p>{category}</p>
                <p>{difficulty}</p>
            </div>
            <p id='quiz-question'>{decodeHtmlEntities(quizQuestion)}</p>
            <div id='quiz-option-container'>
                <span>
                    <input
                        type="radio"
                        id="optionTrue"
                        name="answer"
                        value="True"
                        checked={selectedAnswer === "True"}
                        onChange={handleAnswerChange}
                        />
                    <label htmlFor="optionTrue">True</label>
                </span>
                <span>
                    <input
                        type="radio"
                        id="optionFalse"
                        name="answer"
                        value="False"
                        checked={selectedAnswer === "False"}
                        onChange={handleAnswerChange}
                        />
                    <label htmlFor="optionFalse">False</label>
                </span>
            </div>
            <button onClick={handleNextQuestion}>
                {isLastQuestion ? 'Submit' : 'Next'}
            </button>
        </div>
    );
};

export default QuizQuestion;