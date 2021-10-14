import React  from 'react';
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import PrivateRoute from 'components/PrivateRoute';


const PrivateLayout = ({ children }) => {
    return (
        <div>
            <PrivateRoute> 
                <div >
                    <Navbar />
                    <div className="flex w-screen h-screen">
                        <Sidebar />
                        <main className="flex w-full ">{children}</main>
                    </div>
                </div>
                </PrivateRoute> 
        </div>
    )
}

export default PrivateLayout