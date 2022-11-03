import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCart, deleteOneCart } from "../../store/cart";
import { Modal } from '../../context/Modal';
import './cart.css'
import noImg from '../../icons/no_image.svg'
import cart from '../../icons/cart.svg'

export default function Cart() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const carts = useSelector(state => state.cart.allCart)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(loadAllCart())
    }, [dispatch])


    async function deleteCart(id) {
        await dispatch(deleteOneCart(id))
        // await dispatch(loadAllCart())
    }

    console.log("ALLCART", carts)


    const checkout = async (e) => {
        e.preventDefault();

        // cart.forEach(item => {
        //     deleteCart(item.id)
        // })

        try {

        } catch (res) {
            console.log(res)
        }

    }


    let allCart
    if (!user) {
        allCart = (
            <div className='empty-page'>
                Login to begin shopping.
            </div>

        )
    }
    if (carts) {
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
                let brand
                let id
                if (coffee) {
                    brand = coffee.Brand
                    id = coffee.id
                }
                if (coffee) {

                    return (
                        <div className='user-carts-wrapper'>

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
                <Modal id='cart-container' onClose={() => setShowModal(false)}>
                    <div className='cart-container'>
                        <div className='coffee-all-user-cart-container'>
                            <div className='user-cart-container'>
                                <div className='get-all-coffee-all-coffee'>
                                    My Cart
                                </div>
                                <div className='get-all-coffee-subheader'>
                                    Coffees in your cart
                                </div>

                            </div>
                            {allCart}
                        </div>

                        <div >
                            <div className='new-cart-form-wrapper'>
                                <div id='close-modal'>
                                </div>
                                <div className='edit-cart-page-wrapper-title'>Edit Cart</div>


                            </div>

                        </div>


                    </div>
                </Modal>)}
        </>
    )
}