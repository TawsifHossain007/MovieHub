import React from 'react';
import { Link} from 'react-router';



const ErrorApps = () => {

    return (
        <div className='flex flex-col justify-center items-center mt-0 md:mt-16'>
            <img src="https://i.ibb.co.com/xStdmYzr/OBJECTS.png" alt="" />
            <h1 className='font-semibold text-[24px] md:text-[48px] mt-10'>OPPS!! APP NOT FOUND</h1>
            <p className='font-normal text-[20px] text-[#627382] mt-2 text-center'>The route you are requesting is not found on our system.  please try a different route</p>
             <button className='text-white bg-gradient-to-r from-[#632ee3] to-[#9f62f2] py-3 px-8 rounded-lg mt-6 cursor-pointer'> <Link to="/">Go Back!</Link></button>
        </div>
    );
};

export default ErrorApps;