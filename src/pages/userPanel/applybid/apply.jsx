import { useContext, useEffect, useState } from 'react'
import './apply.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../context/authContext'
function Applybid() {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        propertyId: id,
        amountBid: "",
        message: "",

    })
    const navigate = useNavigate()

    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, " ", value)
        setFormData({ ...formData, [name]: value });
    };


    const tokenData = localStorage.getItem("userInfo")
    const authentication = JSON.parse(tokenData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clean commas and convert to number
        const cleanedAmount = parseFloat(formData.amountBid.replace(/,/g, ''));
        if (isNaN(cleanedAmount)) {
            toast.error("Please enter a valid number for amountBid");
            return;
        }

        const dataToSend = {
            ...formData,
            amountBid: cleanedAmount,
        };

        try {
            const response = await axios.post(`https://eliteestatebackend.onrender.com/applyCreate`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                },
            });

            console.log(response);
            toast.success(response.data);

            setFormData({
                amountBid: "",
                message: "",
            });

            setTimeout(() => {
                navigate(`/single/${id}`);
            }, 2000);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data || "An error occurred");
        }
    };


    return (
        <>
            <div className="applymain">
                <div className="applyform">
                    <form action="" className='applyForm2' onSubmit={handleSubmit}>
                        <h1>Amount you want to offer </h1>
                        <input
                            type="text"
                            name="amountBid"
                            placeholder="Amount Offered"
                            value={formData.amountBid}
                            onChange={(e) => {
                                const raw = e.target.value;
                                // Allow only digits and commas (for formatting)
                                if (/^[0-9,]*$/.test(raw)) {
                                    handleChange(e);
                                }
                            }}
                        />

                        <textarea name="message" id="message" onChange={handleChange}></textarea>
                        <button className='applybidbtn'>Send</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Applybid