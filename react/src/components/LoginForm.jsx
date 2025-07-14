import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [employee_id, setID] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        await login(employee_id, password);
        navigate('/'); // Redirect to the search page after login
    };

    return (
        <div className="container">
            <h1 className='login-header'>Login</h1>
            <form onSubmit={handleLogin} className="mt-5">
                <div className="form-group">
                    <label htmlFor="employee_id"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="employee_id"
                        placeholder="Employee ID (1-2000)"
                        value={employee_id}
                        onChange={(e) => setID(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;