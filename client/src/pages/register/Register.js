import { useEffect, useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Facebook - Register';
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== passwordAgain) {
            setErrorMessage("Password don't match");
            setPasswordAgain('');
            setPassword('');
        } else {
            setErrorMessage('');
            const user = {
                username: `${firstName} ${lastName}`,
                email: email,
                password: password,
            };
            try {
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">facebook</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on
                        Facebook
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleRegister}>
                        <div className="registerUsername">
                            <input
                                placeholder="First name"
                                className="registerInput"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={() => {
                                    setErrorMessage('');
                                }}
                                required
                            />
                            <input
                                placeholder="Last name"
                                className="registerInput"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onFocus={() => {
                                    setErrorMessage('');
                                }}
                            />
                        </div>
                        <input
                            placeholder="Email address"
                            className="registerInput"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => {
                                setErrorMessage('');
                            }}
                            required
                        />
                        <input
                            placeholder="Password"
                            className="registerInput"
                            type="password"
                            minLength="8"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => {
                                setErrorMessage('');
                            }}
                            required
                        />
                        <input
                            placeholder="Password again"
                            className="registerInput"
                            minLength="8"
                            type="password"
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            onFocus={() => {
                                setErrorMessage('');
                            }}
                            required
                        />
                        <div className="registerError">{errorMessage}</div>
                        <button className="registerButton" type="submit">
                            Sign Up
                        </button>
                        <hr />
                        <div
                            className="registerRegisterButton"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Log Into Account
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
