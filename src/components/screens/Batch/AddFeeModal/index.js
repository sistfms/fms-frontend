import React from "react";
import {Modal,Form,Input,DatePicker} from "antd"
import axios from "axios"
import {useLocation} from "react-router-dom"

const AddFeeModal = (props)=>{
  const formRef=React.useRef()
  const location = useLocation();
  const batchId = location.pathname.split('/')[2];
  const layout = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
  };

  const [addFeeLoading,setAddFeeLoading] = React.useState(false)


  const addFee = async ()=>{
    formRef.current.validateFields().then(async (values)=>{
      try{
        setAddFeeLoading(true)
        let mysql_date = new Date(values.due_date).format("yyyy-mm-dd");
        const {data} = await axios.post(`/batches/${batchId}/fees`,{
          name:values.name,
          amount:values.amount,
          due_date:mysql_date
        })
        props.callback(data)
        props.setVisible(false)
        formRef.current.resetFields()
      }catch(error){
        props.callback(error.response.data)
        console.log(error)
      }finally{
        setAddFeeLoading(false)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }


  return (
      <Modal title="Add Fee Modal" okButtonProps={{ loading: addFeeLoading }} onOk={addFee} open={props.visible} onCancel={()=>props.setVisible(false)}>
      <Form 
        ref={formRef}
        {...layout} 
        style={{marginTop: '1em', display: 'flex', justifyContent:'center', flexDirection:'column', padding:'1em 0'}}>
        <Form.Item
          label="Fee Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a fee name!' }]}>
            <Input name='name' placeholder="Fee Name" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: 'Amount is required' },
            { min: 1, message: 'Amount must be greater than 0'}
            ]}>
            <Input type="number" name='amount' placeholder="Amount" />
        </Form.Item>
        <Form.Item
          label="Due date"
          name="due_date"
          rules={[
            { required: true, message: 'Amount is required' },]}>
            <DatePicker name="due_date" style={{width:"100%"}}/>   
        </Form.Item>
      </Form>
      </Modal>
  )
}

export default AddFeeModal;