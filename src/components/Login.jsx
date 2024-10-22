import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


function Login(){

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    

    function handleEmailChange(event){
        setEmail(e => event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(p => event.target.value);
    }

    function signIn(){

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
            <Button onClick={signIn} className='btn-dark signin-btn' > Sign in</Button>
        </Form>

    </div>);
}

export default Login;