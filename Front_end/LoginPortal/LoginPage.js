import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const handleLogin = () => {
        if (!email || !password || !role) {
            setError("All fields are required.");
            return;
        }
        setError(""); 
        if (role === "Admin") navigate("/admin");
        else if (role === "Manager") navigate("/manager");
        else if (role === "Employee") navigate("/employee");
    };
    return (
        <div className="login-container">
            <h2>Login to EMS Portal</h2>
            {error && <p className="error-msg">{error}</p>}
            <div className="input-group">
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="input-group">
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="role-selection">
                <label>Select Role:</label>
                <div>
                    <label>
                        <input type="radio" name="role" value="Admin" onChange={(e) => setRole(e.target.value)} /> Admin
                    </label><br/>
                    <label>
                        <input type="radio" name="role" value="Manager" onChange={(e) => setRole(e.target.value)} /> Manager
                    </label><br/>
                    <label>
                        <input type="radio" name="role" value="Employee" onChange={(e) => setRole(e.target.value)} /> Employee
                    </label><br/>
                </div>
            </div>
            <button className="login-btn" onClick={handleLogin}>Log in</button>
        </div>
    );
};
export default LoginPage;