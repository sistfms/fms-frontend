import React from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';

const CreateDepatmentModal = ({visible, setVisible, callback}) => {

  const [createDepartmentLoading, setCreateDepartmentLoading] = React.useState(false);
  
  // form fields
  const formRef = React.useRef();


  const createDepartment = async () => {
    formRef.current.validateFields().then(async (values) => {
      setCreateDepartmentLoading(true);
      try {
        const { data } = await axios.post('/api/departments', {
          name: values.name,
          code: values.code
        });
        callback(data)
        setVisible(false);
      } catch (error) {
        callback(error.response.data);
        console.log(error);
      }finally{
        setCreateDepartmentLoading(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };


  return (
    <Modal title="Create New Batch" okButtonProps={{ loading: createDepartmentLoading }} onOk={createDepartment} open={visible} onCancel={() => setVisible(false)}>
        <Form 
          ref={formRef}
          {...layout} 
          style={{marginTop: '1em', display: 'flex', justifyContent:'center', flexDirection:'column', padding:'1em 0'}}>
          <Form.Item
            label="Department Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a department name!' }]}>
             <Input name='name' placeholder="Department Name" />
          </Form.Item>
          <Form.Item
            label="Department Code"
            name="code"
            rules={[
              { required: true, message: 'Please enter a department code!' },
              { max: 4, message: 'Department code must be 4 characters long!' },
              { min: 4, message: 'Department code must be 4 characters long!' },
              { pattern: /^[A-Z]+$/, message: 'Department code must be in uppercase!'}
              ]}>
             <Input name='code' placeholder="Department Code" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default CreateDepatmentModal;