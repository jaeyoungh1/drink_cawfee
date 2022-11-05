import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCart, deleteOneCart, editOneCart } from "../../store/cart";
import './cart.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import cart from '../../icons/cart.svg'
import { update } from "../../store/session";
import { addOneOrder, loadAllOrder } from "../../store/order";

export default function Checkout() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const carts = useSelector(state => state.cart.allCart)

    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [errors, setErrors] = useState('');
    const [onSubmit, setOnSubmit] = useState('');
    const STATES =
        ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

    // const [userAddress, setUserAddress] = useState('');

    const [newQuantity, setNewQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);
    // const [cartId, setCartId] = useState(false);

    useEffect(() => {
        dispatch(loadAllCart())
    }, [dispatch])

    async function updateCart(cartId) {
        let newCart = {
            quantity: newQuantity
        }
        await dispatch(editOneCart(cartId, newCart))
    }


    async function deleteCart(id) {
        await dispatch(deleteOneCart(id))
        await dispatch(loadAllCart())
    }

    const checkout = async () => {
        if (carts) {
            let cartArr = Object.values(carts)

            console.log("cartArr", cartArr)

            let order_number = Math.random().toString(36).substring(2, 15)

            for (let i = 0; i < cartArr.length; i++) {
                let added = await dispatch(addOneOrder(cartArr[i].id, order_number))
                // deleteCart(cartArr[i].id)
            }
            // await dispatch(loadAllOrder())

            // return history.push('/account')

        }

    }

    // console.log('state', state, 'city', city)

    useEffect(() => {

        const errors = [];
        if (address.trim().length < 2) {
            errors.push("Please include Address");
        }
        if (address.trim().length > 200) {
            errors.push("Please include valid Address");
        }
        if (zipcode.trim().length !== 5 || isNaN(zipcode)) {
            errors.push("Please include valid Zipcode");
        }
        if (state.trim().length < 2) {
            errors.push("Please include State");
        }
        if (city.trim().length < 2) {
            errors.push("Please include City");
        }

        setErrors(errors);
    }, [address, city, state, zipcode, onSubmit]);

    // console.log(errors)
    const submitUserAddress = async (e) => {
        e.preventDefault();
        setOnSubmit(true)
        if (errors.length > 0) {
            return;
        } else {


            // const newAddress = {
            //     shipping_address: address,
            //     zipcode,
            //     city,
            //     state
            // }
            console.log("CHECKOUT NEW ADDRESS", address,
                zipcode,
                city,
                state)

            try {
                // include edit user route <<<<<<<<<<<<<<<<<
                await dispatch(update(address,
                    zipcode,
                    city,
                    state))
                // const createdCoffee = await dispatch(addOneCoffee(newCoffee))
                // // console.log("COMPONENT CREATED COFFEE", newCoffee)
                setErrors([])
                // history.replace(`/cawfee/${createdCoffee.id}`)
            } catch (res) {
                console.log(res)
            }
        }

    }

    function priceFormatter(num) {
        if (num) {

            let res
            if (num.toString().includes('.')) {
                res = `$${num}`
            }
            else res = `$${num}.00`
            return res
        }
    }

    useEffect(() => {
        let total = 0
        if (carts) {
            let cartArr = Object.values(carts)

            if (cartArr.length > 0) {

                cartArr.forEach(obj => {
                    total += obj.Coffee.price * obj.quantity
                    setTotal(total)
                })
            }

        }
    }, [carts])


    let allCart
    if (!user) {
        allCart = (
            <div className='empty-page'>
                Login to begin shopping.
            </div>

        )
    }
    else if (carts) {
        if (Object.values(carts).length < 1) {
            allCart = (
                <div className='empty-page'>
                    Your cart is currently empty.
                </div>

            )
        } else {
            let cartArr = Object.values(carts)
            console.log(Object.values(carts))

            allCart = cartArr.map(obj => {
                let coffee = obj.Coffee
                let quantity = obj.quantity
                let price
                if (coffee) {
                    price = coffee.price

                    return (
                        <div key={obj.id} className='cart-item-wrapper'>
                            <div className='cart-coffee-image'>
                                <img className='user-review-coffee-image' alt='coffee image' src={coffee.img_url} onError={e => e.target.src = noImg} />
                            </div>

                            <div className='cart-item-info'>
                                <div className='cart-item-name-quantity'>
                                    <div className="cart-coffee-info-name">
                                        {quantity}x <span>{coffee.name}</span>
                                    </div>
                                    <div className='cart-item-price' >{priceFormatter(price * quantity)}</div>
                                </div>
                                <div className='cart-item-size'>
                                    Whole Bean | 12 oz.
                                </div>
                                <div className='cart-item-actions'>
                                    <span onClick={() => deleteCart(obj.id)}>
                                        Remove
                                    </span>

                                    {showUpdate !== obj.id && <span onClick={() => {
                                        setNewQuantity(quantity)
                                        setShowUpdate(obj.id)
                                    }}>Update Quantity</span>}
                                    {showUpdate === obj.id && <span

                                    >
                                        <div className="cart-quantity-toggle">

                                            <img alt='change' height='12' width='12' src={plus}
                                                onClick={() => {
                                                    if (newQuantity < +coffee.inventory) {
                                                        let nq = newQuantity + 1
                                                        setNewQuantity(nq)
                                                    }
                                                }} />
                                            <span className='cart-quantity-adjust'>{newQuantity}</span>
                                            <img alt='change' height='12' width='12' src={minus}
                                                onClick={() => {
                                                    if (newQuantity > 1) {
                                                        let nq = newQuantity - 1
                                                        setNewQuantity(nq)
                                                    }
                                                }} />
                                        </div>

                                        <div className='cart-quantity-adjust-confirm'
                                            onClick={() => {
                                                updateCart(obj.id)
                                                setShowUpdate(!showUpdate)
                                            }}>
                                            Confirm</div>
                                    </span>}

                                </div>
                            </div>
                            <div className='cart-line-break'></div>

                        </div >
                    )

                }

            })
        }
    }
    if (!user) {
        return history.push('/')
    }
    else {



        return (
            <div className='checkout-container'>
                <div>

                    <div className='get-all-coffee-all-coffee'>
                        Checkout
                        <div className='checkout-line-break'></div>
                    </div>
                    <div>
                        <div className='checkout-title'>Account</div>
                        <div className='checkout-user-info'>{user.first_name} {user.last_name?.[0]}.</div>
                        <div className='checkout-user-info'>{user.email}</div>
                    </div>
                    <div>


                        {/* shipping --------------- conditional if user already has address */}
                        {!user.shipping_address && <form onSubmit={submitUserAddress}>
                            <div className='checkout-title'>Shipping</div>
                            {onSubmit && errors.length > 0 &&

                                errors.map(err => {
                                    return (<div key={err} className='checkout-errors' >{err}</div>)
                                })


                            }
                            <div className='checkout-wrapper-div'>
                                <div className='coffee-input-label checkout-div'>Address
                                    {/* {onSubmit && (!address || address?.length < 2) && <div className='new-coffee-form-error' >Please include address</div>} */}
                                    {/* {onSubmit && address?.length > 200 && <div className='new-coffee-form-error' >Please include valid address</div>} */}
                                    <input
                                        name='address'
                                        autoComplete="off"
                                        className='checkout-input checkout-address'
                                        type='text'
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                                {/* {onSubmit && (!zipcode || zipcode?.length !== 5 || isNaN(zipcode)) && <div className='new-coffee-form-error' >Please include valid zipcode</div>} */}
                                

                            </div>
                            <div className='checkout-wrapper-div'>
                                <div className='coffee-input-label checkout-div'>Zipcode

                                    <input
                                        name='zipcode'
                                        autoComplete="off"
                                        className='checkout-input checkout-zipcode'
                                        type='text'
                                        value={zipcode}
                                        onChange={e => setZipcode(e.target.value)}
                                    />
                                </div>
                                <div className='coffee-input-label checkout-div'>City
                                    {/* {onSubmit && (!city || city?.length < 2) && <div className='new-coffee-form-error' >Please include city</div>} */}
                                    <input
                                        name='city'
                                        autoComplete="off"
                                        className='checkout-input checkout-city'
                                        type='text'
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                    />
                                </div>
                                <div className='coffee-input-label checkout-div'>State
                                    {/* {onSubmit && (!state || state?.length < 2) && <div className='new-coffee-form-error' >Please include state</div>} */}

                                    <select
                                        name='state'
                                        autoComplete="off"
                                        className='checkout-input checkout-state'
                                        type='text'
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                        >
                                            {STATES.map(state => (
                                                <option value={state} key={state}>{state}</option>
                                            ))}

                                        </select>
                                    
                                </div>
                            </div>
                            <button type='submit' id='login-button'>USE THIS ADDRESS</button>
                        </form>}
                        {user.shipping_address &&
                            <div >
                                <div className='checkout-title'>Shipping</div>
                                <div>
                                    <div className='checkout-user-info'>{user.first_name} {user.last_name}</div>
                                    <div className='checkout-user-info'>{user.shipping_address}</div>
                                    <div className='checkout-user-info'>{user.city}, {user.state}, {user.zipcode}</div>
                                </div>
                            </div>
                        }




                    </div>
                    <div>

                        <div className='checkout-title'>Payment</div>
                        <div>
                            <div className='checkout-user-info checkout-card'>
                                <img alt='card' src="https://www.drinktrade.com/img/icons/CreditCard.svg" />
                                (It's a fake website  ¯\_(ツ)_/¯ )
                            </div>

                        </div>


                    </div>

                </div>

                <div className='cart-container'>
                    <div className='coffee-all-user-cart-container'>
                        <div className='checkout-cart-title'>
                            My Cart
                        </div>

                        {allCart}
                    </div>
                    {user && <div className='cart-total'>
                        <div>Subtotal</div>
                        <div>{priceFormatter(total)}</div>
                    </div>}

                    {user && <div className='cart-total'>
                        <div>Shipping</div>
                        <div>{priceFormatter(5)}</div>
                    </div>}

                    {user && <div className='cart-total'>
                        <div>Total</div>
                        <div>{priceFormatter(total + 5)}</div>
                    </div>}

                    {user && <div className='cart-checkout'
                        onClick={() => checkout()}
                    >
                        PLACE ORDER
                    </div>}
                </div>
                <div className='checkout-color'>
                </div>

            </div>
        )
    }
}