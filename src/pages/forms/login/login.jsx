import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/authContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const { auth ,setAuth , setToken} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('https://eliteestatebackend.onrender.com/logUser', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response);
            const obj = {
                token: response.data.token,
                authtype: response.data.typeOfUSer
            }
            setAuth(obj.authtype)
            setToken(obj.token)

            const stringifiedObj = JSON.stringify(obj)

            localStorage.setItem(
                "userInfo",
                stringifiedObj
            )

            // localStorage.setItem('token', response.data.token);
            toast.success('Login Successful');

            setFormData({
                email: '',
                password: ''
            });

            setTimeout(() => {
                if (response.data.typeOfUSer === "Admin") {
                    navigate('/hero')
                } else {
                    navigate("/")
                }

            }, 3000)

        } catch (error) {
            setMessage((error.response?.data || error.message));
            toast.error((error.response?.data || error.message));
        }
    };

    return (
        <div className="logbody">
        <div className='logcontainer'>
            <form className="logform" onSubmit={handleSubmit}>
                <p>{message}</p>
                <div class="loghead">
                    <h1>Sign In</h1>
                </div>

                
                    <input
                    className='loginput'
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                    />

                
                    
                    <input
                        type="password"
                        id="pswd"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        required
                    />
                <button className='LoginBtn'>
                    <span>Submit</span>
                </button>
                <Link to={'/register'} className='Linkregister'>Click Here For Register..</Link>
            </form>



            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        </div>
    );
};

export default Login;
