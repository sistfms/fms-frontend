import React, { useEffect } from 'react';
import './style.css'
import {  message, Table,Descriptions } from 'antd';

const CashEntry = () => {
  const [messageApi, contextHolder] = message.useMessage()

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
      render: (name, record) => <a >{name}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
      onFilter: (value, record) => record.department_name.indexOf(value) === 0,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
    ]
    }
  ]

  return (
    <>
    <div className="batch-container">
      {contextHolder}
      <div className='page-header'>
        <h2>Cash Entry</h2>
      </div>
      <div className="batch-list">

        <Descriptions title="Student Details">
          <Descriptions.Item label="Student Name">Sefali Basnet</Descriptions.Item>
          <Descriptions.Item label="Batch Name">19CSEC</Descriptions.Item>
          <Descriptions.Item label="Department">Computer Engineering</Descriptions.Item>
          <Descriptions.Item label="Mobile Number">8900089820</Descriptions.Item>
          <Descriptions.Item label="Gender">female</Descriptions.Item>
          <Descriptions.Item label="Roll No">19CSEC04</Descriptions.Item>
        </Descriptions>
        <Table columns={columns}  />
      </div>
    </div>
    
    </>
  )
}

export default CashEntry
