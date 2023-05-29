import React from 'react'
import Quiz from './Quiz'

function QuizList({ quizzesList }) {
  return (
    <>
      {quizzesList.map(quiz => (
        <Quiz key={quiz.id} quiz={quiz} />
      ))}
    </>
  )
}

export default QuizList
