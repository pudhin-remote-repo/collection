import { useState } from 'react';
import './App.css';
import {Nav, Container} from 'react-bootstrap';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from 'react-router-dom';
import {Home} from './components/Home';
import {Contact} from './components/Contact';
import {Report} from './components/Report';
import {LoginForm} from './components/Login';
import {MyProfile} from './components/MyProfile';
import {AdminPage} from './components/AdminPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Authenticate user or admin here
    // If authenticated, set isLoggedIn to true and setIsAdmin to true/false based on user role
    setIsLoggedIn(true);
    setIsAdmin(true);
    //navigate('/my-profile');
  }

  const handleLogout = () => {
    // Handle logout here
    setIsLoggedIn(false);
    setIsAdmin(false);
    //navigate('/');
  }

  return (
    <BrowserRouter>
      <div className = "App">
        <div className="bg-dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {isLoggedIn && isAdmin && (
                <>
                  <Nav.Link as={Link} to="/orders">Customers</Nav.Link>
                  <Nav.Link as={Link} to="/report">Report</Nav.Link>
                  <Nav.Link as={Link} to="/print-report">Print</Nav.Link>
                </>
              )}
              {isLoggedIn && !isAdmin && (
                <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
              )}
            </Nav>
            <Nav>
              {!isLoggedIn && (
                <Nav.Link as={Link} to="/login" onClick={handleLogin}>Login</Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Container>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/report" element={<Report/>}/>
            <Route path="/orders" element={<Contact/>}/>
            {!isLoggedIn && (
              <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
            )}
            {isLoggedIn && isAdmin && (
              <Route path="/admin" element={<AdminPage />} />
            )}
            {isLoggedIn && !isAdmin && (
              <Route path="/my-profile" element={<MyProfile />} />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
