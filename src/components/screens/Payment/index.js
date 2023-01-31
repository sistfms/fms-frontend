import { useState } from "react";
import { faIndianRupee, faFileDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Alert, Button, Card, Descriptions, Divider, Skeleton, Space, Tag, notification, Spin, Collapse, Table, Tooltip, Popover } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { RedoOutlined } from '@ant-design/icons';
import BackButton from "../../BackButton";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feeId = location.pathname.split("/")[2];
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [feePaymentDetails, setFeePaymentDetails] = useState(null);
  const [feePaymentDetailsLoading, setFeePaymentDetailsLoading] = useState(false);
  const [paymentGatewayLoading, setPaymentGatewayLoading] = useState(false);
 
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState("");

  const [paymentHistory, setPaymentHistory] = useState(null);
  const [paymentHistoryLoading, setPaymentHistoryLoading] = useState(false);

  const options = {};

  const [notificationApi, contextHolder] = notification.useNotification();

  const loadRazorpay = () => {
    setRazorpayLoading(true);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    script.async = true;
    script.onload = () => {
      console.log('razorpay loaded')
      setRazorpayLoaded(true);
      setRazorpayLoading(false);
    }
    document.body.appendChild(script);
  }


  const displayRazorpay = async () => {
    setPaymentError(false);
    setPaymentErrorMessage("");
    setPaymentGatewayLoading(true);
    if(feePaymentDetails?.isPaid){
      notificationApi.error({
        message: 'Payment already done',
        description: 'You have already paid this fee.'
      });
      setPaymentGatewayLoading(false);
      return;
    }

    // create or get existing Order
    let order = null;
    try {
      const res = await axios.post('/api/payments/getOrderId', {
        batch_fee_id: feeId,
        user_id: userInfo.user_id,
      })
      order = res.data;

      if (razorpayLoaded && order) {
        const paymentObject = new window.Razorpay({
          key: 'rzp_test_K4KHcD2BaMgJSo',
          amount: order.amount,
          order_id: order.razorpay_order_id,
          currency: 'INR',
          name: 'SIST FMS',
          description: feePaymentDetails?.fee_details?.name || 'Fee Payment',
          image: 'https://scontent.fccu9-3.fna.fbcdn.net/v/t1.6435-9/59440341_453576372045077_104671922121342976_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=110&ccb=1-7&_nc_sid=85a577&_nc_ohc=RxygNet1fxIAX_J8tSz&_nc_ht=scontent.fccu9-3.fna&oh=00_AfCZ6PvAomYUF3sb6qxHd_rCPYEQooz_8BqcfJaEc9ndIg&oe=63FC4684',
          handler: function (response) {
            console.log(response);
            setPaymentGatewayLoading(false);
            setPaymentProcessing(true);
            
            setTimeout(() => {
              setPaymentProcessing(false);
              fetchFeePaymentDetails();   
              notificationApi.success({
                message: 'Payment Successful',
                description: 'Your payment was successful. Thank you for using our service.'
              });
            }, 5000);
          },
          prefill: {
            name: feePaymentDetails?.student_details?.name,
            email: feePaymentDetails?.student_details?.email,
            contact: feePaymentDetails?.student_details?.phone_number,
          }
        });
    
        paymentObject.on('payment.failed', (response) => {
          console.log(response);
          setPaymentError(true);
          setPaymentProcessing(false);
          setPaymentGatewayLoading(false);
          notificationApi.error({
            message: 'Payment Failed',
            description: 'Your payment was unsuccessful. Please try again.'
          });
          fetchPaymentHistory(order.razorpay_order_id);
          setPaymentErrorMessage(response.error.description);
          setPaymentError(true);
        })
        paymentObject.open();
      }
      setPaymentGatewayLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFeePaymentDetails = async () => {
    try {
      setFeePaymentDetailsLoading(true);
      const res = await axios.post('/api/payments/getFeePaymentDetails', {
        batch_fee_id: feeId,
        user_id: userInfo.user_id,
      })
      setFeePaymentDetails(res.data);
      if (res.data?.payment_details?.razorpay_order_id){
        await fetchPaymentHistory(res.data.payment_details.razorpay_order_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFeePaymentDetailsLoading(false);
    }
  }

  const fetchPaymentHistory = async (order_id) => {
    try {
      setPaymentHistoryLoading(true);
      const res = await axios.post('/api/payments/getPaymentHistory', {
        order_id,
      })
      setPaymentHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPaymentHistoryLoading(false);
    }
  }

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    }

    if(!feeId) {
      navigate('/');
    }
    fetchFeePaymentDetails();
    loadRazorpay();
  }, [userInfo]);


    return (
      <>
       <div>
        <BackButton path='/' />
        {contextHolder}
        <div className="page-header">
            <h2>Payment{feePaymentDetails && ": " + feePaymentDetails.fee_details.name}</h2>
            {feePaymentDetails?.isPaid && <Alert type="success" showIcon message="Fee Paid" />}
            {!feePaymentDetails?.isPaid && <Alert type="info" showIcon message="Fee Not Paid" />}
        </div>  
        <div>
          {paymentError && <Alert 
            style={{marginBottom: '1em'}}
            type="error" 
            showIcon message="Payment Failed" 
            description={paymentErrorMessage} closable
            action={<Button onClick={displayRazorpay} icon={<RedoOutlined />}>Retry</Button>}
          />}
          {paymentGatewayLoading && <>
            <Card>
              <Space>
                <Spin />
                <p>Loading Payment Gateway</p>
              </Space>
            </Card>
          </>}
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
          <Card title="Details" style={{width: "70%", marginRight: '1em'}}>
            {feePaymentDetailsLoading ? <Skeleton active /> : (
              <Descriptions >
                <Descriptions.Item label="Fee ID">{feePaymentDetails?.fee_details?.id}</Descriptions.Item>
                <Descriptions.Item label="Fee Name">{feePaymentDetails?.fee_details?.name}</Descriptions.Item>
                <Descriptions.Item label="Student ID">{feePaymentDetails?.student_details?.id}</Descriptions.Item>
                <Descriptions.Item label="Student Name">{feePaymentDetails?.student_details?.name}</Descriptions.Item>
                <Descriptions.Item label="Department ID">{feePaymentDetails?.student_details?.department_id}</Descriptions.Item>
                <Descriptions.Item label="Batch">{feePaymentDetails?.student_details?.batch_name}</Descriptions.Item>
                <Descriptions.Item label="Amount"><Space size={1}><FontAwesomeIcon icon={faIndianRupee} /> {feePaymentDetails?.fee_details?.amount}</Space></Descriptions.Item>
                <Descriptions.Item label="Status">
                  {feePaymentDetails?.isPaid ? (
                    <Tag color="green">PAID</Tag>
                  ) : (
                    <Tag color="red">UNPAID</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Due Date">{moment(feePaymentDetails?.fee_details?.due_date).format("Do MMMM, YYYY")}</Descriptions.Item>
                {feePaymentDetails?.isPaid && <>
                  <Descriptions.Item label="Tracking ID">{feePaymentDetails?.payment_details?.razorpay_order_id}</Descriptions.Item>
                  <Descriptions.Item label="Payment ID">{feePaymentDetails?.payment_details?.razorpay_payment_id}</Descriptions.Item>
                  <Descriptions.Item label="Payment Date">{moment(feePaymentDetails?.payment_details?.created_at).format("Do MMMM, YYYY")}</Descriptions.Item>

                </>}
              </Descriptions>
            )}
          </Card>
          <Card title="Summary" style={{width: "30%",}}>
            {feePaymentDetailsLoading ? <Skeleton active /> : (<>
            <Descriptions column={1} bordered >
              <Descriptions.Item  label="Total Amount">{feePaymentDetails?.fee_details.amount}</Descriptions.Item>
              <Descriptions.Item label="Tax">0</Descriptions.Item>
              <Descriptions.Item  label="Status">
                  {feePaymentDetails?.isPaid ? (
                    <Tag color="green">PAID</Tag>
                  ) : (
                    <Tag color="red">UNPAID</Tag>
                  )}
              </Descriptions.Item>      
            </Descriptions>
            {feePaymentDetails?.isPaid ? (<>
              <Button
                onClick={() => navigate(`/receipt/${feeId}`)}
                icon={<FontAwesomeIcon icon={faFileDownload} style={{marginRight: '.5em'}} />} 
                type="primary" 
                style={{margin: '1em auto', marginBottom: '0', display:'block', width: '80%', background: '#66AA66'}}>
                Download Receipt
              </Button>
            </>) : <>        
              <Button 
                type="primary" 
                loading={razorpayLoading && feePaymentDetailsLoading}
                onClick={() => displayRazorpay()}
                style={{margin: '1em auto', marginBottom: '0', display:'block', width: '80%',}}>
                  {paymentError ? 'Retry' : 'Pay Now'}
              </Button>
            </>}
            </>)}
          </Card>
        </div>
        <Divider>Transaction History</Divider>
        
          <Table loading={paymentHistoryLoading} columns={[
            {
              title: 'Payment Date',
              dataIndex: 'payment_date',
              key: 'payment_date',
      
              render: (text, record) => (
                <span>{moment(record.payment_date).format("Do MMMM, YYYY")}</span>
              )
            },
            {
              title: 'Payment Time',
              dataIndex: 'paayment_date',
              key: 'payment_date',
              render: (text, record) => (
                <span>{moment(record.payment_date).format("h:mm a")}</span>
              )
            },
            {
              title: 'Payment Method',
              dataIndex: 'method',
              key: 'method',
              render: (text) => (
                <span>{text.toUpperCase()}</span>
              )
            },
            {
              title: 'Payment ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (text) => {
                switch(text) {
                  case 'captured':
                    return <Tag color="green">SUCCESS</Tag>
                  case 'failed':
                    return <Tag color="red">FAILED</Tag>
                  case 'refunded':
                    return <Tag color="red">REFUNDED</Tag>
                  case 'authorized':
                    return <Tag color="orange">AUTHORIZED</Tag>
                  default:
                    return <Tag color="blue">PENDING</Tag>
                }
              }
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text, record, index) => (
                <Space>
                  <Popover placement="leftBottom" title="Txn Details" content={
                    <>
                      <p><b>Payment ID:</b> {record.id}</p>
                      <p><b>Payment Date:</b> {moment(record.payment_date).format("Do MMMM, YYYY")}</p>
                      <p><b>Payment Method:</b> {record.method.toUpperCase()}</p>
                      <p><b>Payment Status: </b> 
                        {record.status === 'captured' && <span style={{color: 'green'}}>SUCCESS</span>}
                        {record.status === 'failed' && <span style={{color: 'red'}}>FAILED</span>}
                        {record.status === 'refunded' && <span style={{color: 'yellow'}}>REFUNDED</span>}
                        {record.status === 'authorized' && <span style={{color: 'blue'}}>AUTHORIZED</span>}
                      </p>
                      <p><b>Amount:</b> <Space size={1}><FontAwesomeIcon icon={faIndianRupee} /> {record.amount}</Space></p>
                      {record.status === 'failed' && <>
                        <p><b>Error Code:</b> {record.error_code}</p>
                        <p><b>Failure Reason:</b> {record.error_description}</p>
                      </>}
                      {record.status === 'captured' && <>
                        {Object.keys(record.acquirer_data).map((key, index) => <>
                          <p><b>{key.replace(/_/g, " ", "")}:</b> {record.acquirer_data[key]}</p>
                        </>)}
                      </>}
                    </>
                  }>
                    <Button shape="circle" icon={<FontAwesomeIcon icon={faEye} />} />
                  </Popover>
                  {record.status === 'captured' && 
                    <Tooltip title="Download Receipt">
                      <Button onClick={() => navigate(`/receipt/${feeId}`)} shape="circle" type="primary" icon={<FontAwesomeIcon icon={faFileDownload} />} />
                    </Tooltip>
                  }
                </Space>
              )
            }
          ]} dataSource={paymentHistory?.items.reverse()} />
        
        <Divider />
          <p style={{color: '#999'}}>
            In case of payment failure but the amount has been deducted from your account, the amount will be reverted back to your account within 7 working days. In case of any queries, please contact the college office.
          </p>
       </div>
        {/** Modals */}
        <Modal title="Processing Payment" visible={paymentProcessing} footer={null} closable={false}>
          <div style={{textAlign: 'center'}}>
            <Spin size="large" />
            <p style={{marginTop: '1em'}}>Please do not refresh the page or close the browser window.</p>
          </div>
        </Modal>
       </>
    )

}
export default Payment;