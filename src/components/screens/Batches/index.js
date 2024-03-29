import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './style.css'
import CreateBatchModal from './CreateBatchModal';
import { Table, Tag, Button, message } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
const Batches = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [batches, setBatches] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // modal
  const [show, setShow] = useState(false);


  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/batches');
      setBatches(data);
    } catch (error) {
      messageApi.error("Error: " + error.message || "Failed to fetch Batches");
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get('/api/departments');
      setDepartments(data.map(department => ({text: department.name, value: department.name})));
    } catch (error) {
      messageApi.error("Error: " + error.message || "Failed to fetch Departments");
      console.log(error);
    }
  }

  const batchCreateCallback = (data) => {
    setShow(false);
    if(data.status >= 200 && data.status < 300){
      messageApi.success("Batch Created Successfully");
      fetchBatches();
    }else{
      messageApi.error("Error: " + data.message || "Failed to create batch");
    }
  }

  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
      if(userInfo.role !== 'ADMIN') navigate('/');
      fetchBatches();
      fetchDepartments();
    }

  }, [userInfo]);

  const columns = [

    {
      title: 'Batch ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Batch Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => <a onClick={() => navigate(`/batches/${record.id}`)}>{name}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
      filters: departments,
      onFilter: (value, record) => record.department_name.indexOf(value) === 0,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_year',
      key: 'start_year',
      sorter: (a, b) => a.start_year - b.start_year,
    },
    {
      title: 'End Year',
      dataIndex: 'end_year',
      key: 'end_year',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Active',
          value: 'ACTIVE',
        },
        {
          text: 'Standby',
          value: 'CREATED',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => {
        switch (status) {
          case 'ACTIVE':
            return <Tag color="green">Active</Tag>;
          case 'CREATED':
            return <Tag color="yellow">Standby</Tag>;
          case 'INACTIVE':
            return <Tag color="red">Inactive</Tag>;
          default:
            return <Tag color="red">Inactive</Tag>;
        }
      }
    }
  ];

  return (
    <>
    <div className="batch-container">
      {contextHolder}
      <div className='page-header'>
        <h2>Batches</h2>
        <Button type="primary" icon={<UsergroupAddOutlined />}  onClick={() => setShow(true)}>Create Batch</Button>
      </div>
      <div className="batch-list">
        <Table loading={loading} columns={columns} dataSource={batches} />
      </div>
    </div>
    <CreateBatchModal visible={show} setVisible={setShow} callback={batchCreateCallback}/>
    </>
  )
}

export default Batches