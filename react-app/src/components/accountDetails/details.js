import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCart, deleteOneCart, editOneCart } from "../../store/cart";
import './accountDetails.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import cart from '../../icons/cart.svg'
import { update, updateName } from "../../store/session";

export default function Details() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const carts = useSelector(state => state.cart.allCart)
    const [editName, setEditName] = useState(false)
    const [editShipping, setEditShipping] = useState(false)
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
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

            cartArr.forEach(item => {
                deleteCart(item.id)
            })

            return history.push('/my-orders')

        }

    }

    console.log('state', state, 'city', city)

    useEffect(() => {
        if (user.shipping_address) {
            setAddress(user.shipping_address)
        }
        if (user.zipcode) {
            setZipcode(user.zipcode)
        }
        if (user.city) {
            setCity(user.city)
        }
        if (user.state) {
            setState(user.state)
        }
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
    }, [user])

    useEffect(() => {

        const errors = [];
        if (first_name.trim().length < 2 || first_name.trim().length > 25) {
            errors.push("Please include valid First Name.");
        }
        if (last_name.trim().length < 2 || last_name.trim().length > 25) {
            errors.push("Please include valid Last Name.");
        }
        if (email.trim().length > 200 || email.trim().length < 3 || !email.includes('a') || !email.includes('.')) {
            errors.push("Please include valid Email");
        }
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
    }, [first_name, last_name, email, address, city, state, zipcode, onSubmit]);

    console.log("errors", errors)
    const submitUserAddress = async (e) => {
        e.preventDefault();
        setOnSubmit(true)
        if (errors.length > 0) {
            console.log('you got errors!')
            return;
        } else {


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
                setEditShipping(false)
                // history.replace(`/cawfee/${createdCoffee.id}`)
            } catch (res) {
                console.log(res)
            }
        }

    }
    const submitUserInfo = async (e) => {
        e.preventDefault();
        setOnSubmit(true)
        if (errors.length > 0) {
            console.log('you got errors!')
            return;
        } else {


            console.log("CHECKOUT NEW INFO",
                first_name,
                last_name,
                email)

            try {
                // include edit user route <<<<<<<<<<<<<<<<<
                await dispatch(updateName(
                    first_name,
                    last_name,
                    email))

                setErrors([])
                setEditName(false)
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

    if (!user) {
        return history.push('/')
    }
    else {



        return (
            <div className='details-container'>
                <div>
                    <div className='checkout-title'>User Details</div>

                    {!editName &&
                        <>
                            <div className='details-user-info-wrapper'>
                                <div className='details-user-info-div'>

                                    <div className='details-input-label'>FIRST NAME</div>
                                    <div className='details-user-info'>{user.first_name}</div>
                                </div>
                                <div className='details-user-info-div'>
                                    <div className='details-input-label'>LAST NAME</div>
                                    <div className='details-user-info'>{user.last_name}</div>
                                </div>
                                <div className='details-user-info-div'>
                                    <div className='details-input-label'>EMAIL</div>
                                    <div className='details-user-info'>{user.email}</div>
                                </div>
                            </div>
                        </>
                    }
                    {editName && <form onSubmit={submitUserInfo}>
                        <div className='checkout-title'>Details</div>
                        {onSubmit && errors.length > 0 &&

                            errors.map(err => {
                                return (<div key={err} className='checkout-errors' >{err}</div>)
                            })


                        }
                        <div className='checkout-wrapper-div'>
                            <div className='coffee-input-label checkout-div'>FIRST NAME
                                <input
                                    name='first_name'
                                    autoComplete="off"
                                    className='checkout-input checkout-name'
                                    type='text'
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className='coffee-input-label checkout-div'>LAST NAME

                                <input
                                    name='last_name'
                                    autoComplete="off"
                                    className='checkout-input checkout-name'
                                    type='text'
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='checkout-wrapper-div'>
                            <div className='coffee-input-label checkout-div'>EMAIL
                                <input
                                    name='email'
                                    autoComplete="off"
                                    className='checkout-input checkout-address'
                                    type='text'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type='submit' id='login-button'>SAVE</button>
                    </form>}
                    <div className='details-update-button' onClick={() => setEditName(!editName)}>{editName ? "Cancel" : "Update Details"}</div>

                    <div className='details-user-info-div'>
                        <span className='details-input-label'>CAWFEE CURATOR STATUS:</span>
                        <span className='details-user-info'>{user.curator ? " Verified Cawfee Curator" : " Pending"}</span>
                    </div>
                </div>


                <div>
                    {/* shipping --------------- conditional if user already has address */}
                    {(!user.shipping_address || editShipping) && <form onSubmit={submitUserAddress}>
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
                    {user.shipping_address && !editShipping &&
                        <div >
                            <div className='checkout-title'>Shipping Address</div>
                            <div>
                                <div className='checkout-user-info'>{user.first_name} {user.last_name}</div>
                                <div className='checkout-user-info'>{user.shipping_address}</div>
                                <div className='checkout-user-info'>{user.city}, {user.state}, {user.zipcode}</div>
                            </div>
                        </div>
                    }
                    <div className='details-update-button' onClick={() => setEditShipping(!editShipping)}>{editShipping ? "Cancel" : "Change Address"}</div>




                    <div>

                        <div className='checkout-title'>Payment Method</div>
                        <div>
                            <div className='checkout-user-info checkout-card'>
                                <img alt='card' src="https://www.drinktrade.com/img/icons/CreditCard.svg" />
                                (It's a fake website  ¯\_(ツ)_/¯ )
                            </div>

                        </div>


                    </div>
                </div>




            </div>
        )
    }
}