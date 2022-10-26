import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.css';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        // return () => dispatch(clearData());
    }, [dispatch])


    return (
        <div className='homepage-container'>
            <div className='homepage-splash'>
                <div className='homepage-text'>
                    <div className='homepage-text-upgrade'>Easily Upgrade</div>
                    <div className='homepage-text-upgrade'>Your Coffee</div>
                    <div>The best coffee delivered fresh to your door from the top craft roasters in California</div>
                    <div>
                        {/* <div>Try Now</div> */}
                        <div>Shop All Coffee</div>
                    </div>
                </div>
                <img src="https://res.cloudinary.com/roastcollective/image/upload/f_auto/v1664460478/web/homepage/desktop-hero-revised.png" />
            </div>
            <div className='recent-activity-container'>
                <h2 className='recent-activity-title'>
                    Recent Activity
                </h2>
                <div className='recent-cards-container'>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
