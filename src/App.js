import { Routes, Route, BrowserRouter } from 'react-router-dom';

// LAYOUTS
import Header from './components/layouts/Header';

// SCREENS
import Home from './components/screens/Home';
import Login from './components/screens/Login';

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
    <Header />
    {userLogin.loading ? <LoadingIndicator/> : <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>} 
    </>
  );
}

export default App;
