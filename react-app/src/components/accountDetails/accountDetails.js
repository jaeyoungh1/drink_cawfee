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

export default function AccountDetails() {
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

            cartArr.forEach(item => {
                deleteCart(item.id)
            })

            return history.push('/my-orders')

        }

    }

    console.log('state', state, 'city', city)

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

    console.log(errors)
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


    if (!user) {
        return history.push('/')
    }
    else {



        return (
            <div className='account-container'>
                <div>
                    <div className='get-all-coffee-all-coffee'>
                        Account
                        <div className='checkout-line-break'></div>
                    </div>
                    <div>
                        <div className='checkout-title'>Details</div>
                        <div className='checkout-line-break'></div>
                        <div className='checkout-title'>Orders</div>
                        <div className='checkout-line-break'></div>
                        <div className='checkout-title'>Preferences</div>
                        <div className='checkout-line-break'></div>
                    </div>
                </div>

                <Details />



            </div>
        )
    }
}