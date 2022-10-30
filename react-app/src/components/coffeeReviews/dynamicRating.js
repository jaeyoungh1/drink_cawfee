import { startTransition } from 'react'
import { useState } from 'react'
import emptyStar from '../../icons/empty-star.svg'
import fullStar from '../../icons/filled-star.svg'
import './dynamicRating.css'

export default function DynamicRating({handleRating}) {
    let [starRating, setRating] = useState(0)
    let [hover, setHover] = useState()

        return (
        <div className='dynamic-star-rating-wrapper'>
            {[1, 2, 3, 4, 5].map((star, i) => {
                i++;
                return (
                    <div key={i}
                        className={i <= starRating ? "review-star fill" : "review-star empty"}
                        onClick={() => {
                            setRating(i)
                            handleRating(i)}
                        }
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(starRating)}
                        
                    >
                    {i <= (starRating || hover) ?
                    (<img height='20' width='20' src={fullStar} />) :
                    (<img height='20' width='20' src={emptyStar} />)}
        </div>
    )
})}
        </div >

    )
}