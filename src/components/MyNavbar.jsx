import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useFirebase } from '../contexts/Firebase';
import { useEffect } from 'react';



function myNavBar() {
  const { user,signOutUser,isAuthReady } = useFirebase();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthReady) {
    return (
      <Navbar bg="dark" variant="dark" className='nav-bar dark'>
        <Navbar.Brand as={Link} to="/" className='nav-bar-brand'>Attendance</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className='nav-bar-home'>Home</Nav.Link>
        </Nav>
      </Navbar>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className='nav-bar dark'>
        <Navbar.Brand as={Link} to="/" className='nav-bar-brand'>Attendance</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className='nav-bar-home'>Home</Nav.Link>
        </Nav>  
        <Nav>
          {user?(
            <>
              <Navbar.Text className='text-light me-3'>
                {user.displayName||user.email}
              </Navbar.Text>
              <Nav.Link onClick={handleLogout} className='nav-bar-logout'>Logout</Nav.Link>
            </>
          ):(
            <>
              <Nav.Link as={Link} to="/login" className='nav-bar-login'>
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default myNavBar