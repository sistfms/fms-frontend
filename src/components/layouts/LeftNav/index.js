import { useEffect, useState } from 'react';
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
  faUserCircle,
  faSignIn
} from '@fortawesome/free-solid-svg-icons';

import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../../actions/userActions';



const {Sider} = Layout;

const LeftNav = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser())
  };

  const [selectedKey, setSelectedKey] = useState('/');

  const studentItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'Profile',
      icon: <FontAwesomeIcon icon={faUserCircle} />,
      label: userLogin?.userInfo?.name,
      style: { position: 'absolute', bottom: 35, marginBottom: 10 }
    },
    {
      key: 'logout',
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      label: 'Logout',
      style: { position: 'absolute', bottom: 0, marginBottom: 10 }
    }
  ];

  const unAuthItems = [
    {
      key: 'login',
      icon: <FontAwesomeIcon icon={faSignIn} />,
      label: 'Login',
    }
  ];

  useEffect(() => {
    if(window.location.pathname === '/activate') return
    if(userLogin.userInfo){
      setSelectedKey('/');
    }else{
      setSelectedKey('login');
    } 
  }, [userLogin.userInfo]);

  const adminItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      
    },
    {
      key: 'cashentry',
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
    },
    
    {
      key: 'Profile',
      icon: <FontAwesomeIcon icon={faUserCircle} />,
      label: userLogin?.userInfo?.name,
      style: { position: 'absolute', bottom: 35, marginBottom: 10 }
    },
    {
      key: 'logout',
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      label: 'Logout',
      style: { position: 'absolute', bottom: 0, marginBottom: 10 }
    }
  ];

  const items = userLogin.userInfo ? (userLogin.userInfo.role === 'STUDENT' ? studentItems : adminItems )  : unAuthItems;


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
        <Menu theme="dark" 
          mode="inline" 
          items={items} 
          defaultSelectedKeys={['/']}
          selectedKeys={[selectedKey]}
          onSelect = {
          (item) => {
            if(item.key === 'logout') {
              logoutHandler();
            }else{
              setSelectedKey(item.key);
              navigate(item.key)
            }
          }
        }/>
      </Sider>
  )
}

export default LeftNav;