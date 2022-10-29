import emptyStar from '../../icons/empty-star.svg'
import fullStar from '../../icons/filled-star.svg'
import './coffeeReviews.css'

export default function ReviewStars({ rating }) {
    let filled = Array.from(Array(rating).keys())
    let empty = Array.from(Array(5 - rating).keys())
    let filledRating
    let emptyRating
    if (filled) {
        filledRating = filled.map(i => {
            return (<span><img className='review-star' src={fullStar} /> </span>)
        })
    }
    if (empty) {
        emptyRating = empty.map(i => {
            return (<span><img className='review-star' src={emptyStar} /> </span>)
        })
    }

    return (
        <div className='get-user-review-page-wrapper'>
            <div className='get-user-review-header'>
                <div className='get-user-review-stars'>
                    {filledRating}{emptyRating}
                </div>
            </div>
            <div className='coffee-review-container'>
            </div>
        </div>
    )
}