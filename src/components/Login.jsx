import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Spinner  from 'react-bootstrap/Spinner';
import { useFirebase } from '../contexts/Firebase.jsx';
import { Row,Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';

function Login(){

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [notice,setNotice] = useState("");
    const [isloading,setIsLoading] = useState(false);
    const [isGoogleLoading,setIsGoogleLoading] = useState(false);



    const firebase = useFirebase();

    function handleEmailChange(event){
        setEmail(e => event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(p => event.target.value);
    }

    const navigate = useNavigate();
    const loginWithUsernameAndPassword = async(e) => {
        e.preventDefault();

        try{
            setIsLoading(true);
            const userCredential = await firebase.signinUserWithEmailAndPassword(email,password)
            setNotice("logged in"+userCredential.user.email);
            setIsLoading(false);

        }catch(error){
            console.log("logged by login componed: "+error);
            setNotice("something went wrong please fuck off")
            setIsLoading(false);
        }
    }
    return (        
    <div className="credential-box">
        <h1 className='mb-5'>Sign in</h1>
        <Form>
            <Form.Group>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control onChange={handleEmailChange} className='dark-input no-glow mb-2' type='email'  />
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control onChange={handlePasswordChange} className='dark-input no-glow mb-4'  type='password'  />
            </Form.Group>
            <Row>
                <Col>
                    <Button onClick={loginWithUsernameAndPassword} className='btn-dark signin-btn w-100'>
                        {isloading?
                        <Spinner animation = "border" variant='light'size='sm'/>
                        :"Sign in"}
                    </Button>
                </Col>
                <Col>                
                    <Button className='btn btn-light signin-btn w-100'onClick={() => navigate('/register')}>Register</Button>
                </Col>
            </Row>
            <p>{notice}</p>
            <br></br>
            <div className='text-center'>
                <Button  className='btn-dark signin-with-google w-100'>
                    {isGoogleLoading? 
                    <Spinner animation = "border" variant='light'size='sm'/>
                    :"Continue with Google"}
                </Button>
                
            </div>
        
        </Form>

    </div>);
}

export default Login;