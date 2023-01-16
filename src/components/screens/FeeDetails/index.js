import React from 'react'
import moment from 'moment/moment';
import { Descriptions, Divider, Skeleton,Table, message, Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import BackButton from '../../BackButton';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeeDetails = () => {
  const feeReportColumns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Roll Number',
      dataIndex: 'roll_number',
      key: 'roll_number',
      sorter: (a, b) => a.roll_number - b.roll_number,
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (payment_status) => {
        let color = payment_status === 'paid' ? 'green' : 'volcano';
        return (
          <Tag color={color} key={payment_status}>
            {payment_status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: 'Paid',
          value: 'paid',
        },
        {
          text: 'Unpaid',
          value: 'unpaid',
        },
      ],
      onFilter: (value, record) => record.payment_status.indexOf(value) === 0,
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      sorter: (a, b) => a.payment_date.localeCompare(b.payment_date),
    },
    {
      title: 'Payment Mode',
      dataIndex: 'payment_mode',
      key: 'payment_mode',
      filters: [
        {
          text: 'Offline',
          value: 'offline',
        },
        {
          text: 'Online',
          value: 'online',
        },
      ]
    },
    {
      title: 'Collected By',
      dataIndex: 'collected_by',
      key: 'collected_by',
    },
  ];
  const location = useLocation();
  const feeId = location.pathname.split('/')[2];
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = React.useState(false);
  const [feeReport, setFeeReport] = React.useState([]);
  const [feeReportLoading, setFeeReportLoading] = React.useState(false);
  const [feeDetails, setFeeDetails] = React.useState({});

  const fetchFeeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/fees/${feeId}`)
      setFeeDetails(response.data);
      console.log("Fee Details", response.data);
      fetchFeeReport();
    } catch (error) {
      messageApi.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchFeeReport = async () => {
    try {
      setFeeReportLoading(true);
      const response = await axios.get(`/fees/${feeId}/report`)
      let report = response.data.map(record => ({
        id: record.student.id,
        name: record.student.name,
        roll_number: record.student.roll_number,
        payment_status: record.feePayment ? 'paid' : 'unpaid',
        payment_date: record.feePayment ? moment(record.feePayment.payment_date).format("Do MMMM, YYYY") : '-',
        payment_mode: record.feePayment ? record.feePayment.payment_method : '-',
        collected_by: record.feePayment ? record.feePayment.collected_by : '-',
      }));
      setFeeReport(report);
    } catch (error) {
      messageApi.error(error.response.data.message);
    } finally {
      setFeeReportLoading(false);
    }
  }

  React.useEffect(() => {
    fetchFeeDetails();
  }, [feeId])

  return (<>
  <BackButton />
  <div className='page-hrader'>
    <h2>Fee Details</h2>
  </div>

  {loading ? <Skeleton active /> : (<>
    <Descriptions>
      <Descriptions.Item label="Fee ID">{feeDetails.id}</Descriptions.Item>
      <Descriptions.Item label="Fee Name">{feeDetails.name}</Descriptions.Item>
      <Descriptions.Item label="Fee Amount"><FontAwesomeIcon /> {feeDetails.amount}</Descriptions.Item>
      <Descriptions.Item label="Due Date">{moment(feeDetails.due_date).format("Do MMMM, YYYY")}</Descriptions.Item>
      <Descriptions.Item label="Department">{feeDetails.department_name}</Descriptions.Item>
      <Descriptions.Item label="Batch">{feeDetails.batch_name}</Descriptions.Item>
    </Descriptions>
    <Divider>Report</Divider>
    <Table loading={feeReportLoading} columns={feeReportColumns} dataSource={feeReport} />
  </>)}
  </>);
}

export default FeeDetails;