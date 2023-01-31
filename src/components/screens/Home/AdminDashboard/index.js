import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (userInfo.role !== 'ADMIN') {
      navigate('/')
    }
  }, [userInfo])
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard