import React, { useEffect, useState } from 'react';
import './style.css'
import {
  Container,
  FormControl,
  Form,
  Button
} from 'react-bootstrap';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../actions/userActions';

const Login = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    console.log("userInfo", userInfo);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }


  return (
    <Container className="loginContainer">
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="emailId">
          <Form.Label>Email Address</Form.Label>
          <FormControl type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  )
};

export default Login;