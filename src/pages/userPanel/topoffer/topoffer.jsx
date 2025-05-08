import "./topoffer.css"

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from "axios";
import { Link } from "react-router-dom";

function TopOffer() {

    const [offer, setOffer] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const Response = await axios.get('https://eliteestatebackend.onrender.com/offerProperty')
                console.log(Response)
                setOffer(Response.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])



    return (
        <div className="topContainer">
            <h1 style={{
                color:"black",
                textShadow:"1px 1px 2px orange",
                fontSize:"3vw",
                fontWeight:"bolder",
                margin:"2vw"
            }}>Top Offers</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={false}
                spaceBetween={"5rem"}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 20,
                    modifier: 1,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >


                {
                    offer.map((d) => (
                        <SwiperSlide>

                            <Link to={`/single/${d._id}`} style={{textDecoration:"none",cursor:"grab",color:"black"}}>
                            <div className="row  ">
                                <div className="col-md-4 border border-black w-75" id="ff" style={{
                                       borderRadius:"20px"
                                }}>
                                    <div className="txt-form" style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        alignItems:"center",
                                     


                                    }}>
                                        <img src={d.image} alt="" srcset="" height={"200px"} width={"100%"} id="img" style={{
                                       borderRadius:"20px"
                                }} />
                                        <h4 className="fw-bold" style={{color:"black",textShadow:"1px 1px 2px orange",textTransform:"capitalize"}}>{d.propertyName}</h4>
                                        <small className="fw-bold offercut " style={{color:"maroon"}}>Price: ₹{d.price * 50}</small>
                                        <h5 className="fw-bold">Offer Price: ₹{d.price}</h5>
                                        <div className="adr">
                                            {d.city}, {d.state}, {d.area}
                                        </div>
                                        <div className="txt1-form  d-flex  gap-3" style={{color:"gray"}}>
                                            <no className="no " style={{color:"gray"}}>+{d.UserId.mobileno}</no>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
export default TopOffer