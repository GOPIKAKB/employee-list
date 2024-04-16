import React, { useContext, useState } from 'react';
import axios from 'axios';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const { setJwtToken } = useContext(myContext)

    const nav = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://carxier-dev.tahrtech.in/api/v1/auth/signin', {
                email: email,
                password: password
            });

            console.log('Login successful:', response);
            setJwtToken(response.data.token)
            nav('/employeelist')
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
