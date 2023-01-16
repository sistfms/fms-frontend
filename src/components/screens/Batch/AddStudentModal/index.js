import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AddStudentModal = ({visible, setVisible, callback}) => {
  const location = useLocation();
  const batchId = location.pathname.split('/')[2];
  const formRef = React.useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const [addStudenLoading, setAddStudentLoading] = React.useState(false);

  const createStudent = async () => {
    formRef.current.validateFields().then(async (values) => {
      try {
        setAddStudentLoading(true);
        const { data } = await axios.post('/students', {
          name: values.name,
          email: values.email,
          batch_id: batchId,
          gender: values.gender,
          phone_number: values.phone
        });
        callback(data)
        setVisible(false);
        formRef.current.resetFields();
      } catch (error) {
        callback(error.response.data);
        console.log(error);
      }finally{
        setAddStudentLoading(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }


  return (

    <Modal title="Add Student" okButtonProps={{ loading: addStudenLoading }} onOk={createStudent} open={visible} onCancel={() => setVisible(false)}>
      {contextHolder}
      <Form 
          ref={formRef}
          {...layout} 
          style={{marginTop: '1em', display: 'flex', justifyContent:'center', flexDirection:'column', padding:'1em 0'}}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a student name!' }]}>
             <Input name='name' placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender' }]}>
                <Select
                placeholder="Select a Gender"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[{ value: 'male', label: 'Male'}, { label: 'Female', value: 'female' }]}
                style={{ width: '100%' }}
              />
            </Form.Item>
          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              { required: true, message: 'Email ID is required' },
              { type: 'email', message: 'Please enter a valid email ID' }
              ]}>
             <Input name='email' placeholder="Email ID" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Phone number is required' },
              ]}>
              <Input name='phone' placeholder="Phone Number" />
          </Form.Item>
        <p style={{margin: 0, padding: 0}}>
          <b>Note:</b> A account activation email will be sent to the student's email ID. The student must fill rest of the details like phone number, password etc. to complete the registration process.
        </p>
        </Form>
    </Modal>
  );
};

export default AddStudentModal;