import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const BackButton = ({path}) => {
  const navigate = useNavigate()
  return (
    <FontAwesomeIcon style={{
      position: 'absolute',
      top: '1em',
      cursor: 'pointer',
      hover: 'pointer',
      fontSize: '1.2em',
    }} onClick={() => navigate(path)} icon={faArrowLeft} />
  )
}

export default BackButton