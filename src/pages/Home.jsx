import React from 'react'

 const Home = () => {
   return (
     <div className=" p-8  flex-col  ml-64">
       <div className="bg-gray-200 p-6 rounded-lg shadow-sm h-72">
         <h2 className="text-center text-2xl font-bold mb-1 text-blue-900  ">
           Te damos la bienvenida a FitnesShop
         </h2>
         <h4 className="text-center font-bold text-blue-900  ">
           Sistema de Gestíon de ventas
         </h4>
         <p>
           Aquí podrás gestionar todo lo relacionado con tus pedidos y la
           administración de tus Productos.
         </p>
         <span>Elige una opción a tu izquierda</span>
       </div>
     </div>
   );
 };
    
export default Home
