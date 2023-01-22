import { Button, Descriptions, Divider, Space, Table, Tooltip, message, Tag, Card, Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faHistory, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const StudentDashboard = () => {
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
      render: (name) => <><Button type="link">{name}</Button></>
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
        if (moment(row.due_date) < moment() && status !== 'PAID')
          return <Tag color="red">Overdue</Tag>;
      
        switch (status?.toUpperCase()) {
          case 'PAID':
            return <Tag color="green">Paid</Tag>;
          case 'PENDING':
            return <Tag color="blue">Pending</Tag>;
          default:
            return <Tag color="red">Un Paid</Tag>;
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
      dataIndex: 'paid_date',
      key: 'paid_date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions, row) => {
        if (row.payment_status?.toUpperCase() !== 'PAID'){
          return <Button>Pay Now</Button>
        }
        return (
          <Space>
            <Tooltip title="Download Reciept">
              <Button shape='circle' icon={<FontAwesomeIcon icon={faFileDownload} />} onClick={() => console.log(row)} />
            </Tooltip>
            <Tooltip title="Show Transactions">
              <Button shape='circle' icon={<FontAwesomeIcon icon={faHistory} />} onClick={() => console.log(row)} />
            </Tooltip>
          </Space>
        );
      }
    }
  ];

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    }
    if (userInfo && userInfo.role !== 'STUDENT') {
      navigate('/login');
    }
  }, [userInfo]);

  const [studentDetails, setStudentDetails] = React.useState({});
  const [feeDetails, setFeeDetails] = React.useState([]);
  const [studentDetailsLoading, setStudentDetailsLoading] = React.useState(false);
  const [feeDetailsLoading, setFeeDetailsLoading] = React.useState(false);
  
  const fetchStudentDetails = async () => {
    try {
      setStudentDetailsLoading(true);
      const res = await axios.post('/students/getStudentByUserId', {
        user_id: userInfo.user_id
      })
      if (res.status >= 200 && res.status < 400) {
        setStudentDetails(res.data);
        await fetchFeeReport(res.data.id);
      }
    } catch (error) {
      console.log(error);
      messageApi.error('Error fetching student details');
    } finally {
      setStudentDetailsLoading(false);
    }
  }

  const fetchFeeReport = async (student_id) => {
    try {
      setFeeDetailsLoading(true);
      const res = await axios.get(`/fees/student/${student_id}`);
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
    fetchStudentDetails();
  }, [userInfo.user_id]);
  return (
    <>
      <div className='page-header'>
        <h2>Dashboard</h2>
      </div>
      <Card title="Details">
        {studentDetailsLoading ? <Skeleton active /> : (
        <Descriptions >
          <Descriptions.Item label="ID">{studentDetails?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{studentDetails?.name}</Descriptions.Item>
          <Descriptions.Item label="Gender">{studentDetails?.gender}</Descriptions.Item>
          <Descriptions.Item label="Roll Number">{studentDetails?.roll_number}</Descriptions.Item>
          <Descriptions.Item label="Department">{studentDetails?.department_name}</Descriptions.Item>
          <Descriptions.Item label="Batch">{studentDetails?.batch_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{studentDetails?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{studentDetails?.phone_number}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={studentDetails?.status === 'ACTIVE' ? 'green' : 'volcano'} >
              {studentDetails?.status?.toUpperCase()}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        )}
      </Card>
      <Divider>Fee Payment Summary</Divider>

      <Table columns={columns} loading={feeDetailsLoading} dataSource={feeDetails && feeDetails}  />


    </>
  )
}

export default StudentDashboard