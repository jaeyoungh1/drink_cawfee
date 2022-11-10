import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllCoffee } from "../../store/coffee";
import './homePage.css';
import './carousel.css'
import letsgo from '../../icons/letsgo.svg'
import Carousel from './Carousel';
import noImg from '../../icons/no_image.svg'


const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllCoffee())
        // return () => dispatch(clearData());
    }, [dispatch])

    const coffees = useSelector(state => state.coffee.allCoffee)
    const coffeeArr = Object.values(coffees)
    const light = Object.values(coffees)?.filter(obj => obj.roast === 'light')
    const medium = Object.values(coffees)?.filter(obj => obj.roast === 'medium')
    const dark = Object.values(coffees)?.filter(obj => obj.roast === 'dark')
    const blend = Object.values(coffees)?.filter(obj => obj.origin === 'Various (Blend)')
    const single = Object.values(coffees)?.length - Object.values(coffees)?.filter(obj => obj.single === 'Various (Blend)')?.length


    console.log("COFFEE ARR", coffeeArr.slice(0, 5))
    const items = ['one', 'two', 'three', 'four', 'five', 'six']

    const setting = {
        dragSpeed: 1.25,
        itemWidth: 380,
        itemHeight: 240,
        itemSideOffsets: 15,
    }

    const itemStyle = {
        width: `${setting.itemWidth}px`,
        height: `${setting.itemHeight}px`,
        margin: `0px ${setting.itemSideOffsets}px`
    }
    const coffeeItemStyle = {
        width: `240px`,
        height: `360px`,
        margin: `0px ${setting.itemSideOffsets}px`
    }


    return (

        <div className='homepage-container'>
            <div className='homepage-splash'>
                <div className='homepage-text'>
                    <div className='homepage-text-upgrade'>Easily Upgrade</div>
                    <div className='homepage-text-upgrade'>Your Coffee</div>
                    <div className='homepage-text-best'>The best coffee delivered fresh to your door from the top craft roasters in California</div>
                    <div className='homepage-splash-buttons'>
                        <NavLink to='/cawfee' style={{ textDecoration: 'none' }} className='homepage-try-now'>TRY NOW</NavLink>
                        <NavLink to='/cawfee' style={{ textDecoration: 'none' }} className='homepage-shop-all'>SHOP ALL COFFEE</NavLink>
                    </div>
                </div>
                <img src="https://res.cloudinary.com/roastcollective/image/upload/f_auto/v1664460478/web/homepage/desktop-hero-revised.png" />
            </div>
            <div className='carosel'>
                <Carousel _data={items} {...setting}>
                    <div className="item" style={{ ...itemStyle }}>
                        <div className="item-info">
                            <div>

                                <div className="item-title">Light Roasts</div>
                                <div className="item-num">{light?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=light'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-light-roast.png" />
                        </div>
                    </div>

                    <div className="item" style={{ ...itemStyle }}>
                        <div className="item-info">
                            <div>

                                <div className="item-title">Medium Roasts</div>
                                <div className="item-num">{medium?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=medium'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-medium-roast.png" />
                        </div>
                    </div>

                    <div className="item" style={{ ...itemStyle }}>
                        <div className="item-info">
                            <div>

                                <div className="item-title">Dark Roasts</div>
                                <div className="item-num">{dark?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=dark'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780539/landing/homepage/desktop-dark-roast.png" />
                        </div>
                    </div>

                    <div className="item" style={{ ...itemStyle }}>
                        <div className="item-info">
                            <div>

                                <div className="item-title">Single Origin</div>
                                <div className="item-num"> {single} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?origin=singleOrigin'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-staff-picks.png" />
                        </div>
                    </div>

                    <div className="item" style={{ ...itemStyle }}>
                        <div className="item-info">
                            <div>

                                <div className="item-title">Blends</div>
                                <div className="item-num">{blend.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?origin=Various%20(blend)'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780539/landing/homepage/desktop-most-popular.png" />
                        </div>
                    </div>

                </Carousel>


            </div>
            <div className='perfect-cup'>
                A perfect cup for everyone.
            </div>
            <div className='experience-coffees'>
                Experience ethically sourced coffees from small roasters in California.
            </div>
            <div className='coffee-carousel'>
                <Carousel className='carousel' _data={items} {...setting}>
                    <div className="item-coffee" style={{ ...coffeeItemStyle }}>
                        <div className="item-info">
                            <div>
                                <div className="learn-more">Shop All</div>
                            </div>
                        </div>
                        <div id="item-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-staff-picks.png" />
                        </div>
                    </div>

                    {coffeeArr.slice(0, 5).map(obj => {
                        return (

                            <div className="item-coffee" style={{ ...coffeeItemStyle }}>

                                <div className="item-image-wrapper">
                                    <img alt='single coffee' className="item-image" src={obj.img_url}
                                        onError={e => e.target.src = noImg} />
                                </div>

                                <NavLink key={obj.id} style={{ color: 'black' }} to={`/cawfee/${obj.id}`}>
                                    <div className='item-title-div'>
                                        <div>
                                            <div className="coffee-item-title">{obj.name}</div>
                                            <div className="coffee-item-brand">{obj.Brand?.name} | {obj.Brand?.city}, {obj.Brand?.state} </div>
                                        </div>
                                        {/* <div className="coffee-item-brand learn-more">
                                            Learn More
                                        </div> */}
                                    </div>
                                </NavLink>


                            </div>
                        )
                    })}


                </Carousel>
            </div>


            <div className='scrolling-banner'>
                <div>
                    <span>
                        Roasted Fresh to Order
                    </span>
                    <span>
                        Free Shipping
                    </span>
                    <span>
                        Delivered on Your Schedule
                    </span>
                    <span>
                        Ethically Sourced
                    </span>
                    <span>
                        Support Local Roasters
                    </span>
                    <span>
                        Roasted Fresh to Order
                    </span>
                    <span>
                        Free Shipping
                    </span>
                    <span>
                        Delivered on Your Schedule
                    </span>
                    <span>
                        Ethically Sourced
                    </span>
                    <span>
                        Support Local Roasters
                    </span>
                </div>
                <div className='banner-2'>
                    <span>
                        Roasted Fresh to Order
                    </span>
                    <span>
                        Free Shipping
                    </span>
                    <span>
                        Delivered on Your Schedule
                    </span>
                    <span>
                        Ethically Sourced
                    </span>
                    <span>
                        Support Local Roasters
                    </span>
                    <span>
                        Roasted Fresh to Order
                    </span>
                    <span>
                        Free Shipping
                    </span>
                    <span>
                        Delivered on Your Schedule
                    </span>
                    <span>
                        Ethically Sourced
                    </span>
                    <span>
                        Support Local Roasters
                    </span>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
