import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Error.less'

const Error = () => {
  const navigate = useNavigate()
  return (
    <div className="Wrapper">
      <div>ERROR</div>
      <button onClick={() => navigate('/')}>Go to back</button>
    </div>
  )
}

export default Error
