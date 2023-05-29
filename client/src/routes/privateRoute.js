import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return user !== null ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoute
