import React, { useEffect } from 'react';
import './style.css'
import {  message, Table,Descriptions,AutoComplete, Input, Empty, Button, Tag, Space, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import CashEntryModal from './CashEntryModal';


const CashEntry = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (userInfo.role !== 'ADMIN') {
      navigate('/')
    }
  }, [userInfo])
  const [messageApi, contextHolder] = message.useMessage()

  const columns = [
    {
      title: 'Fee ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fee Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => <><Button type="link">{name}</Button></>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <><FontAwesomeIcon icon={faIndianRupeeSign} /> {amount}</>
    },
    {
      title: 'Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status, row) => {
        if (moment(row.due_date) < moment() && status !== 'captured')
          return <Tag color="red">Overdue</Tag>;
      
        switch (status) {
          case 'captured':
            return <Tag color="green">PAID</Tag>;
          case 'authorized':
            return <Tag color="blue">PENDING</Tag>;
          default:
            return <Tag color="red">UN PAID</Tag>;
        }
      }
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (dueDate) => moment(dueDate).format('Do MMMM, YYYY')
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date  ',
      render: (paymentDate) => paymentDate ? moment(paymentDate).format('Do MMMM, YYYY') : '-'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions, row) => {
        if (row.payment_status !== 'captured'){
          return <Button onClick={() => {
            setSelectedFee(row)
            setCashEntryModalVisible(true)
          }}>Cash Entry</Button>
        }
        return (
          <Space>
           
          </Space>
        );
      }
    }
  ];

  const [data, setData] = React.useState([]);
  const [searchOPtions, setSearchOptions] = React.useState([]);
  const [currentStudent, setCurrentStudent] = React.useState({});
  const [currentStudentData, setCurrentStudentData] = React.useState(null);
  const [feeDetails, setFeeDetails] = React.useState([]);
  const [feeDetailsLoading, setFeeDetailsLoading] = React.useState(false);
  const [selectedFee, setSelectedFee] = React.useState(null);

  // Modal
  const [CashEntryModalVisible, setCashEntryModalVisible] = React.useState(false);
  
  const CashEntryCallback = () => {
    fetchFeeReport(currentStudentData.id);
  }

  const handleSearch = async (value) => {
    if(value.length < 3) return;
    try {
      const res = await axios.post('/api/students/search', { searchText: value })
      setData(res.data)
      setSearchOptions(res.data.map((item) => ({ value: item.roll_number + ' - ' + item.name, label: item.roll_number + ' - ' + item.name })))
    } catch (error) {
      messageApi.error(error.response.data.message)
    }
  }

  const fetchFeeReport = async (student_id) => {
    try {
      setFeeDetailsLoading(true);
      const res = await axios.get(`/api/fees/student/${student_id}`);
      if (res.status >= 200 && res.status < 400) {
        setFeeDetails(res.data);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('Error fetching fee details');
    } finally {
      setFeeDetailsLoading(false);
    }
  }

  useEffect(() => {
    if (currentStudent?.length > 0) {
      let roll = currentStudent.split('-')[0].trim()
      let student = data.find((item) => item.roll_number === roll)
      setCurrentStudentData(student)
      fetchFeeReport(student.id)
    }
  }, [currentStudent])

  return (
    <>
    <div className="batch-container">
      {contextHolder}
      <div className='page-header'>
        <h2>Cash Entry</h2>
      </div>
      <AutoComplete 
        maxLength={10}
        style={{ width: 400 }} 
        options={searchOPtions}
        onSelect={(value) => setCurrentStudent(value)}
        onSearch={value => handleSearch(value)}>
        <Input.Search size="large" placeholder="Enter Roll Number Or Name" enterButton />
        </AutoComplete>
      <div className="batch-list">
        {currentStudentData ? <>
          <Descriptions title="Student Details">
            <Descriptions.Item label="Student Name">{currentStudentData.name}</Descriptions.Item>
            <Descriptions.Item label="Batch Name">{currentStudentData.batch_name}</Descriptions.Item>
            <Descriptions.Item label="Department ID">{currentStudentData.batch_id}</Descriptions.Item>
            <Descriptions.Item label="Mobile Number">{currentStudentData.phone_number}</Descriptions.Item>
            <Descriptions.Item label="Email">{currentStudentData.email}</Descriptions.Item>
            <Descriptions.Item label="Roll No">{currentStudentData.roll_number}</Descriptions.Item>
          </Descriptions>
          <Table columns={columns} loading={feeDetailsLoading} dataSource={feeDetails && feeDetails}  />
        </> : <>
          <Empty 
            style={{
              marginTop: '8em'
            }}
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description={
              <span>
                Please Search & Select a Student
              </span>
            }
          />
        </>}
        {}
        
      </div>
    </div>
      <CashEntryModal
       selectedFee={selectedFee}
       currentStudentData={currentStudentData} 
       visible={CashEntryModalVisible} 
       setVisible={setCashEntryModalVisible} 
       callback={CashEntryCallback} />
    </>
    
  )
}

export default CashEntry
