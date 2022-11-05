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
            console.log("ORDERARR", orderArr)
            let orderSet = new Set(orderArr?.map(obj => obj.order_number))
            console.log("ORDERSET", orderSet)
            let uniqueArr = []
            orderSet?.forEach(str => {
                uniqueArr.push(orderArr?.filter(obj => obj.order_number === str))
            })
            console.log("UNIQUEARR", uniqueArr)



            allOrder = uniqueArr.map(arr => {
                return (
                    <div key={arr.id} className='order-wrapper'>
                        <div className='order-number'>ORDER #{arr[0]?.order_number}</div>
                        <div className='order-coffee-info-name'>Placed {arr[0]?.created_at}</div>

                        {arr.map(obj => {
                            let coffee = obj.Coffee


                            return (
                                <>
                                    <div key={obj.id} className='order-div'>
                                        <div className='order-coffee-image'>
                                            <img className='user-review-coffee-image' alt='coffee image' src={coffee.img_url} onError={e => e.target.src = noImg} />
                                        </div>

                                        <div className='order-item-info'>
                                            <div className='order-item-name-quantity'>
                                                <div className="order-coffee-info-brand-name">
                                                    {obj.Brand?.name.toUpperCase()}
                                                </div>
                                                <div className="order-coffee-info-name">
                                                    {coffee.name}
                                                </div>
                                                <div className='cart-item-size'>
                                                    Whole Bean | 12 oz.
                                                </div>
                                            </div>
                                            <div>
                                                <div className='order-item-price'>{priceFormatter(coffee.price)}</div>
                                                <div className='order-item-price'>Qty. {obj.quantity}</div>
                                                <div className='order-item-actions'>

                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    <div className='cart-line-break'></div>
                                </>
                            )
                        })}
                    </div>

                )
            })

        }
    }




    return (
        <>
            <div className='order-container'>
                <div className='get-all-coffee-all-coffee'>
                    My Orders
                </div>
                {allOrder}
            </div>
        </>
    )
}