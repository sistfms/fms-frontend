import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './style.css'
import CreateDepatmentModal from './CreateDepartmentModal';
import { Table, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';


const Departments = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // modal
  const [show, setShow] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/departments');
      setDepartments(data);
    } catch (error) {
      messageApi.error("Error: " + error.message || "Failed to fetch Departments");
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const createDepartmentCallback = (data) => {
    setShow(false);
    if(data.status >= 200 && data.status < 300){
      messageApi.success("Department Created Successfully");
      fetchDepartments();
    }else{
      messageApi.error("Error: " + data.message || "Failed to create Department");
    }
  }
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
      if(userInfo.role !== 'ADMIN') navigate('/');
      fetchDepartments();
    }

  }, [userInfo]);

  const columns = [

    {
      title: 'Department ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Button type="link" onClick={() => navigate(`/batches`)}>{text}</Button>,
    },
    {
      title: 'Department Code',
      dataIndex: 'code',
      key: 'code',
    }
  ];

  return (
    <>
    <div className="batch-container">
      {contextHolder}
      <div className='page-header'>
        <h2>Departments</h2>
        <Button type="primary" icon={<FontAwesomeIcon icon={faUniversity} style={{marginRight: '.5em'}} />}  onClick={() => setShow(true)}>Create Department</Button>
      </div>
      <div className="batch-list">
        <Table loading={loading} columns={columns} dataSource={departments} />
      </div>
    </div>
    <CreateDepatmentModal visible={show} setVisible={setShow} callback={createDepartmentCallback}/>
    </>
  )
}

export default Departments;