import { useNavigate } from "react-router-dom"
import Property from "../property/property"
import { useContext, useEffect } from "react"
import AuthContext from "../../../context/authContext"

function Sell() {
    const navigate = useNavigate()

    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }
    }, [])
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2vw",
    
        }}>
            <Property he={"120vh"} wi={"50%"} />
        </div>
    )
}

export default Sell