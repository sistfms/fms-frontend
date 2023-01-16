import React from "react";
import {Modal,Form,Input,DatePicker} from "antd"
const AddFeeModal = (props)=>{
    const layout = {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 24,
        },
      };
      const formRef=React.useRef()
    return (
        <Modal title="Add Fee Modal" open={props.visible} onCancel={()=>props.setVisible(false)}>
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
              { type: 'number', message: 'Please enter a valid amount' }
              ]}>
             <Input name='amount' placeholder="Amount" />
          </Form.Item>
          <Form.Item
            label="Due date"
            name="due_date"
            rules={[{ required: true, message: 'Amount is required' }]}>
             <DatePicker name="due_date" style={{width:"100%"}}/>   
          </Form.Item>
        </Form>
        </Modal>
    )
}

export default AddFeeModal;