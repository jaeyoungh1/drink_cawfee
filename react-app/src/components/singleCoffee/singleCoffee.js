import { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneCoffee } from "../../store/coffee";
import arrow from '../../icons/whitearrow.svg'
import emptyButton from '../../icons/emptyButton.svg'
import filledButton from '../../icons/filledButton.svg'
import minus from '../../icons/minus.svg'
import plus from '../../icons/plus.svg'
// import brokenImg from '../../icons/broken-img.png'
import noImg from '../../icons/no_image.svg'
import './singleCoffee.css'
import { loadAllReview } from "../../store/review";
import { addOneCart, editOneCart, loadAllCart } from "../../store/cart";
import CoffeeReviews from "../coffeeReviews/CoffeeReviews";

export default function SingleCoffee() {
    const dispatch = useDispatch()
    const { coffeeId } = useParams()
    const history = useHistory()

    const coffee = useSelector(state => state.coffee.singleCoffee)
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.allCart)

    const [selected, setSelected] = useState('')
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        dispatch(getOneCoffee(coffeeId))
        if (coffee.id) {
            dispatch(loadAllReview(coffeeId))
        }
        dispatch(loadAllCart())
    }, [dispatch])

    let cartedCoffee
    let cartArr
    if (cart) {
        cartArr = Object.values(cart)
        if (cartArr.length > 1) {

            cartedCoffee = cartArr.map(obj => obj.coffee_id)
        }
    }


    const submitToCart = async () => {
        if (quantity < 1) {
            return;
        }
        console.log("CURRENT CARTED COFFEE", cartedCoffee, +coffeeId)
        console.log("DOES THE CART INCLUDE CURRENT COFFEE",cartedCoffee?.includes(+coffeeId))
        if (cartedCoffee && cartedCoffee.includes(+coffeeId)) {
            let currentCart = cartArr.filter(obj => +obj.coffee_id === +coffeeId)
            let cartId = currentCart[0]?.id
            let currQuan = currentCart[0]?.quantity
            let nq = +currQuan + +quantity
            const editCart = {
                quantity: nq
            }
            await dispatch(editOneCart(+cartId, editCart))
            await dispatch(loadAllCart())
            setAdded(true)

            setTimeout(() => {
                setAdded(false)
            }, 2000)
        } else {
            const newCart = {
                user_id: user.id,
                coffee_id: coffeeId,
                quantity
            }
            try {
                let cartItem = await dispatch(addOneCart(+coffeeId, newCart))
                await dispatch(loadAllCart())
                setAdded(true)

                setTimeout(() => {
                    setAdded(false)
                }, 2000)
                return
            } catch (res) {
                console.log(res)
            }

        }
    }


    let brand
    if (coffee.Brand) {
        brand = coffee.Brand
    }

    if (!coffee) {
        return (
            <div>
                No Such Coffee!
            </div>
        )
    }

    let notes
    if (coffee.notes) {
        let notesArr = coffee.notes.map(obj => obj.note)
        notes = notesArr[0] + ' · ' + notesArr[1] + ' · ' + notesArr[2]
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

    function roastFormatter(str) {
        if (str) {
            if (str.toLowerCase() === 'light') {
                return 'https://www.drinktrade.com/img/icons/pdp/coffee_roast_level_2.svg'
            }
            else if (str.toLowerCase() === 'medium') {
                return 'https://www.drinktrade.com/img/icons/pdp/coffee_roast_level_5.svg'
            }
            else if (str.toLowerCase() === 'dark') {
                return 'https://www.drinktrade.com/img/icons/pdp/coffee_roast_level_9.svg'
            }
        }
    }

    function roastSchedule(arr) {
        if (arr) {
            schedule = arr.map(obj => obj.day)
            let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            let currentDay = new Date().getDay()
            for (let i = currentDay; i < 7; i++) {

            }
        }
    }


    let schedule
    if (coffee.days) {
        schedule = coffee.days.map(obj => obj.day)
    }
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let daysEle

    if (schedule) {

        daysEle = days.map(str => {

            return (
                <div key={str} className={schedule.includes(str) ? 'filled-day' : 'not-filled-day'} > {str.slice(0, 3)} </div>
            )
        })
    }





    return (
        <>
            {!coffee.id && <div className='empty-page'>
                Page Not Found! <NavLink className='ruhroh-page' to='/'>Return back to safe waters.</NavLink>
            </div>}
            {coffee.id && <div className='single-coffee-page-wrapper'>
                {/* <img className='single-coffee-page-bg-img' alt='coffeeshop' src="https://images.ctfassets.net/o88ugk6hewlf/7j8fz2gBeperXhNAUxodex/a87ef2b8cccbc19a235ac7b7c69ddbb7/Cuvee_Coffee.jpeg?q=75&fm=webp&w=1000"/> */}
                <div className='single-coffee-header-link'>
                    <span>
                        <NavLink className='single-coffee-header-link-nav'
                            style={{ textDecoration: 'none' }}
                            to='/cawfee'>Coffee
                        </NavLink>
                    </span>
                    <img alt='arrow' width='10' color='white' height='10' src={arrow} />
                    <NavLink className='single-coffee-header-link-nav'
                        style={{ textDecoration: 'none', fontWeight: '400' }}
                        to='/roasters'>
                        {brand && brand.name}
                    </NavLink>
                    <img alt='arrow' width='10' height='10' src={arrow} />
                    {coffee.name}
                </div>
                <div className='gradient'></div>
                <div className='single-coffee-wrapper'>
                    <div className='single-coffee-single-img'>
                        <img className='single-coffee-img' alt='coffee' src={coffee.img_url}
                            onError={e => e.target.src = noImg} />
                        <div className='bottom-gradient'></div>
                    </div>
                    <div className='single-coffee-single-details'>
                        <div className='single-coffee-details-brand'>
                            {brand && brand.name}
                            <span>{brand && brand.city}, {brand && brand.state}</span>
                        </div>
                        <div className='single-coffee-details-name'>
                            {coffee.name && coffee.name.toUpperCase()}
                        </div>
                        <div className='single-coffee-details-description'>
                            {coffee.origin}
                        </div>
                        <div className='single-coffee-details-notes'>
                            {notes}
                        </div>
                        <div className='single-coffee-details-description'>
                            {coffee.description}
                        </div>


                        {/* CART FORM ---------------------------------------------- */}

                        <div className='single-coffee-details-purchase-container'>

                            <div className='single-coffee-purchase-top'
                                onClick={() => setSelected('single')}>

                                <div className='single-coffee-purchase-title'>

                                    <div className='single-coffee-purchase-button'>
                                        <img alt='button' height='24' width='24' src={selected === 'single' ? filledButton : emptyButton} />
                                    </div>

                                    <div className='single-coffee-details-purchase'>
                                        One Time Purchase
                                    </div>
                                </div>
                                <div className='single-coffee-details-price'>
                                    {priceFormatter(coffee.price)}/bag

                                </div>

                            </div>
                            {selected === 'single' &&
                                <div className='single-coffee-details-purchase-selected'>
                                    <div className='single-coffee-purchase-title'>Bag Size</div>
                                    <div className='single-coffee-purchase-title'>Quantity</div>

                                    <div className='single-coffee-purchase-toggle'>
                                        <div className='single-coffee-purchase-quantity'>
                                            12 oz.
                                        </div>
                                    </div>

                                    <div className='single-coffee-purchase'>
                                        <div className='single-coffee-purchase-toggle'>
                                            <div className='single-coffee-purchase-toggle-buttons'
                                                onClick={() => {
                                                    if (quantity > 1) {
                                                        setQuantity(quantity - 1)
                                                    }
                                                }}>
                                                <img height='12' width='12' alt='reduce quantity' src={minus} />
                                            </div>
                                            <div className='single-coffee-purchase-quantity'>
                                                {quantity}
                                            </div>
                                            <div className='single-coffee-purchase-toggle-buttons'
                                                onClick={() => {
                                                    if (quantity < 99) {
                                                        setQuantity(quantity + 1)
                                                    }
                                                }}>
                                                <img height='12' width='12' alt='increase quantity' src={plus} />
                                            </div>
                                        </div>
                                    </div>
                                    {user ? <div id='login-button' className='add-to-cart'
                                        onClick={() => submitToCart()}>
                                        {added ? "ADDED TO CART!" : "ADD TO CART"}
                                    </div>
                                        :
                                        <div className='please-login-to-shop'> Please log in to add to cart </div>
                                    }
                                </div>

                            }
                        </div>


                    </div>
                </div>

                <div className='single-coffee-more-details'>
                    <div className='single-coffee-more-details-padding'>
                    </div>
                    <div className='single-coffee-more-details-roast'>
                        <div className='single-coffee-more-details-roast-card'>
                            <img alt='coffee roaster' src="https://www.drinktrade.com/img/icons/pdp/coffee_machine.svg" />
                            <div className='single-coffee-more-details-title'>Roasting Schedule</div>
                            {/* <div> Next roast is </div> */}
                            <div> {daysEle} </div>
                        </div>
                        <div className='single-coffee-more-details-roast-card'>
                            <img alt='roastlevel' src={roastFormatter(coffee.roast)} />
                            <div className='single-coffee-more-details-title'>{coffee.roast && coffee.roast[0].toUpperCase() + coffee.roast.slice(1)} Roast</div>
                            <div> Roast Level</div>
                        </div>
                        <div className='single-coffee-more-details-roast-card'>
                            <img src="https://www.drinktrade.com/img/icons/pdp/coffee_cup.svg" />
                            <div className='single-coffee-more-details-title' >Tasting Notes</div>
                            <div className='single-coffee-more-details-body'>{notes}</div>
                        </div>
                    </div>

                </div>

                <div className='single-coffee-brand-details'>
                    <div className='single-coffee-brand-details-image-wrapper'>
                        <img src={brand && brand.brand_img} />
                    </div>
                    <div className='single-coffee-brand-details-body-wrapper'>
                        <div className='single-coffee-more-details-title'>About the Roaster</div>
                        <div>
                            <div className='single-coffee-brand-details-title'>Location</div>
                            <div className='single-coffee-details-description'>{brand && brand.city}, {brand && brand.state}</div>
                        </div>
                        <div>
                            <div className='single-coffee-brand-details-title'>
                                About {brand && brand.name}
                            </div>
                            <div className='single-coffee-details-description'>
                                {brand && brand.brand_story}
                            </div>
                        </div>
                    </div>
                </div>
                <CoffeeReviews coffeeId={coffeeId} />
            </div>}
        </>
    )
}