import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
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

    const [tab, setTab] = useState('orders')

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
                            setTab('details')
                            // history.replace('/account/details') <<<<<< NTS: create helper function to change url and conditional based on url
                         }}
                        className={tab === 'details' ? 'checkout-title tab-selected' : 'checkout-title'}>
                        Details</div>
                    <div className='checkout-line-break'></div>
                    <div
                        onClick={() => setTab('orders')}
                        className={tab === 'orders' ? 'checkout-title tab-selected' : 'checkout-title'}>
                        Order History</div>
                    <div
                        className='checkout-line-break'></div>
                    <div 
                        onClick={() => setTab('preference')}
                        className={tab === 'preference' ? 'checkout-title tab-selected' : 'checkout-title'}>
                            Preferences</div>
                    <div className='checkout-line-break'></div>
                </div>
            </div>

            {tab === 'details' && <Details />}
            {tab === 'orders' && <Orders />}
            {tab === 'preference' && <div className='empty-page'>Page Under Construction</div>}



        </div>
    )

}