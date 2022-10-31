import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAllCoffee } from "../../store/coffee";
import arrow from '../../icons/arrow.svg'
import './allCoffee.css'
import brokenImg from '../../icons/broken-img.png'
import SingleOrigin from "./singleOrigin";

export default function AllCoffee() {
    const dispatch = useDispatch()
    let search = useLocation().search
    let roast = new URLSearchParams(search).get('roast')
    let origin = new URLSearchParams(search).get('origin')
    let note = new URLSearchParams(search).get('note')
    console.log("ORIGIN", origin)

    const coffees = useSelector(state => state.coffee.allCoffee)

    useEffect(() => {
        if (origin) {
            dispatch(loadAllCoffee(origin))
        } else {
            dispatch(loadAllCoffee())
        }
    }, [dispatch])

    let title
    let subtitle
    if (origin) {
        title = 'Single Origin'
        subtitle = 'Savor these clear, authentic expressions of unique regions around the world.'
    } else {
        title = 'All Coffee'
        subtitle = 'Choose from a wide variety of coffee from the top roasters in California. All coffee is roasted to order and shipped fresh to your door.'
    }



    let allCoffee
    if (coffees) {
        let coffeeArr = Object.values(coffees)
        allCoffee = coffeeArr.map(obj => {
            return (
                <div className='all-coffee-single-container' key={obj.id}>
                    <NavLink to={`/cawfee/${obj.id}`}>
                        <div className="single-coffee-image-wrapper">
                            <img alt='single coffee' className="single-coffee-image-wrapper-img" src={obj.img_url}
                                onError={e => e.target.src = brokenImg} />
                        </div>
                    </NavLink>

                    <div className='all-coffee-line-break'></div>
                    <div className='all-coffee-details'>
                        <div className='all-coffee-details-brand'>
                            {obj.Brand.name.toUpperCase()}
                        </div>
                        <div className='all-coffee-details-name'>
                            <NavLink style={{ textDecoration: 'none', color: 'black' }} className='all-coffee-details-name' to={`/cawfee/${obj.id}`}>
                                {obj.name}
                            </NavLink>
                        </div>
                        <div className='all-coffee-details-price'>
                            ${obj.price}
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className='get-all-coffee-page-wrapper'>
            <div className='get-all-coffee-header'>
                <div className='get-all-coffee-header-link'>
                    <span><NavLink className='get-all-coffee-header-link-nav' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee'>Coffee</NavLink></span> <img width='10' height='10' src={arrow} /> {title}
                </div>
                <div className='get-all-coffee-all-coffee'>
                    {title}
                </div>
                <div className='get-all-coffee-subheader'>
                    {subtitle}
                </div>
            </div>
            <div className='all-coffee-container'>
                {allCoffee}
            </div>
        </div>
    )
}