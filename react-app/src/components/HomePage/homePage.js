import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllCoffee } from "../../store/coffee";
import './homePage.css';
import './carousel.css'
import './slider.css'
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


    // console.log("COFFEE ARR", coffeeArr.slice(0, 5))
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
    window.onload = () => {
        let slider = document.getElementsByClassName('slider')[0]
        slider.scrollLeft = 200
        // let coffeeSlider = document.getElementsByClassName('coffee-slider')[0]
        // coffeeSlider.scrollLeft = 200

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
            <div className='slider-container'>
                <div className='slider'>
                    {/* <div className="card">
                        <div className="card-info">
                            <div>

                                <div className="card-title">Light Roasts</div>
                                <div className="card-num">{light?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=light'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="card-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-light-roast.png" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <div>

                                <div className="card-title">Medium Roasts</div>
                                <div className="card-num">{medium?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=medium'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="card-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-medium-roast.png" />
                        </div>
                    </div>

                    <div className="card" >
                        <div className="card-info">
                            <div>

                                <div className="card-title">Dark Roasts</div>
                                <div className="card-num">{dark?.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?roast=dark'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="card-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780539/landing/homepage/desktop-dark-roast.png" />
                        </div>
                    </div>

                    <div className="card" >
                        <div className="card-info">
                            <div>

                                <div className="card-title">Single Origin</div>
                                <div className="card-num"> {single} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?origin=singleOrigin'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="card-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-staff-picks.png" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <div>

                                <div className="card-title">Blends</div>
                                <div className="card-num">{blend.length} COFFEES</div>
                            </div>
                            <div>
                                <NavLink to='/cawfee/?origin=Various%20(blend)'>
                                    <img alt='letsgo' className='letsgo' height='39' width='39' src={letsgo} />
                                </NavLink>
                            </div>
                        </div>
                        <div id="card-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780539/landing/homepage/desktop-most-popular.png" />
                        </div>
                    </div> */}
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
            </div>
            <div className='perfect-cup'>
                A perfect cup for everyone.
            </div>
            <div className='experience-coffees'>
                Experience ethically sourced coffees from small roasters in California.
            </div>
            <div className='slider-container'>
                {/* <div className='coffee-slider'>
                    
                    <div className="card-coffee">
                        <div className="card-info">
                            <div>
                                <div className="learn-more">Shop All</div>
                            </div>
                        </div>
                        <div id="card-coffee-image">
                            <img alt='light' src="https://res.cloudinary.com/roastcollective/image/upload/w_182,f_auto,fl_progressive:steep,q_auto:good/v1663780540/landing/homepage/desktop-staff-picks.png" />
                        </div>
                    </div>

                    {coffeeArr.slice(0, 5).map(obj => {
                        return (

                            <div className="card-coffee">
                                <div className="card-image-wrapper">
                                    <img alt='single coffee' className="card-image" src={obj.img_url}
                                        onError={e => e.target.src = noImg} />
                                </div>

                                <NavLink key={obj.id} style={{ color: 'black' }} to={`/cawfee/${obj.id}`}>
                                    <div className='card-title-div'>
                                        <div>
                                            <div className="coffee-card-title">{obj.name}</div>
                                            <div className="coffee-card-brand">{obj.Brand?.name} | {obj.Brand?.city}, {obj.Brand?.state} </div>
                                        </div>

                                    </div>
                                </NavLink>


                            </div>
                        )
                    })}
                </div> */}
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
                                        
                                    </div>
                                </NavLink>


                            </div>
                        )
                    })}
                </Carousel>
            </div>

            <div className="scrolling-banner">
                <div className="menu__item">
                    <div className="marquee">
                        <div className="marquee__inner">
                            <span>Free Shipping</span>
                            <span>Ethically Sourced</span>
                            <span>Roasted Fresh to Order</span>
                            <span>Support Local Roasters</span>
                            <span>Specially Curated Coffees</span>
                            <span>Delivered on Your Schedule</span>
                            <span>Roasted Fresh to Order</span>
                            <span>Support Local Roasters</span>
                            <span>Free Shipping</span>
                            <span>Ethically Sourced</span>
                            <span>Roasted Fresh to Order</span>
                            <span>Support Local Roasters</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='double-div'>
                <div className='local-roaster-title'>

                    Supporting local roasters in California
                </div>
                <div className='double'>
                    <div className='double-panel'>
                        <div className='double-panel-img'>

                            <img alt='bean and bean' src="//images.ctfassets.net/o88ugk6hewlf/hHri2lBehPWnITqpeaTP6/7cc2bb0b8fbd2f0ec4ab2cc0b06ffa1e/desktop-50-beanbean_hmujuh.jpg?q=75&fm=webp&w=1000" onError={e => e.target.src = noImg} />
                        </div>
                        <div className='double-panel-title'>Get to Know Our Roasters</div>
                        <div className='double-panel-body'>Explore the dedicated people standing behind your coffee.</div>
                        <NavLink className='double-panel-body panel-link' to='/roasters'>View Roasters</NavLink>
                    </div>
                    <div className='double-panel'>
                        <div className='double-panel-img' >
                            <img alt='explore' src="https://images.ctfassets.net/o88ugk6hewlf/4N7cJ0P1uGYC2BreAZtyZQ/a465e5e07823c13c9386713a69bda67e/desktop-tile-plans.jpg?fl=progressive&q=75" onError={e => e.target.src = noImg} />
                        </div>
                        <div className='double-panel-title'>Find Coffee From Your Local Roaster</div>
                        <div className='double-panel-body'>Travel along the California coast with the best roasters in the state.</div>
                        <NavLink className='double-panel-body panel-link' to='/cawfee'>Shop Coffee</NavLink>
                    </div>
                </div>
            </div>
            <div className='homepage-get-started'>
                <div className='homepage-get-started-today'>
                    Get started today with our First Match Guarantee.
                </div>
                <div className='homepage-splash-buttons'>
                    <NavLink to='/cawfee' style={{ textDecoration: 'none' }} id='homepage-dark-bg' className='homepage-try-now'>TRY NOW</NavLink>
                    <NavLink to='/cawfee' style={{ textDecoration: 'none' }} id='homepage-dark-bg-shop-all' className='homepage-shop-all'>SHOP ALL COFFEE</NavLink>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
