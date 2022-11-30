import React from 'react'
import { Spinner } from 'react-bootstrap'
import './style.css'

const LoadingIndicator = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  )
}

export default LoadingIndicator;