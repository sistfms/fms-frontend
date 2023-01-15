import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './style.css'
import LoadingIndicator from '../../LoadingIndicator';
import CreateBatchModal from './CreateBatchModal';
import { Table, Tag, Button, Alert } from 'antd';
const Batches = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [batches, setBatches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // modal
  const [show, setShow] = useState(false);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/batches');
      setBatches(data);
    } catch (error) {
      setError("Failed to fetch batches");
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const batchCreateCallback = (data) => {
    setShow(false);
    if(data.success){
      alert("Batch Created Successfully")
      fetchBatches();
    }else{
      alert("Failed to Create Batch");
    }
  }

  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
      fetchBatches();
    }

  }, [userInfo]);

  const columns = [
    {
      title: 'Batch ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Batch Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={`/batches/${record.id}`}>{text}</a>,
    },
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_year',
      key: 'start_year',
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
      <div className='page-header'>
        <Button  onClick={() => setShow(true)}>Create Batch</Button>
      </div>
      <div className="batch-list">
        {loading && <LoadingIndicator />}
        {error && <Alert variant='danger'>{error}</Alert>}
        <Table columns={columns} dataSource={batches} />
      </div>
    </div>
    <CreateBatchModal visible={show} setVisible={setShow} callback={batchCreateCallback}/>
    </>
  )
}

export default Batches