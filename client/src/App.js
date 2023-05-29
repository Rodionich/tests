import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Home from './pages/Home'
import PrivateRoute from './routes/privateRoute'
import { ColorSwitchMode, useMode } from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './components/layout/Layout'
import About from './pages/About'
import PublicQuizes from './pages/PublicQuizes'
import Contacts from './pages/Contacts'
import MyQuizes from './pages/MyQuizes'
import QuizCreator from './pages/QuizCreate'
import Play from './pages/Play'
import socketIO from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { createWebSocket } from './actions/game'
import TeacherScreen from './components/game/TeacherScreen'
function App() {
  const [theme, colorMode] = useMode('dark')
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = socketIO.connect('http://localhost:5000')
    dispatch(createWebSocket(socket))
    return () => socket.disconnect()
  }, [dispatch])

  return (
    <ColorSwitchMode.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} />
                <Route path="/myQuizes" element={<MyQuizes />} />
                <Route path="/myQuizes/:userName" element={<QuizCreator />} />
                <Route path="/publicQuizes" element={<PublicQuizes />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<About />} />
                <Route path="/play/teacher/:id" element={<TeacherScreen />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorSwitchMode.Provider>
  )
}

export default App
