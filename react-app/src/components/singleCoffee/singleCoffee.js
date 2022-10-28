import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneCoffee } from "../../store/coffee";
import arrow from '../../icons/whitearrow.svg'
import './singleCoffee.css'
import { loadAllReview } from "../../store/review";
import CoffeeReviews from "../coffeeReviews/CoffeeReviews";

export default function SingleCoffee() {
    const dispatch = useDispatch()
    const { coffeeId } = useParams()

    const coffee = useSelector(state => state.coffee.singleCoffee)
    const reviews = useSelector(state => state.review.allReview)

    
    useEffect(() => {
        dispatch(getOneCoffee(coffeeId))
        dispatch(loadAllReview(coffeeId))
    }, [dispatch])
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
            schedule = arr.map(obj=> obj.day)
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
    <div className='single-coffee-page-wrapper'>
        {/* <img className='single-coffee-page-bg-img' alt='coffeeshop' src="https://images.ctfassets.net/o88ugk6hewlf/7j8fz2gBeperXhNAUxodex/a87ef2b8cccbc19a235ac7b7c69ddbb7/Cuvee_Coffee.jpeg?q=75&fm=webp&w=1000"/> */}
        <div className='single-coffee-header-link'>
            <span><NavLink className='single-coffee-header-link-nav'
                style={{ textDecoration: 'none' }}
                to='/cawfee'>Coffee</NavLink></span>
            <img alt='arrow' width='10' color='white' height='10' src={arrow} />
            {brand && brand.name}
            <img alt='arrow' width='10' height='10' src={arrow} />
            {coffee.name}
        </div>
        <div className='gradient'></div>
        <div className='single-coffee-wrapper'>
            <div className='single-coffee-single-img'>
                <img className='single-coffee-img' alt='coffee' src={coffee.img_url} />
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
                <div className='single-coffee-details-notes'>
                    {notes}
                </div>
                <div className='single-coffee-details-description'>
                    {coffee.description}
                </div>
                <div className='single-coffee-details-purchase-container'>
                    <div className='single-coffee-details-purchase'>
                        One Time Purchase
                    </div>
                    <div className='single-coffee-details-price'>
                        {priceFormatter(coffee.price)}/bag
                    </div>
                    {/* <div>
                            <div>Bag Size</div>
                            <div>Quantity</div>
                            <div>12 oz.</div>
                            <div>1</div>
                        </div> */}
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
                <img src={brand && brand.brand_img}/>
            </div>
            <div className='single-coffee-brand-details-body-wrapper'>
                <div className='single-coffee-more-details-title'>About the Roaster</div>
                <div>
                    <div className='single-coffee-brand-details-title'>Location</div>
                    <div className='single-coffee-details-description'>{brand && brand.city}, {brand && brand.city}</div>
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
    </div>
)
}