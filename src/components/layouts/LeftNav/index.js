import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import { DashboardOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faUniversity,
  faRupee,
  faUserGraduate,
  faPowerOff,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
const {Sider} = Layout;

const LeftNav = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      
    },
    {
      key: 'pos',
      icon: <FontAwesomeIcon icon={faStore} />,
      label: 'Cash Entry',
    },
    {
      key: 'departments',
      icon: <FontAwesomeIcon icon={faUniversity} />,
      label: 'Departments',
    },
    {
      key: 'batches',
      icon: <UsergroupDeleteOutlined />,
      label: 'Batches',
      onclick: () => navigate('/batches')
    },
    {
      key: 'batchfee',
      icon: <FontAwesomeIcon icon={faRupee} />,
      label: 'Fee Management',
    },
    {
      key: 'student',
      icon: <FontAwesomeIcon icon={faUserGraduate} />,
      label: 'Students',
    },
    {
      key: 'Profile',
      icon: <FontAwesomeIcon icon={faUserCircle} />,
      label: 'Bijay Sharma',
      style: { position: 'absolute', bottom: 35, marginBottom: 10 }
    },
    {
      key: 'logout',
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      label: 'Logout',
      style: { position: 'absolute', bottom: 0, marginBottom: 10 }
    }
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