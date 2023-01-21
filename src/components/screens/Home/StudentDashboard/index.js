import { Button, Descriptions, Divider, Space, Table, Tag, Tooltip } from 'antd'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faHistory } from '@fortawesome/free-solid-svg-icons';

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
      render: (status) => {
        let color = status === 'PAID' ? 'green' : 'volcano';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: 'Paid Date',
      dataIndex: 'paid_date',
      key: 'paid_date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions, row) => {
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
  return (
    <>
      <div className='page-header'>
        <h2>Dashboard</h2>
      </div>
      <Descriptions title="Details">
        <Descriptions.Item label="ID">123456</Descriptions.Item>
        <Descriptions.Item label="Name">John Doe</Descriptions.Item>
        <Descriptions.Item label="Roll Number">19CSEC010</Descriptions.Item>
        <Descriptions.Item label="Department">Computer Science</Descriptions.Item>
        <Descriptions.Item label="Batch">2019</Descriptions.Item>
        <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
        <Descriptions.Item label="Phone Number">+91 1234567890</Descriptions.Item>
      </Descriptions>
      <Divider>Fee Payment Summary</Divider>

      <Table columns={columns} dataSource={[
        {
        id: 1,
        name: 'Admission Fee',
        amount: 1000,
        status: 'PAID',
        due_date: '2021-01-01',
        paid_date: '2021-01-01',
        actions: 'Edit'
        }
      ]}  />


    </>
  )
}

export default StudentDashboard