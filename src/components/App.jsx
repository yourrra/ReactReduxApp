import './App.less'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from '../page/main/Main'
import Card from '../page/card/Card'
import Error from '../page/Error/Error'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/card/:username/:reponame" element={<Card />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </div>
  )
}

export default App
