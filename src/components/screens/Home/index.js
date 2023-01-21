import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Departments from '../Departments';
const Home = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

  }, [userInfo]);

  return (
    <>
    <div>Home</div>
    </>
  )
}

export default Home