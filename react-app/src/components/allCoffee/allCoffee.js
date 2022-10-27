import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCoffee } from "../../store/coffee";
import arrow from '../../icons/arrow.svg'
import './allCoffee.css'

export default function AllCoffee() {
    const dispatch = useDispatch()

    const coffees = useSelector(state => state.coffee.allCoffee)

    useEffect(() => {
        dispatch(loadAllCoffee())
    }, [dispatch])

    let allCoffee
    if (coffees) {
        let coffeeArr = Object.values(coffees)
        console.log("COFFEE ARR", coffeeArr)
        allCoffee = coffeeArr.map(obj => {
            return (
                <div className='all-coffee-single-container' key={obj.id}>
                    <div className="single-coffee-image-wrapper">
                        <img src={"https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1040_3.jpg"} />
                    </div>
  
                    <div className='all-coffee-line-break'></div>
                    <div className='all-coffee-details'>
                        <div className='all-coffee-details-brand'>
                            {obj.Brand.name.toUpperCase()}
                        </div>
                        <div className='all-coffee-details-name'>
                            {obj.name}
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
                    <span><NavLink className='get-all-coffee-header-link-nav' style={{ textDecoration: 'none', color:'black' }} to='/cawfee'>Coffee</NavLink></span> <img width='10' height='10' src={arrow}/> All Coffee
                </div>
                <div className='get-all-coffee-all-coffee'>
                    All Coffee
                </div>
                <div className='get-all-coffee-subheader'>
                    Choose from a wide variety of coffee from the top roasters in California. All coffee is 
                    roasted to order and shipped fresh to your door.
                </div>
            </div>
            <div className='all-coffee-container'>
                {allCoffee}
            </div>
        </div>
    )
}