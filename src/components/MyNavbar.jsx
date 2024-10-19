import Navbar from 'react-bootstrap/Navbar';
import ContainerFluid from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


function MyNavbar(){
    return(
        <>
        <Navbar className='bg-dark text-white'>
            <ContainerFluid>
                <Navbar.Brand className='text-white'>Attendance</Navbar.Brand>
                <Nav className='me-auto justify-content-center '>
                    <Nav.Link className='text-white'>Tracker</Nav.Link>
                    <Nav.Link className='text-white justify-content-end' >Login</Nav.Link>
                    <Nav.Link className='text-white justify-content-end' >Signup</Nav.Link>
                </Nav>
            </ContainerFluid>
        </Navbar>
        
        </>
    );
}

export default MyNavbar;
