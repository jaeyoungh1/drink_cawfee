import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCart, deleteOneCart, editOneCart } from "../../store/cart";
import { CartModal } from '../../context/Modal';
import './cart.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import cart from '../../icons/cart.svg'

export default function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const carts = useSelector(state => state.cart.allCart)
    const [showModal, setShowModal] = useState(false);
    const [newQuantity, setNewQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);
    const [cartId, setCartId] = useState(false);

    useEffect(() => {
        dispatch(loadAllCart())
    }, [dispatch])

    async function updateCart(cartId) {
        let newCart = {
            quantity: newQuantity
        }
        await dispatch (editOneCart(cartId,newCart))
    }


    async function deleteCart(id) {
        await dispatch(deleteOneCart(id))
        await dispatch(loadAllCart())
    }
    const checkout = async () => {
        setShowModal(false)
        return history.push('/checkout')
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
                                            setShowUpdate(!showUpdate)}}>
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



    return (
        <>
            <div className='profile-button' onClick={() => setShowModal(true)}>
                <span className='swiper-no-swiping'>
                    <img alt='profile' src={cart} />
                    <span>
                        Cart
                    </span>
                </span>
            </div>
            {showModal && (
                <CartModal id='cart-container' onClose={() => setShowModal(false)}>
                    <div>
                        <img onClick={() => setShowModal(false)} alt='x' src={x} />
                    </div>
                    <div className='cart-container'>
                        <div className='coffee-all-user-cart-container'>
                            <div className='get-all-coffee-all-coffee'>
                                My Cart
                            </div>
                            {allCart}
                        </div>

                        {user && Object.values(carts).length >0 && <div className='cart-total'>
                            <div>Total</div>
                            <div>{priceFormatter(total)}</div>
                        </div>}
                        {user && Object.values(carts).length>0 &&  <div className='cart-checkout'
                        onClick={() => checkout()}
                        >
                            CHECKOUT
                        </div>}
                    </div>
                </CartModal>)
            }
        </>
    )
}