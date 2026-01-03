import axios from 'axios';
import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';

const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000'
    })

const useAxiosSecure = () => {

    const {user, logout} = use(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
     const reqInterceptor =  axiosSecure.interceptors.request.use(config=>{
            config.headers.authorization = `Bearer ${user?.accessToken}`;
            return config;
        })

        const resInterceptor = axiosSecure.interceptors.request.use((response)=>{
            return response;
        },(err)=>{
            console.log('response interceptor error', err);

            const statusCode = err.status;
            if(statusCode === 401 || statusCode === 403){
                logout()
                .then(()=>{
                    navigate('/auth/login');
                })
            }

            return Promise.reject(err);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.request.eject(resInterceptor);
        }
    }, [user,navigate,logout]);
    

    return axiosSecure;
};

export default useAxiosSecure;