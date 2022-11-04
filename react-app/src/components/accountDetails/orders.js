import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrder, deleteOneOrder, editOneOrder } from "../../store/order";
import './accountDetails.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'

export default function Orders() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.order.allOrder)
    const [newQuantity, setNewQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        dispatch(loadAllOrder())
    }, [dispatch])

    async function updateOrder(orderId) {
        let newOrder = {
            quantity: newQuantity
        }
        await dispatch(editOneOrder(orderId, newOrder))
    }


    async function deleteOrder(id) {
        await dispatch(deleteOneOrder(id))
        await dispatch(loadAllOrder())
    }
    const checkout = async () => {
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
        if (orders) {
            let orderArr = Object.values(orders)

            if (orderArr.length > 0) {

                orderArr.forEach(obj => {
                    total += obj.Coffee.price * obj.quantity
                    setTotal(total)
                })
            }

        }
    }, [orders])


    let allOrder
    if (!user) {
        allOrder = (
            <div className='empty-page'>
                Login to begin shopping.
            </div>

        )
    }
    else if (orders) {
        if (Object.values(orders).length < 1) {
            allOrder = (
                <div className='empty-page'>
                    Your order is currently empty.
                </div>

            )
        } else {
            let orderArr = Object.values(orders)
            console.log(Object.values(orders))

            allOrder = orderArr.map(obj => {
                let coffee = obj.Coffee
                let quantity = obj.quantity
                let price
                if (coffee) {
                    price = coffee.price

                    return (
                        <div key={obj.id} className='order-item-wrapper'>
                            <div className='order-coffee-image'>
                                <img className='user-review-coffee-image' alt='coffee image' src={coffee.img_url} onError={e => e.target.src = noImg} />
                            </div>

                            <div className='order-item-info'>
                                <div className='order-item-name-quantity'>
                                    <div className="order-coffee-info-name">
                                        {quantity}x <span>{coffee.name}</span>
                                    </div>
                                    <div className='order-item-price' >{priceFormatter(price * quantity)}</div>
                                </div>
                                <div className='order-item-size'>
                                    Whole Bean | 12 oz.
                                </div>
                                <div className='order-item-actions'>
                                    <span onClick={() => deleteOrder(obj.id)}>
                                        Remove
                                    </span>

                                    {showUpdate !== obj.id && <span onClick={() => {
                                        setNewQuantity(quantity)
                                        setShowUpdate(obj.id)
                                    }}>Update Quantity</span>}
                                    {showUpdate === obj.id && <span

                                    >
                                        <div className="order-quantity-toggle">

                                            <img alt='change' height='12' width='12' src={plus}
                                                onClick={() => {
                                                    if (newQuantity < +coffee.inventory) {
                                                        let nq = newQuantity + 1
                                                        setNewQuantity(nq)
                                                    }
                                                }} />
                                            <span className='order-quantity-adjust'>{newQuantity}</span>
                                            <img alt='change' height='12' width='12' src={minus}
                                                onClick={() => {
                                                    if (newQuantity > 1) {
                                                        let nq = newQuantity - 1
                                                        setNewQuantity(nq)
                                                    }
                                                }} />
                                        </div>

                                        <div className='order-quantity-adjust-confirm'
                                            onClick={() => {
                                                updateOrder(obj.id)
                                                setShowUpdate(!showUpdate)
                                            }}>
                                            Confirm</div>
                                    </span>}

                                </div>
                            </div>
                            <div className='order-line-break'></div>

                        </div >
                    )

                }

            })
        }
    }



    return (
        <>

            <div className='order-container'>
                <div className='coffee-all-user-order-container'>
                    <div className='get-all-coffee-all-coffee'>
                        My Order
                    </div>
                    {allOrder}
                </div>

                {user && Object.values(orders).length > 0 && <div className='order-total'>
                    <div>Total</div>
                    <div>{priceFormatter(total)}</div>
                </div>}
                {user && Object.values(orders).length > 0 && <div className='order-checkout'
                    onClick={() => checkout()}
                >
                    CHECKOUT
                </div>}
            </div>


        </>
    )
}