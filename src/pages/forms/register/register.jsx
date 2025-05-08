import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    mobileno: '',
    adhaarNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aadhaar number must be exactly 12 digits
    const adhaarRegex = /^\d{12}$/;
    if (!adhaarRegex.test(formData.adhaarNumber)) {
      toast.error('Aadhaar number must be exactly 12 digits.');
      return;
    }

    try {
      await axios.post('https://eliteestatebackend.onrender.com/regUser', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success('Registration successful!');
      setFormData({
        userName: '',
        email: '',
        password: '',
        mobileno: '',
        adhaarNumber: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(
        'Error during registration: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="regbody">
      <div className="regcontainer">
        <form className="regform" onSubmit={handleSubmit}>
          <div className="reghead">
            <h1>Sign Up</h1>
          </div>

          <input
            className="reginput"
            type="text"
            id="name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your Name"
            required
          />

          <input
            className="reginput"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />

          <input
            className="reginput"
            type="password"
            id="pswd"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            required
          />

          <div className="regphoneinput">
            <PhoneInput
              country={'us'}
              value={formData.mobileno}
              onChange={(value) => setFormData({ ...formData, mobileno: value })}
              placeholder="Enter your Phone number"
              inputProps={{
                name: 'mobileno',
                required: true,
                autoFocus: true,
              }}
              inputStyle={{ width: '100%' }}
              containerStyle={{ width: '270px', borderRadius: '20px' }}
            />
          </div>

          <input
            className="reginput"
            type="text"
            id="adhaar"
            name="adhaarNumber"
            value={formData.adhaarNumber}
            onChange={handleChange}
            placeholder="Enter your Aadhaar"
            maxLength={12}
            required
          />

          <button className="RegBttn" type="submit">
            <span>Submit</span>
          </button>

          <Link to="/login" className="regLinklogin">
            Click Here For Login..
          </Link>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;
