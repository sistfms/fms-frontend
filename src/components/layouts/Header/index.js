import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../../actions/userActions';
import {useNavigate} from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('logout');
    dispatch(logoutUser())
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Fee Managemnt System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            { userLogin.userInfo ? <>
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/batches')}>Batches</Nav.Link>
              <Nav.Link onClick={() => navigate('/departments')}>Departments</Nav.Link>
              <Nav.Link onClick={() => navigate('/students')}>Student</Nav.Link>
              <Nav.Link onClick={() => navigate('/batchfee')}>BatchFee</Nav.Link>
              <Nav.Link onClick={() => navigate('/payment')}>Payment</Nav.Link>
              <NavDropdown title={userLogin.userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={logoutHandler}>
                   Logout
                </NavDropdown.Item>
            </NavDropdown>
            </> :
            <>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;