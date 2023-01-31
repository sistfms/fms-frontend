// LAYOUTS
import LeftNav from './components/layouts/LeftNav';
import Container from './components/layouts/Container';

// SCREENS
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Batches from './components/screens/Batches';
import Students from './components/screens/Students';
import Batch from './components/screens/Batch';
import FeeDetails from './components/screens/FeeDetails';
import ActivateStudent from './components/screens/ActivateStudent';
import CashEntry from './components/screens/CashEntry';
import Payment from './components/screens/Payment';


// COMPONENTS
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout, theme, message } from 'antd';

// functions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import LoadingIndicator from './components/LoadingIndicator';
import Departments from './components/screens/Departments';
import BatchFee from './components/screens/BatchFee';
import RecieptScreen from './components/screens/RecieptScreen';


const Root = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname === '/activate') {
      return;
    }
    if (!userInfo) {
      dispatch(loadUser())
    }
  }, [userInfo]);
  return (
    <Layout hasSider >
      <LeftNav />
      <Container>
          {contextHolder}
          <div style={{ padding: 24, background: colorBgContainer,}}>
              {userLogin.loading ? <LoadingIndicator /> : <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/batches" element={<Batches />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/batchfee" element={<BatchFee />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/batches/:id" element={<Batch />} />
                    <Route path="/fees/:id" element={<FeeDetails />} />
                    <Route path="/activate" element={<ActivateStudent />} />
                    <Route path="/cashentry" element={<CashEntry />} />
                    <Route path="/payment/:feeId" element={<Payment />} />
                    <Route path="receipt/:feeId" element={<RecieptScreen />} />
                </Routes>
                </>}
          </div>
        </Container>
      </Layout>
  );
};


const App = () => {
  return (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  );
}
export default App;