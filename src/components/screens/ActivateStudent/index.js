import React from 'react';
import './style.css'
import { Button, Form, Steps, Input } from 'antd';
import { SolutionOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { Step } = Steps;

const ActivateStudent = () => {
  const steps = [{
    title: 'Basic Details',
    icon: <SolutionOutlined />,
    description: 'Review basic details',
  },
  {
    title: 'Credentials',
    icon: <LockOutlined />,
    description: 'Set Login Credentials'
  },
  {
    title: 'Confirm',
    icon: <IdcardOutlined />,
    description: 'Activate your account'
  }
  
];

const formLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const BasicDetails = () => {
  return (
    <div style={{width: '80%'}}>
      <Form  labelCol={{ span: 8 }}
         wrapperCol={{ span: 16 }} >
        <Form.Item
          label="Full Name"
          name="name" required>
            <Input disabled name='name' placeholder="Fee Name" />
        </Form.Item>
        <Form.Item
          label="Batch"
          name="batch" required>
            <Input disabled name='batch' placeholder="Batch" />
        </Form.Item>
        <Form.Item
          label="Roll Number"
          name="rollNumber" required>
            <Input disabled name='rollNumber' placeholder="Roll Number" />
        </Form.Item>
        
        <Form.Item
          label="Email ID"
          name="email"
          required>
            <Input disabled name='name' placeholder="Fee Name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone" required>
            <Input disabled name='name' placeholder="Phone number" />
        </Form.Item>

        <Form.Item
          required  
          label="Gender"
          name>
            <Input disabled name='gender' placeholder="Gender" />
        </Form.Item>
        <p style={{width: '80%', margin: '0 30%'}}>
          <b>Note:</b> You cannot change these details, if any of these details are incorrect, please reach out to the administration office.
        </p>
        
      </Form>
    </div>
  )
}

const Credentials = () => {
  return (
    <div style={{width: '80%'}}>
      <Form  labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }} >
        <Form.Item
          label="Password"
          name="password" required>
            <Input.Password name='password' placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword" required>
            <Input.Password name='confirmPassword' placeholder="Confirm Password" />
        </Form.Item>
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
      <Button type="primary" style={{width: '100%'}}>Login</Button>
    </div>
  )
}



  const [current, setCurrent] = React.useState(0);
  return (
    <>
      <div className="steps-container">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
          <h4>Activate Your Account</h4>
        </div>
        <Steps style={{width: '60%', margin: '1em auto'}} items={steps} current={current} />
        <div className="steps-content">
        {current === 0 && <BasicDetails />}
        {current === 1 && <Credentials />}
        {current === 2 && <ConfirmComponent />}
        </div>  
        <div className='step-actions'>
          <Button type="primary" onClick={() => setCurrent(current + 1)} disabled={current === steps.length - 1}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default ActivateStudent;