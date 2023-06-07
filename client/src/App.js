import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Home from './pages/Home'
import PrivateRoute from './routes/privateRoute'
import { ColorSwitchMode, useMode } from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './components/layout/Layout'
import About from './pages/About'
import PublicQuests from './pages/PublicQuests'
import Contacts from './pages/Contacts'
import MyQuests from './pages/MyQuests'
import QuestCreator from './pages/QuestCreate'
import Play from './pages/Play'
import socketIO from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { createWebSocket } from './actions/game'
import TeacherScreen from './components/game/TeacherScreen'
import StudentScreen from './components/game/StudentScreen'
import QuestProfile from './pages/QuestProfile'
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
                <Route path="/myQuests" element={<MyQuests />} />
                <Route path="/myQuests/:userId" element={<QuestCreator />} />
                <Route path="/publicQuests" element={<PublicQuests />} />
                <Route path="/publicQuests/search" element={<PublicQuests />} />
                <Route
                  path="/publicQuests/:questId"
                  element={<QuestProfile />}
                />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<About />} />
                <Route path="/play/teacher/:id" element={<TeacherScreen />} />
                <Route path="/play/student/:id" element={<StudentScreen />} />
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
