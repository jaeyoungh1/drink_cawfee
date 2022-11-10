import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCart, deleteOneCart, editOneCart } from "../../store/cart";
import './accountDetails.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
// import cart from '../../icons/cart.svg'
import { update } from "../../store/session";
import Details from "./details";
import Orders from "./orders";

export default function AccountDetails() {
    // const dispatch = useDispatch()
    const history = useHistory()
    const url = useLocation().pathname
    console.log("URL", url)

    function setUrl(str) {
        history.replace(`/account/${str}`)
    }

    const user = useSelector(state => state.session.user)

    if (!user) {
        return history.push('/')
    }

    return (
        <div className='account-container'>
            <div>
                <div className='get-all-coffee-all-coffee'>
                    Account
                    <div className='checkout-line-break'></div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            setUrl('details')
                            // history.replace('/account/details') <<<<<< NTS: create helper function to change url and conditional based on url
                         }}
                        className={url.includes('details') ? 'detail-title tab-selected' : 'detail-title'}>
                        Details</div>
                    <div className='checkout-line-break'></div>
                    <div
                        onClick={() => setUrl('orders')}
                        className={url.includes('orders') ? 'detail-title tab-selected' : 'detail-title'}>
                        Order History</div>
                    <div
                        className='checkout-line-break'></div>
                    <div 
                        onClick={() => setUrl('preference')}
                        className={url.includes('preference') ? 'detail-title tab-selected' : 'detail-title'}>
                            Preferences</div>
                    <div className='checkout-line-break'></div>
                </div>
            </div>

            {url.includes('details') && <Details />}
            {url.includes('orders') && <Orders />}
            {url.includes('preference') && <div className='empty-page'>Page Under Construction</div>}



        </div>
    )

}