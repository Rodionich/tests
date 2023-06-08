import React from 'react'
import Quest from './Quest'

function QuestList({ questsList }) {
  return (
    <>
      {questsList?.map(quest => (
        <Quest key={quest._id} quest={quest} />
      ))}
    </>
  )
}

export default QuestList
