import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import { DashboardOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
const {Sider} = Layout;

const LeftNav = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Home',
      
    },
    {
      key: 'batches',
      icon: <UsergroupDeleteOutlined />,
      label: 'Batches',
      onclick: () => navigate('/batches')
    },
  ]

  return (
    <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="site-header">SIST FMS</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onSelect = {
          (item) => {
            navigate(item.key)
          }
        }/>
      </Sider>
  )
}

export default LeftNav;