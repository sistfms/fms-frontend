import React, { useEffect } from 'react';
import { Modal, notification, Descriptions } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CashEntryModal = ({visible, setVisible, callback, selectedFee, currentStudentData}) => {
  const location = useLocation();
  const formRef = React.useRef();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [cashEntryLoading, setCashEntryLoading] = React.useState(false);
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {}, [selectedFee, currentStudentData]);

  const createCashEntry = async () => {
    const payload = {
      student_id: currentStudentData.id,
      fee_id: selectedFee.id,
      collected_by:  userInfo.user_id,
    }

    try {
      setCashEntryLoading(true);
     await axios.post('/api/payments/cashEntry', payload);
      notificationApi.success({
        message: 'Cash Entry Created',
        description: 'Cash Entry Created Successfully',
      });
     callback();
     setVisible(false);
    } catch (error) {
      notificationApi.error({
        message: 'Failed To Cash Entry',
        description: error.response.data.message,
      });
    }finally{
      setCashEntryLoading(false);
    }
  }

  return ( 

    <Modal style={{top: 20}} title="Confirm Cash Entry"
      okButtonProps={{ loading: cashEntryLoading }} onOk={createCashEntry}
    okText="Confirm"  open={visible} onCancel={() => setVisible(false)}>
      {contextHolder}
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Student Name">{currentStudentData?.name}</Descriptions.Item>
        <Descriptions.Item label="Roll Number">{currentStudentData?.roll_number}</Descriptions.Item>
        <Descriptions.Item label="Fee Name">{selectedFee?.name}</Descriptions.Item>
        <Descriptions.Item label="Amount">{selectedFee?.amount}</Descriptions.Item>
        <Descriptions.Item label="Payment Mode">Cash</Descriptions.Item>
        <Descriptions.Item label="Collected By">{userInfo.name}</Descriptions.Item>
      </Descriptions>
      <p>
        I acknowladge that the above mentioned amount has been collected from the student by me. 
        </p>
    </Modal>
  );
};

export default CashEntryModal;