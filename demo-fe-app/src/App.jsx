import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ProtectedLayout from './layouts/protected-layout'
import AuthLayout from './layouts/auth-layout'

function App() {

  return (
    <Routes>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="" index element={<Home />} />
      </Route>

      <Route path="" element={<AuthLayout />}>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default App
