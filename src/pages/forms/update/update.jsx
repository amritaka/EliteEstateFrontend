import { useEffect, useState } from 'react'
import axios from 'axios';
import './update.css'
import { useNavigate, useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Update() {
    const [detail,setDetail] = useState({})
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        mobileno: ''
        
    })
    const {id} = useParams()
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(()=>{
       async function fetchDetail() {
            try {
                const response = await axios.get("https://eliteestatebackend.onrender.com/getLog", {
                    headers: {
                        Authorization: `Bearer ${authentication.token}`
                    }
                });
                console.log("Detail",response)
                setDetail(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchDetail()
    },[id])

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
      
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData); // Debug: Check form data before submitting
            const response = await axios.put(`https://eliteestatebackend.onrender.com/updUser/${id}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);

            setMessage('Updated successfully');
            setFormData({
                userName: '',
                email: '',
                password: '',
                mobileno: '',
            });
            navigate('/profile')


        } catch (error) {
            setMessage('Error in updation: ' + (error.response?.data?.message || error.message));
        }
    };

    useEffect(() => {
        setFormData((prevFormData) => ({
            userName: detail.userName,
            email: detail.email,
            password: detail.password,
            mobileno: detail.mobileno
            
        }));
    }, []);
    

    return (
        <>
            <div className="updbody">
                <div className='updcontainer'>
                    <form className='updform' onSubmit={handleSubmit}>
                        <p>{message}</p>
                        <div class="updhead">
                            <h1>Update Form</h1>
                        </div>

                        <input
                            className='updinput'
                            type="text"
                            id="name"
                            name="userName"
                            value={formData?.userName}
                            onChange={handleChange}
                            placeholder=' Enter your Name'
                        />

                        <input
                            className='updinput'
                            type="text"
                            id="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />

                        <input className='updinput' type="password" id="pswd" name="password" value={formData?.password} onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />

                        <div className="updphoneinput">
                            <PhoneInput
                                country={'us'}
                                 
                                value={formData.mobileno}
                                onChange={(value) => setFormData({ ...formData, mobileno: value })}
                                placeholder='Enter your Phone number'
                                inputProps={{
                                    name: "mobileno",
                                    required: true,
                                    autoFocus: true
                                }}
                                inputStyle={{ width: "100%" }}
                                containerStyle={{ width: "270px", borderRadius: "20px" }}
                            />
                        </div>

                        <button className='updBttn'>
                            <span>Submit</span>
                        </button>
        
                    </form>
                </div>
            </div>
        </>
    )
}
export default Update