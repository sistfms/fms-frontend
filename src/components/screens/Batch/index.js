import React, { useEffect } from 'react';
import './style.css'
import { Segmented, Descriptions, Skeleton, message, Tag, Button, Table, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../BackButton';
import AddStudentModal from './AddStudentModal';

const segmentedOptions = [
  {
    label: 'Student Management',
    value: 'student',
    icon: <FontAwesomeIcon icon={faUserGraduate} />,
  },
  {
    label: 'Fee Management',
    value: 'fee',
    icon: <FontAwesomeIcon icon={faIndianRupeeSign} />,
  },
]

const studentColumns = [
  {
    title: 'Student ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Roll Number',
    dataIndex: 'roll_number',
    key: 'roll_number',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = status === 'active' ? 'green' : 'volcano';
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
];

const feeColumns = [
  {
    title: 'Fee ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Fee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Fee Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at) => {
      return (
        <span key={created_at}>
          {new Date(created_at).toDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
        </span>
      );
    }
  },
  {
    title: 'Due Date',
    dataIndex: 'due_date',
    key: 'due_date',
    render: (due_date) => {
      let color = due_date < new Date() ? 'red' : 'green';
      return (
        <span style={{color}} key={due_date}>
          {new Date(due_date).toDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
        </span>
      );
    }
  },
];

const Batch = () => {

  const location = useLocation();
  const batchId = location.pathname.split('/')[2];
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  
  const [batchDetails, setBatchDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('student');

  const [students, setStudents] = React.useState([]);
  const [studentsLoading, setStudentsLoading] = React.useState(false);

  const [fees, setFees] = React.useState([]);
  const [feesLoading, setFeesLoading] = React.useState(false);

  // Modal
  const [addStudentModalVisible, setAddStudentModalVisible] = React.useState(false);
  const [addFeeModalVisible, setAddFeeModalVisible] = React.useState(false);
  

  const getBatchDetails = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`/batches/${batchId}`);
      setBatchDetails(response.data);
    }catch(error){
      messageApi.error("Error: " + error.message || "Failed to fetch Batch Details");
      setTimeout(() => {
        navigate('/batches');
      }, 2000);
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const getStudents = async () => {
    try{
      setStudentsLoading(true);
      const response = await axios.get(`/batches/${batchId}/students`);
      setStudents(response.data);
    }catch(error){
      messageApi.error("Error: " + error.message || "Failed to fetch Students");
      console.log(error);
    }finally{
      setStudentsLoading(false);
    }
  }

  const getFees = async () => {
    try{
      setFeesLoading(true);
      const response = await axios.get(`/batches/${batchId}/fees`);
      setFees(response.data);
    }catch(error){
      messageApi.error("Error: " + error.message || "Failed to fetch Fees");
      console.log(error);
    }finally{
      setFeesLoading(false);
    }
  }

  const createStudentCallback = (data) => {
    setAddFeeModalVisible(false);
    if(data.status >= 200 && data.status < 300){
      messageApi.success("Student added Successfully. Activation Email sent to Student");
      getStudents();
    }else{
      messageApi.error("Error: " + data.message || "Failed to create Student");
    }
  }

  useEffect(() => {
    getBatchDetails();
  }, []);

  useEffect(() => {
    if(activeTab === 'student' && students.length === 0){
      getStudents();
    }
    if(activeTab === 'fee' && fees.length === 0){
      getFees();
    }
  }, [activeTab]);

  return (
    <>
      <BackButton />
      {contextHolder}
      <div className='page-header'>
        <h2>Batch Management</h2>
        <Segmented value={activeTab} onChange={value => setActiveTab(value)} options={segmentedOptions} />
      </div>
      {loading ? <Skeleton active /> : (<>
      <Descriptions>
        <Descriptions.Item label="Batch ID">{batchDetails.id}</Descriptions.Item>
        <Descriptions.Item label="Batch Name">{batchDetails.name}</Descriptions.Item>
        <Descriptions.Item label="Department">{batchDetails.department_name}</Descriptions.Item>
        <Descriptions.Item label="Start Year">{batchDetails.start_year}</Descriptions.Item>
        <Descriptions.Item label="End Year">{batchDetails.end_year}</Descriptions.Item>
        <Descriptions.Item label="Status">{batchDetails.status}</Descriptions.Item>
      </Descriptions>
      <Divider>Batch Operations</Divider>
      <div className='segmented-tab-container'>
       
        {activeTab === 'student' && <div>
          <div className='page-header'>
            <h5>Students</h5>
            <div>
              <Button type='primary' onClick={() => setAddStudentModalVisible(true)}>Add Student</Button>
              <Button style={{marginLeft: '1em'}}>Bulk Import</Button>
            </div>
          </div>
         
          <div className='table-container'>
            <Table columns={studentColumns} dataSource={students} loading={studentsLoading} />
          </div>
          
        </div>}
       
       
        {activeTab === 'fee' && <div>
          
          <div className='page-header'>
            <h5>Batch Fees</h5>
            <Button type='primary'>Add Fee</Button>
          </div>
         
          <div className='table-container'>
            <Table columns={feeColumns} dataSource={fees} loading={feesLoading} />
          </div>  
        
        </div>}
      </div>
      </>
      )}
      <AddStudentModal visible={addStudentModalVisible} setVisible={setAddStudentModalVisible} callback={createStudentCallback} />
    </>
  )
};

export default Batch;