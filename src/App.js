import { Routes, Route, BrowserRouter } from 'react-router-dom';

// LAYOUTS
import Header from './components/layouts/Header';

// SCREENS
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Batches from './components/screens/Batches';
import Students from './components/screens/Students';
import Payment from './components/screens/Payment';
// COMPONENTS


// functions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import LoadingIndicator from './components/LoadingIndicator';
import Departments from './components/screens/Departments';
import BatchFee from './components/screens/BatchFee';


function App() {
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(loadUser())
    }
  }, []);


  return (
    <>
    <BrowserRouter>
      <Header />
      {userLogin.loading ? <LoadingIndicator /> : <>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/students" element={<Students />} />
              <Route path="/batchfee" element={<BatchFee />} />
              <Route path="/payment" element={<Payment />} />
          </Routes>
      </>} 
    </BrowserRouter>
    </>
  );
}

export default App;
