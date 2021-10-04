import React from 'react';
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'


const PrivateLayout = ({ children })=>  {
    return (
        <div >
        <Navbar/>
        <div className="flex w-screen h-screen">
        <Sidebar/>
        <main className="flex w-full ">{children}</main>
        </div>
        </div>
    )
}

export default PrivateLayout