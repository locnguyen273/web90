import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isLoggedIn = localStorage.getItem('token');
  if (isLoggedIn) {
    <Navigate to="/" replace />
  } else {
    return (
      <div>
        <Outlet />
      </div>
    )
  }

}

export default AuthLayout