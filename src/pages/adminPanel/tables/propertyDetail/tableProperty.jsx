import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './tableProperty.css';
import { PiNotePencilBold } from 'react-icons/pi';
import { ImCross } from 'react-icons/im';
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

function PropertyTable() {
    const navigate = useNavigate();
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);
    console.log(authentication);

    useEffect(() => {
        if (authentication == null) {
            navigate('/login');
        }
    }, [authentication, navigate]);

    const [property, setProperty] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://eliteestatebackend.onrender.com/getProperty');
                const transformData = response.data.map((item) => ({
                    _id: item._id,
                    UserId: item.UserId,
                    approved: item.approved,
                    area: item.area,
                    city: item.city,
                    image: item.image,
                    description: item.description,
                    listingType: item.listingType,
                    propertyName: item.propertyName,
                    price: item.price,
                    state: item.state,
                    subCategoryId: item.subCategoryId?.subCategoryName || '',
                    status: item?.data?.status || 'Not Sold'
                }));
                setProperty(transformData);
            } catch (error) {
                console.error('Error fetching properties', error);
            }
        };
        fetchProperties();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const response = await axios.put('https://eliteestatebackend.onrender.com/propertystatus', {
                id,
                approved: status
            });
            console.log(response.data);

            setProperty((prevState) =>
                prevState.map((item) =>
                    item._id === id ? { ...item, approved: status } : item
                )
            );
        } catch (error) {
            console.error('Error updating property status', error);
        }
    };

    const deleteProperty = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://eliteestatebackend.onrender.com/deleteProperty/${id}`);
                console.log(response.data);

                setProperty((prevState) => prevState.filter(item => item._id !== id));

                Swal.fire('Deleted!', 'Property has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting property', error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 240 },
        { field: 'propertyName', headerName: 'Property Name', width: 130 },
        { field: 'subCategoryId', headerName: 'Category Name', width: 130 },
        { field: 'city', headerName: 'City', width: 100 },
        { field: 'state', headerName: 'State', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'listingType', headerName: 'Listing Type', width: 100 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <div style={{ margin: '10px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={params.value}
                        alt="property"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '80px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            )
        },
        { field: 'approved', headerName: 'Status', width: 110 },
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            sortable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PiNotePencilBold
                        onClick={() => updateStatus(params.row._id, "Approved")}
                        fontSize={"1.5em"}
                        style={{ margin: "8px", cursor: "pointer", transition: "transform 0.2s" }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)") }
                    />
                    <ImCross
                        onClick={() => updateStatus(params.row._id, "Reject")}
                        fontSize={"1.5em"}
                        style={{ margin: "8px", cursor: "pointer", transition: "transform 0.2s" }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)") }
                    />
                    <MdDeleteForever
                        onClick={() => deleteProperty(params.row._id)}
                        fontSize={"1.6em"}
                        color="red"
                        style={{ margin: "8px", cursor: "pointer", transition: "transform 0.2s" }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)") }
                    />
                </div>
            )
        }
    ];

    return (
        <div className="subContainer" style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Paper sx={{ height: 600, width: '95%', padding: 2 }}>
                <DataGrid
                    rows={property}
                    columns={columns}
                    getRowId={(property) => property._id}
                    pageSizeOptions={[5, 10]}
                    rowHeight={70}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default PropertyTable;
