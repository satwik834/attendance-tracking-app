import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';



function myNavBar() {
  return (
    <>

      <Navbar bg="dark" variant="dark" className='nav-bar'>
        <Navbar.Brand as={Link} to="/" className='nav-bar-brand'>Attendance</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className='nav-bar-home'>Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login" className='nav-bar-login'>Login</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default myNavBar