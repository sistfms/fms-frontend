import React, { useEffect } from 'react';
import { Modal, Form,Select, Input, DatePicker } from 'antd';
import axios from 'axios';

const CreateBatchModal = ({visible, setVisible, callback}) => {


  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [createBatchLoading, setCreateBatchLoading] = React.useState(false);
  
  
  // form fields
  const [name, setName] = React.useState('');
  const [startYear, setStartYear] = React.useState('');
  const [endYear, setEndYear] = React.useState('');
  const [department, setDepartment] = React.useState(0);

  const handleYearChange = (value, dateString) => {
    setStartYear(dateString[0]);
    setEndYear(dateString[1]);
  }

  const resolveName = () => {
    if(department && startYear){
      let code = departments.find(d => d.id === department)?.code;
      setName(startYear.substring(2) + code);
    }
  }
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/departments');
      setDepartments(data);
      setOptions(data.map(department => ({value: department.id, label: department.name})));
      console.log("Options", options)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const createBatch = async () => {
    setCreateBatchLoading(true);
    try {
      const { data } = await axios.post('/batches', {
        name,
        start_year: startYear,
        end_year: endYear,
        department_id: department
      });
      callback(data)
      setVisible(false);
    } catch (error) {
      callback(error.response.data);
      console.log(error);
    }finally{
      setCreateBatchLoading(false);
    }
  }

  useEffect(() => {
    if(visible) fetchDepartments();
  }, [visible]);

  useEffect(() => {
    resolveName();
  }, [department, startYear]);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <Modal title="Create New Batch" okButtonProps={{ loading: createBatchLoading }} onOk={createBatch} open={visible} onCancel={() => setVisible(false)}>
        <Form 
          
          {...layout} 
          style={{marginTop: '1em', display: 'flex', justifyContent:'center', flexDirection:'column', padding:'1em 0'}}>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please select a department!' }]}
          >
            <Select
              showSearch
              loading={loading}
              placeholder="Select a department"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={options}
              onChange={value => setDepartment(value)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Batch Name"
            name="name"
            help="Batch Name will be automatically generated."
            required
            >
              {name && <Input value={name}/>}
              {!name && <Input placeholder="Batch Name" />}
          </Form.Item>
          
          <Form.Item
            label="Start Year and End Year"
            name="start_year"
            required
            >
              <DatePicker.RangePicker format="YYYY" onChange={handleYearChange} picker="year" style={{width: '100%'}}  />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default CreateBatchModal;