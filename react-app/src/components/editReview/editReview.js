import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllReview, getOneReview, editOneReview, loadUserReview } from "../../store/review";
import brokenImg from '../../icons/broken-img.png'
import x from '../../icons/x.svg'
import './editReview.css'
import { getOneCoffee } from "../../store/coffee";
import emptyStar from '../../icons/empty-star.svg'
import fullStar from '../../icons/filled-star.svg'

import DynamicRating from "../coffeeReviews/dynamicRating";

export default function EditReview() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { reviewId, coffeeId } = useParams()

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState('')
    const [review_body, setReview_body] = useState('')
    const [hover, setHover] = useState()

    const user = useSelector(state => state.session.user)
    const review = useSelector(state => state.review.singleReview)
    const coffee = useSelector(state => state.coffee.singleCoffee)


    let singleReview;
    if (review) {
        singleReview = review.Reviews;
    }

    const handleRating = num => {
        setRating(num)
    }

    useEffect(() => {
        dispatch(getOneReview(reviewId))
        dispatch(getOneCoffee(coffeeId))
    }, [dispatch, reviewId, coffeeId])

    useEffect(() => {
        const errors = [];

        if (rating && (rating < 2 || rating > 5)) {
            errors.push("Rating must be an integer between 1 and 5");
        }

        if (review_body && review_body.length < 2) {
            errors.push("Review must be at least two characters.");
        }

        if (review_body && review_body.length > 500) {
            errors.push("Review can not be more than 500 characters");
        }

        setErrors(errors);
    }, [rating, review_body]);

    useEffect(() => {
        if (singleReview) {
            setRating(singleReview.rating);
            setReview_body(singleReview.review_body);
        }
    }, [singleReview]);

    const submitReview = async (e) => {
        e.preventDefault();
        const newReview = {
            rating,
            user_id: user.id,
            review_body
        }

        try {
            const createdReview = await dispatch(editOneReview(reviewId, newReview))
            setErrors([])
            await dispatch(loadUserReview())
            return history.push(`/cawfee/${coffeeId}`)
        } catch (res) {
            console.log(res)
        }

    }
    if (!user || (singleReview && (singleReview.user_id !== user.id))) {
        return <Redirect to='/' />;
    }

    return (
        <div className='new-review-page-wrapper'>
            <div className='all-coffee-details-name' >Edit My Review</div>
            <div className='create-a-review-wrapper'>
                <div className='user-review-coffee-info-single-container'>
                    <NavLink className='user-review-coffee-info-single-container' to={`/cawfee/${coffeeId}`}>
                        <div className='user-review-coffee-image'>
                            <img className='user-review-coffee-image' alt='coffee image' src={coffee.img_url} />
                        </div>
                        <div className="user-review-coffee-info-name">
                            {coffee && coffee.name}
                        </div>
                        <div className="user-review-brand-info-name">
                            {coffee.Brand && coffee.Brand.name.toUpperCase()}
                        </div>
                    </NavLink>
                </div>
                <div className='create-review-wrapper'>

                    <form onSubmit={submitReview}>
                        <div className='create-review-form-errors'>
                            {errors && errors.map((error, ind) => (
                                <div className='create-review-form-errors' key={ind}>{error}</div>
                            ))}
                        </div>

                        <div className='dynamic-star-rating-wrapper edit-review-page'>
                            {[1, 2, 3, 4, 5].map((star, i) => {
                                i++;
                                return (
                                    <div key={i}
                                        className={i <= rating ? "review-star fill" : "review-star empty"}
                                        onClick={() => {
                                            setRating(i)
                                            // handleRating(i)
                                        }
                                        }
                                        onMouseEnter={() => setHover(i)}
                                        onMouseLeave={() => setHover(rating)}

                                    >
                                        {i <= (rating || hover) ?
                                            (<img className='new-review-input' height='20' width='20' src={fullStar} />) :
                                            (<img className='new-review-input' height='20' width='20' src={emptyStar} />)}
                                    </div>
                                )
                            })}
                        </div >

                        <div className='review-input-wrapper'>
                            {/* <label className='review-input-label' htmlFor='brand'>Review</label> */}
                            <textarea
                                name='brand'
                                required
                                className='create-review-input new-review-textarea'
                                value={review_body}
                                onChange={e => setReview_body(e.target.value)}
                            >

                            </textarea>
                            <div className='characters-remaining'>{500 - review_body.length >= 0 ? 500 - review_body.length : 0} CHARACTERS REMAINING</div>

                        </div>
                        <button
                            type="submit"
                            disabled={errors.length > 0}
                            id='login-button'
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}