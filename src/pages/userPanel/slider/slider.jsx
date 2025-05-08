import { useEffect, useState } from 'react';
import './slider.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function SliderUser() {
    const images = [
        "/slidepics/slide1.jpg",
        "/slidepics/slide2.jpg",
        "/slidepics/slide3.jpg",
        "/slidepics/slide4.jpg",
        "/slidepics/slide5.jpg",
        "/slidepics/slide6.jpg",
        "/slidepics/slide7.jpg",
        "/slidepics/slide8.jpg",
        "/slidepics/slide9.jpg",
        "/slidepics/slide10.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // every 4 seconds (smooth + visible)
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="sliderContainer">
            <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="sliderImage"
                        style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentIndex === index ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    >
                        {currentIndex === index && (
                            <div className="sliderContent">
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Buy. Sell. Rent.
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Discover your dream property or list yours with ease and confidence.
                                </motion.p>
                                <Link to={"/listing"} style={{ textDecoration: "none", cursor: "pointer" }}>
                                    <motion.button
                                        className="sliderBtn"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ position: 'relative', zIndex: 10 }}
                                    >
                                        Explore Now
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default SliderUser;
