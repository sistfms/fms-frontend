import React, { useEffect } from 'react';
import './style.css'
import { Button, Card, Form, Input, Alert } from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { login } from '../../../actions/userActions';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Login = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const loginFormRef = React.useRef();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    console.log("userInfo", userInfo);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    loginFormRef.current.validateFields().then((values) => {
      console.log('values', values);
      dispatch(login(values.email, values.password));
    }).catch((errorInfo) => {
      console.log('errorInfo', errorInfo);
    });
  }

  

  return (
    <div className='loginContainer'>
      <Card className="loginCard" style={{paddingBottom: '0'}}>
        <div>
          <h1 style={{color: '#1890ff', fontSize: '1.5em', margin: '0'}}><LoginOutlined /> Login</h1>
          <p style={{color: '#aaa', margin: '.2em'}}>Enter Credentials to login to your account.</p>
        </div>
        {userLogin.error && <Alert showIcon closable style={{marginTop: '1em'}} type='error' message={userLogin.error} />}
        <Form 
          {...layout} 
          ref={loginFormRef}
          style={{ display: 'flex', justifyContent:'center', flexDirection:'column', marginTop: '1em'}}>
          <Form.Item
            label="Email Address"
            name="email"
            style={{marginBottom: '.3em'}}
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Email is not valid' }
            ]}>
              <Input name='email' placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}>
              <Input.Password name='password' placeholder="Password" />
          </Form.Item>
          <Form.Item style={{marginBottom: '0'}}>
            <Button icon={<LoginOutlined />} type="primary" style={{width: '80%', display:'block', margin: '0 auto'}} htmlType="submit" onClick={submitHandler}>
              Login
            </Button>
            <p style={{color: '#aaa', marginBottom: '0', paddingBottom: '0', textAlign: 'center', marginTop: '.4em'}}>Forgot Password? <a href="/register">Reset Now</a></p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;