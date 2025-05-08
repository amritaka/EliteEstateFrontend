import { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import Cards from '../../../components/cardcomponent/cardmain';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import History from '../history/history';

function Profile() {
    const [detail, setDetail] = useState({});
    const [loggedProfile, setLoggedProfile] = useState([]);
    const [name, setName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Not Sold');
    const [amount, setAmount] = useState('');
    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get("https://eliteestatebackend.onrender.com/getLog", {
                headers: {
                    Authorization: `Bearer ${authentication.token}`
                }
            });
            console.log(response)
            setDetail(response.data);
        }
        fetchProfile();
        fetchProperties();
    }, []);

    useEffect(() => {
        if (detail.userName) {
            const getInitials = (name) => name.split(' ').map(word => word[0]).join('').toUpperCase();
            setName(getInitials(detail.userName));
        }
    }, [detail]);

    const fetchProperties = async () => {
        const response = await axios.get("https://eliteestatebackend.onrender.com/loggedProperty", {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        });
        console.log(response)
        setLoggedProfile(response.data);
    };

    const handleEditClick = (property) => {
        setPropertyToEdit(property);
        setSelectedStatus(property.status || 'Not Sold');
        setAmount(property.price || '');
        setIsModalOpen(true);
    };

    const handleModalClose = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (propertyToEdit) {
            try {
                const updatedProperty = {
                    ...propertyToEdit,
                    status: selectedStatus,
                    amount: amount
                };

                await axios.put(`https://eliteestatebackend.onrender.com/property/update/${propertyToEdit._id}`, updatedProperty, {
                    headers: { Authorization: `Bearer ${authentication.token}` }
                });

                fetchProperties();
                setIsModalOpen(false);

                Swal.fire({ title: 'Success!', text: 'Property updated successfully.', icon: 'success', confirmButtonText: 'Ok' });
            } catch (error) {
                Swal.fire({ title: 'Error!', text: 'There was an issue updating the property.', icon: 'error', confirmButtonText: 'Try Again' });
            }
        }
    };

    return (
        <div className='container py-4'>
            <div className='row mb-4'>
                <div className='col-md-4'>
                    <div className='card shadow-sm'>
                        <div className='card-body text-center'>
                            <div className='profile-img bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3' style={{ width: 100, height: 100, fontSize: 36 }}>{name}</div>
                            <h5 className='card-title'>{detail.userName}</h5>
                            <p className='card-text'><strong>Email:</strong> {detail.email}</p>
                            <p className='card-text'><strong>Mobile:</strong> +{detail.mobileno}</p>
                            <Link to={`/update/${detail._id}`} className='btn btn-outline-primary btn-sm'>Edit Profile</Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='card shadow-sm mb-4'>
                        <div className='card-header bg-primary text-white'>Properties for Sale</div>
                        <div className='card-body d-flex flex-wrap gap-3'>
                            {loggedProfile.map((value) => (
                                <div className='card p-2' key={value._id} style={{ width: '18rem', opacity: value.approved === 'Approved' ? 1 : 0.6 }}>
                                    {value.approved !== "Approved" && (
                                        <span className='badge bg-danger mb-2'>{value.approved === "Reject" ? "Rejected By Team" : "Not Approved"}</span>
                                    )}
                                  <Link to={`/single/${value._id}`} style={{textDecorationColor:'none'}}>  <Cards img={value.image} heading={value.propertyName} /></Link>
                                    <button className='btn btn-outline-secondary btn-sm mt-2' onClick={() => handleEditClick(value)}>Edit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='card shadow-sm'>
                        <div className='card-header bg-primary text-white'>Properties applied for</div>
                        <div className='card-body'>
                            <History />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Property</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group mb-2">
                                        <label>Status:</label>
                                        <select className="form-control" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                                            <option value="Not Sold">Not Sold</option>
                                            <option value="Sold">Sold</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount:</label>
                                        <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter Amount" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
