import React, { useEffect } from 'react';
import './style.css'
import { Button, Form, Steps, Input, message, Skeleton } from 'antd';
import { SolutionOutlined, LockOutlined, IdcardOutlined, LoadingOutlined } from '@ant-design/icons';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



const ActivateStudent = () => {

  let location = useLocation();
  const navigate = useNavigate();
  let searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = React.useState(0);
  const [studentDetails, setStudentDetails] = React.useState({});
  const [studentDetailsLoading, setStudentDetailsLoading] = React.useState(false);
  const [tokenError, setTokenError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  // Components
  const BasicDetails = () => {
    if (studentDetailsLoading) 
      return <Skeleton active />
    return (
      <div style={{width: '80%'}}>
        <Form  labelCol={{ span: 8 }}
           wrapperCol={{ span: 16 }} >
          <Form.Item
            label="Full Name"
            name="name" required>
              <Input defaultValue={studentDetails.name} disabled name='name' />
          </Form.Item>
          <Form.Item
            label="Batch"
            name="batch" required>
              <Input defaultValue={studentDetails.batch_name} disabled name='batch' placeholder="Batch" />
          </Form.Item>
          <Form.Item
            label="Roll Number"
            name="rollNumber" required>
              <Input defaultValue={studentDetails.roll_number} disabled name='rollNumber' placeholder="Roll Number" />
          </Form.Item>
          
          <Form.Item
            label="Email ID"
            name="email"
            required>
              <Input defaultValue={studentDetails.email} disabled name='name' placeholder="Fee Name" />
          </Form.Item>
  
          <Form.Item
            label="Phone Number"
            name="phone" required>
              <Input defaultValue={studentDetails.phone_number} disabled name='name' placeholder="Phone number" />
          </Form.Item>
  
          <Form.Item
            required  
            label="Gender"
            name>
              <Input defaultValue={studentDetails.gender} disabled name='gender' placeholder="Gender" />
          </Form.Item>
          <p style={{width: '80%', margin: '0 30%'}}>
            <b>Note:</b> You cannot change these details, if any of these details are incorrect, please reach out to the administration office.
          </p>
          
        </Form>
      </div>
    )
  }
  
  const ConfirmComponent = () => {
    return (
     <div style={{width: '50%', display:'flex', flexDirection:'column', margin: '0 auto'}}>
        <FontAwesomeIcon icon={faCheckCircle} style={{fontSize: '5em', color: '#52c41a', margin: '0 auto'}} />
        <h4 style={{textAlign: 'center'}}>Your account has been activated successfully</h4>
        <p style={{textAlign: 'center'}}>You can now login to your account</p>
        <Button type="primary" style={{width: '100%'}} onClick={() => navigate('/login')}>Login</Button>
      </div>
    )
  }

  const steps = [{
    title: 'Basic Details',
    icon: studentDetailsLoading ? <><LoadingOutlined /></> : <SolutionOutlined />,
    description: 'Review basic details',
  },
  {
    title: 'Credentials',
    icon: loading ? <LoadingOutlined /> : <LockOutlined />,
    description: 'Set Login Credentials'
  },
  {
    title: 'Confirm',
    icon: <IdcardOutlined />,
    description: 'Activate your account'
  }
  
];


  
  const fetchStudentDetails = async () => {
    try {
      setStudentDetailsLoading(true);
      const response = await axios.get(`/students/getStudentByToken?token=${token}`)
      setStudentDetails(response.data);
      if(response.data.status === 'ACTIVE'){
        messageApi.success('Your account is already activated');
        setCurrent(2);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('Activation link has expired, please contact the administration office');
      setTokenError(true);
    } finally {
      setStudentDetailsLoading(false);
    }
  }

  const credentialFormRef = React.useRef();
  
  const activateAccount = async () => {
    credentialFormRef.current.validateFields().then(async (values) => {
    if(values.password !== values.confirmPassword) {
      messageApi.error('Password and Confirm Password must be same');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`/students/activateStudent`, {
        password: values.password,
        token
      })
      if(response.status === 200) {
        setCurrent(2);
      }
    } catch (error) {
      messageApi.error('Something went wrong, please try again later');
    }finally{
      setLoading(false);
    }
  }).catch((error) => {
    messageApi.error('Please fill all the fields');
  })
}

const handleNext = () => {
  if (current === 0) {
    setCurrent(1);
  } else if (current === 1) {
    activateAccount();
  }
}


  useEffect(() => {
    if (token)
    fetchStudentDetails();
  }, [token])

  const TokenErrorComponent = () => {
    return (
      <div style={{width: '100%', height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
        <FontAwesomeIcon icon={faExclamationCircle} style={{fontSize: '5em', color: '#f5222d', margin: '0 auto'}} />
        <h4>Activation link has expired, please contact the administration office</h4>
      </div>
    )
  }
  return (
    <>
      { (!token || tokenError) ? <TokenErrorComponent /> : <>
      {contextHolder}
      <div className="steps-container">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
          <h4>Activate Your Account</h4>
        </div>
        <Steps style={{width: '60%', margin: '1em auto'}} items={steps} current={current} />
        <div className="steps-content">
          {current === 0 && <BasicDetails/>}
          
          {current === 1 && <>
            <div style={{width: '80%'}}>
              <Form ref={credentialFormRef} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                <Form.Item
                  label="Password"
                  name="password" 
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 6, message: 'Password must be at least 6 characters' },
                  ]}
                  required>
                    <Input.Password name='password' placeholder="Password" />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword" required>
                    <Input.Password
                      rules={[
                        { required: true, message: 'Confirm Password is required' },
                      ]}
                    name='confirmPassword' placeholder="Confirm Password" />
                </Form.Item>
              </Form>
            </div>
          </>}

          {current === 2 && <ConfirmComponent />}
        
        </div>  
        <div className='step-actions'>
          <Button disabled={current === 2} loading={loading || studentDetailsLoading} type="primary" onClick={() => handleNext()}>Next</Button>
        </div>
      </div></>}
    </>
  );
};

export default ActivateStudent;