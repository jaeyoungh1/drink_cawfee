import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAllCoffee, searchAllCoffee } from "../../store/coffee";
import arrow from '../../icons/arrow.svg'
import './allCoffee.css'
import brokenImg from '../../icons/broken-img.png'
import Filter from "./Filter";

export default function AllCoffee() {
    const dispatch = useDispatch()
    let search = useLocation().search
    let roast = new URLSearchParams(search).get('roast')
    let origin = new URLSearchParams(search).get('origin')

    const [filter, setFilter] = useState([])

    const coffees = useSelector(state => state.coffee.allCoffee)

    useEffect(() => {
        if (origin === 'singleOrigin') {
            dispatch(loadAllCoffee('origin', origin))
        } else if (origin) {
            dispatch(loadAllCoffee('origin', origin))
        } else if (roast) {
            dispatch(loadAllCoffee('roast', roast))
        } else {
            dispatch(loadAllCoffee())
        }
    }, [dispatch, roast, origin])
    useEffect(() => {
        dispatch(searchAllCoffee(search, filter))
    }, [dispatch, filter])

    function getFilterArr(obj) {
        setFilter(obj)
    }

    let title
    let subtitle
    if (origin === 'singleOrigin') {
        title = 'Single Origin'
        subtitle = 'Savor these clear, authentic expressions of unique regions around the world.'
    }
    else if (origin === 'Various (blend)') {
        title = 'Blends'
        subtitle = 'Balanced, smooth and always consistent for everyday enjoyment.'
    } else if (origin === 'Brazil') {
        title = 'Brazil'
        subtitle = 'Balanced, smooth and always consistent for everyday enjoyment.'
    } else if (roast === 'light') {
        title = 'Light Roast'
        subtitle = 'Taste the coffee, not the roast, with these curations that highlight the variety of flavors inherent to the coffee bean.'
    } else if (roast === 'medium') {
        title = 'Medium Roast'
        subtitle = 'Comforting flavors like chocolate and caramel round out these curations. It\'ll remind you why you love coffee every morning.'
    } else if (roast === 'dark') {
        title = 'Dark Roast'
        subtitle = 'The roasters we partner with take high quality coffees to make full-bodied dark roasts with familiar and intense smoky flavors.'
    } else {
        title = 'All Coffee'
        subtitle = 'Choose from a wide variety of coffee from the top roasters in California. All coffee is roasted to order and shipped fresh to your door.'
    }

    let allCoffee
    if (coffees) {
        let coffeeArr = Object.values(coffees)
        if (coffeeArr.length < 1) {
            allCoffee = (
                <div className='no-coffee-container'>
                    No such coffees currently available.
                </div>
            )
        } else {
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
            <div className='get-all-coffee-page-body'>
                <Filter getFilterArr={getFilterArr} />
                <div className='all-coffee-container'>
                    {allCoffee}
                </div>
            </div>
        </div>
    )
}