import { useUser } from 'context/userContext';
import React from 'react'

const PrivateComponent = ({ roleList, children }) => {
    const { userData } = useUser();
    console.log("user DAta en Private Componet", userData);

    if (roleList.includes('admin')){
        return children; 
    }
    return <></>;
};

export default PrivateComponent;
