import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-login-background');

    return () => {
      document.body.classList.remove('body-login-background');
    };
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setNameError('Masukan nama yang valid');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setRegisterSuccess(true);
      setTimeout(() => {
        navigate('/login');
      },1000); 
    }, 1000); 
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {registerSuccess && <p className="success">Successful register!</p>}
        <div className='input-box'>
          <input 
            type="text" 
            placeholder='Name'
            value={name}
            onChange={handleNameChange}
          />
          {nameError && <p className="error">{nameError}</p>}
        </div>
        <div className='input-box'>
          <input type="email" placeholder='example@gmail.com'/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password'/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Confirm Password'/>
        </div>
        <button type='submit'>Register</button>

        <div className='register-link'>
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
