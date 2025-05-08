import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [detail, setDetail] = useState({});
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    async function fetchProfile() {
        const response = await axios.get("https://eliteestatebackend.onrender.com/getLog", {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        });
        console.log(response)
        setDetail(response.data);
    }
   
    useEffect(() => {
        fetchProfile()
    }, []);

  return (
    <ProfileContext.Provider value={{ detail}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
