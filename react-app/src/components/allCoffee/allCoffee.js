import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCoffee } from "../../store/coffee";
import './allCoffee.css'

export default function AllCoffee() {
    const dispatch = useDispatch()

    const coffees = useSelector(state => state.coffee.allCoffee)

    useEffect(() => {
        dispatch(loadAllCoffee())
    }, [dispatch])

    let allCoffee
    if (coffees) {
        let coffeeArr = Object.values(coffees)
        console.log("COFFEE ARR", coffeeArr)
        allCoffee = coffeeArr.map(obj => {
            return (
                <div className='all-coffee-single-container' key={obj.id}>
                    <div className="single-coffee-image-wrapper">
                        <img src={"https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1040_3.jpg"} />
                    </div>
  
                    <div className='all-coffee-line-break'></div>
                    <div className='all-coffee-details'>
                        <div className='all-coffee-details-brand'>
                            {obj.Brand.name.toUpperCase()}
                        </div>
                        <div className='all-coffee-details-name'>
                            {obj.name}
                        </div>
                        <div className='all-coffee-details-price'>
                            ${obj.price}
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className='get-all-coffee-page-wrapper'>
            <div className='all-coffee-container'>
                {allCoffee}
            </div>
        </div>
    )
}