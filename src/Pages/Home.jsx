import React from 'react';
import Banner from '../Components/Banner/Banner';
import Stats from '../Components/Statistics/Stats';

const Home = () => {
    return (
        <div className='bg-base-100 min-h-screen'>
            <Banner></Banner>
            <Stats></Stats>
        </div>
    );
};

export default Home;