import React from 'react'
import {LoadingOutlined} from '@ant-design/icons';
import { Spin } from 'antd';
import './style.css'

const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: '2.5em',
    }}
    spin
  />
);

const LoadingIndicator = () => {
  return (
      <Spin size='large' style={{height: '70vh', width: '100%', position:'relative', top: '30vh'}} indicator={loadingIcon} />
  )
}

export default LoadingIndicator;