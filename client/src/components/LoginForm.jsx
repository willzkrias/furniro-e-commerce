import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './LoginForm.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.classList.add('body-login-background');

    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }

    return () => {
      document.body.classList.remove('body-login-background');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = 'example@gmail.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', rememberMe);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div className='input-box'>
          <input 
            type="email" 
            placeholder='example@gmail.com' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input 
            type="password" 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={handleRememberMeChange} 
            />
            Remember Me
          </label>
          <Link to="/" className='tag'>Forgot Password</Link>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
