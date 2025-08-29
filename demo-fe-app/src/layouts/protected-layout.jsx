import React from 'react'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  const isLoggedIn = localStorage.getItem('token');
  if(!isLoggedIn) {
    <Navigate to="/login" replace />
  } else {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
  }

}

export default ProtectedLayout