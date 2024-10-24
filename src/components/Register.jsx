import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import  Spinner  from 'react-bootstrap/Spinner';
import { useFirebase } from '../contexts/Firebase.jsx';
function Register(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState(" ");
    const [notice,setNotice] = useState("");
    const [loading,setLoading] = useState(false);

    const firebase = useFirebase();

    function handleEmailChange(event){
        setEmail(e => event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(p => event.target.value);
    }
    function handleConfirmPasswordChange(event){
        setConfirmPassword(c => event.target.value);
;    }

    const signupWithUsernameAndPassword = async (e) => {
        if(password === confirmPassword){
            try{
                setLoading(true);
                const userCredential = await firebase.signupUserWithEmailAndPassword(email,password);
                setLoading(false);
                console.log(userCredential)
                setNotice("account created");
            }
            catch(error){
                console.log("logged by register compoenent"+error)
                setLoading(false);
                setNotice("something went wrong, please fuck off");
            }
        }
        else{
            setNotice("passwords do not match")
        }
    }


    return (        
    <div className="credential-box">
        <h1 className='mb-5' >Sign Up</h1>
        <Form>
            <Form.Group>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control onChange={handleEmailChange} className='dark-input no-glow mb-2' type='email'  />
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control onChange={handlePasswordChange} className='dark-input no-glow mb-2'  type='password'  />
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control onChange={handleConfirmPasswordChange} className='dark-input no-glow mb-4'  type='password'  />
            </Form.Group>
            <div className='text-center'>
            <Button onClick={signupWithUsernameAndPassword} className='btn-dark signin-btn'>
                {loading? 
                <Spinner animation = "border" variant='light'size='sm'/>
                :"Sign Up"}
            </Button>

            </div>
            <p>{notice}</p>
        </Form>

    </div>);
}

export default Register;