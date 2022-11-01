import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneCoffee, loadUserCoffee } from "../../store/coffee";
import arrow from '../../icons/arrow.svg'
import './currentCoffee.css'

export default function CurrentCoffee() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const coffees = useSelector(state => state.coffee.allCoffee)

    useEffect(() => {
        dispatch(loadUserCoffee(user.id))
    }, [dispatch, coffees.length])

    async function deleteCoffee(id) {
        await dispatch(deleteOneCoffee(id))
        dispatch(loadUserCoffee(user.id))
    }

    let allCoffee
    if (coffees) {
        let coffeeArr = Object.values(coffees)
        allCoffee = coffeeArr.map(obj => {
            return (
                <div className='user-coffee-container' key={obj.id}>
                    <div className='user-coffee-single-container'>
                        <NavLink to={`/cawfee/${obj.id}`}>
                            <div className="user-coffee-image-wrapper">
                                <img alt='coffee bag' className="single-coffee-image-wrapper-img" src={obj.img_url} />
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
                    <div className='user-coffee-details-container'>
                        <div className='user-coffee-details'>Current Inventory: {obj.inventory}</div>
                        <div className='user-coffee-details-container'>
                            <div ><NavLink className='user-coffee-details user-coffee-navlink' to={`/cawfee/edit/${obj.id}`}>Edit Coffee</NavLink></div>
                            <div onClick={() => deleteCoffee(obj.id)} className='user-coffee-details user-coffee-navlink' >Remove Curation</div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    if (!user || !user.curator) {
        return <Redirect to='/' />
    }


    return (
        <div className='get-all-coffee-page-wrapper'>
            <div className='get-all-coffee-header'>
                <div className='get-all-coffee-all-coffee'>
                    Your Coffee Curations
                </div>
                <div className='get-all-coffee-subheader'>
                    A collection of the coffees that you have curated and are currently available for purchase
                    on Drink Cawfee. The early bird gets the brew!
                </div>
            </div>
            <div className='all-coffee-container'>
                {allCoffee}
            </div>
        </div>
    )
}