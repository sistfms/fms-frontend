import { Routes, Route, BrowserRouter } from 'react-router-dom';

// LAYOUTS
import Header from './components/layouts/Header';

// SCREENS
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Batches from './components/screens/Batches';

// COMPONENTS


// functions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import LoadingIndicator from './components/LoadingIndicator';


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
          </Routes>
      </>} 
    </BrowserRouter>
    </>
  );
}

export default App;
