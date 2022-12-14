import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrder, deleteOneOrder, editOneOrder } from "../../store/order";
import { editOneCoffeeInventory } from "../../store/coffee";

import './accountDetails.css'
import noImg from '../../icons/no_image.svg'
import x from '../../icons/x.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import Cart from "../cart/cart";
import EditOrder from "../cart/editOrder";

export default function Orders() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.order.allOrder)
    const [newQuantity, setNewQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [showUpdate, setShowUpdate] = useState([]);
    const [showIndUpdate, setShowIndUpdate] = useState('');


    useEffect(() => {
        dispatch(loadAllOrder())
    }, [dispatch])

    async function updateOrder(orderId) {
        let newOrder = {
            quantity: newQuantity
        }
        await dispatch(editOneOrder(orderId, newOrder))
    }

    async function deleteOrder(arr) {
        for (let i = 0; i < arr.length; i++) {
            await dispatch(editOneCoffeeInventory(arr[i].id, "plus", arr[i].quantity))
            await dispatch(deleteOneOrder(arr[i].id))

        }
        await dispatch(loadAllOrder())
    }

    function orderNumberGen(date, ord) {
        let res = date?.slice(5, 7) + date?.slice(8, 10) + date?.slice(0, 4) + ord?.slice(0, 3)
        return res
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
    function dateFormatter(date) {
        let res = `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
        return res
    }
    function dateCalculator(str) {
        let difference = (new Date() - new Date(str)) / (1000 * 60)
        if (difference > 30) {
            return false
        }
        else return true
    }
    function totalCalculator(arr) {
        let total = 0
        if (arr.length) {
            arr.forEach(obj => {
                total += +obj.quantity * +obj.Coffee?.price
            })
        }
        return total
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
            let orderArr = Object.values(orders).reverse()
            // console.log("ORDERARR", orderArr)
            let orderSet = new Set(orderArr?.map(obj => obj.order_number))
            // console.log("ORDERSET", orderSet)
            let uniqueArr = []
            orderSet?.forEach(str => {
                uniqueArr.push(orderArr?.filter(obj => obj.order_number === str))
            })
            // console.log("UNIQUEARR", uniqueArr)



            allOrder = uniqueArr.map(arr => {
                let total = totalCalculator(arr)
                return (
                    <div key={arr.id} className='order-wrapper'>
                        <div className='order-top'>
                            <div className='order-number'>ORDER #{orderNumberGen(arr[0]?.created_at, arr[0]?.order_number)}</div>
                            <div>{priceFormatter(total)}</div>
                        </div>
                        <div className='order-coffee-info-name order-date'>Placed {dateFormatter(arr[0]?.created_at)}</div>

                        {arr.map(obj => {
                            let coffee = obj.Coffee
                            let quantity = obj.quantity


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
                                            <div className='order-item-information'>
                                                <div className='order-item-price'>{priceFormatter(coffee.price)}</div>
                                                <div className='order-item-price'>Qty. {obj.quantity}</div>
                                                <div className='order-item-actions'>
                                                    {showUpdate.includes(obj.id) && <span
                                                        className='update-order-quantity'
                                                        onClick={() => {
                                                            if (dateCalculator(obj.created_at)) {
                                                                setNewQuantity(quantity)
                                                                setShowIndUpdate(obj.id)
                                                            }
                                                        }}>Update Quantity</span>}
                                                    {showIndUpdate === obj.id && <span

                                                    >
                                                        <div className="cart-quantity-toggle">
                                                            <img alt='change' height='12' width='12' src={minus}
                                                                onClick={() => {
                                                                    if (newQuantity > 1) {
                                                                        let nq = newQuantity - 1
                                                                        setNewQuantity(nq)
                                                                    }
                                                                }} />


                                                            <span className='cart-quantity-adjust'>{newQuantity}</span>
                                                            <img alt='change' height='12' width='12' src={plus}
                                                                onClick={() => {
                                                                    if (newQuantity < +coffee.inventory) {
                                                                        let nq = newQuantity + 1
                                                                        setNewQuantity(nq)
                                                                    }
                                                                }} />
                                                        </div>

                                                        <div className='cart-quantity-adjust-confirm'
                                                            onClick={() => {
                                                                updateOrder(obj.id)
                                                                setShowIndUpdate('')
                                                                setShowUpdate([])
                                                            }}>
                                                            Confirm</div>
                                                    </span>}

                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    <div className='cart-line-break'></div>
                                </>
                            )
                        })}
                        <div className='order-status'>
                            {dateCalculator(arr[arr.length - 1].created_at) &&
                                <div className='shipped'
                                    onClick={() => setShowUpdate([...arr.map(obj => obj.id)])}>Edit Order</div>}
                            {dateCalculator(arr[arr.length - 1].created_at) ?
                                <div className='shipped canceled' onClick={() => deleteOrder(arr)}>
                                    Cancel Order</div> : <div className='shipped-order-div'>
                                    <div className='shipped ordershipping'>Order Shipped</div>
                                    <div className='shipped-order'>Order can not be changed after it has shipped</div>
                                </div>}
                        </div>
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