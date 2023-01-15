import React from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
const Container = ({children}) => {
  return (
    <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: '0',
            overflow: 'initial',
            minHeight: '90vh',
          }}
        >

          {children}

          </Content>
          <Footer
          style={{
            textAlign: 'center',
          }}
        >
          SIST FMS ©2023
        </Footer>
    </Layout>
  )
};

export default Container;