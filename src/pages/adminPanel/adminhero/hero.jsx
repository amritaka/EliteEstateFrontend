import { useNavigate } from 'react-router-dom'
import Nav from '../../../components/adminNav/navbar.jsx'
import './hero.css'
import { useEffect } from 'react'
function Heropage() {
    const navigate = useNavigate()

    // localStorage.getItem()
    const userDetail = localStorage.getItem("userInfo")
    const authentication = JSON.parse(userDetail)
    console.log(authentication,"Admin")
    // useEffect(() => {
    //     if (authentication == null) {
    //         navigate('/login')

    //     }
    // }, [])
    return (
        <>
            {/* <Nav /> */}
            <div className='head'>
                <h1>Admin Dashboard</h1>
            </div>
            <div className='herobox'>
                <div className='heroimgbox'></div>
                <div className='herotextbox'>
                    <h2>Welcome to Elite Estate</h2>

                    <p className='para'>Control, clarity, and confidence<br />everything a real estate admin needs, all in one place.
</p>
                </div>

            </div>
        </>
    )
}

export default Heropage