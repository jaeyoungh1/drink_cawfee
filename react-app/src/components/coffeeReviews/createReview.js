import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addOneReview, loadUserReview } from "../../store/review";
import { getOneCoffee } from "../../store/coffee";
import brokenImg from '../../icons/broken-img.png'
import '../editReview/editReview.css'
import DynamicRating from "./dynamicRating";

export default function AddReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { coffeeId } = useParams()

    const [errors, setErrors] = useState([]);

    const [rating, setRating] = useState('')
    const [review_body, setReview_body] = useState('')


    const user = useSelector(state => state.session.user)
    const review = useSelector(state => state.review.singleReview)
    const coffee = useSelector(state => state.coffee.singleCoffee)

    const handleRating = num => {
        setRating(num)
    }

    let singleReview;
    if (review) {
        singleReview = review.Reviews
    }

    useEffect(() => {
        dispatch(getOneCoffee(coffeeId))
    }, [dispatch])

    useEffect(() => {
        const _errors = [];

        if (rating && (rating < 1 || rating > 5)) {
            _errors.push("Rating must be an integer between 1 and 5");
        }

        if (review_body && review_body.length < 2) {
            _errors.push("Review must be at least two characters.");
        }

        if (review_body && review_body.length > 500) {
            _errors.push("Review can not be more than 500 characters");
        }

        setErrors(_errors);
    }, [rating, review_body]);

    console.log("ERRORS", errors)

    const submitReview = async (e) => {
        e.preventDefault();
        const newReview = {
            rating,
            user_id: user.id,
            review_body
        }

        try {
            const createdReview = await dispatch(addOneReview(coffeeId, newReview))
            setErrors([])
            return history.push("/my-reviews")
        } catch (res) {
            console.log(res)
        }

    }
    if (!user || (singleReview && (singleReview.user_id !== user.id))) {
        return <Redirect to='/' />;
    }

    return (
        <div className='new-review-page-wrapper'>
            <div className='all-coffee-details-name' >Write A Review</div>
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

                        <div className='create-review-input-wrapper'>
                            {/* <label className='review-input-label' htmlFor='name'>Rating</label> */}
                            <DynamicRating handleRating={handleRating} />
                            <input
                                name='name'
                                className='new-review-input invisible'
                                type='text'
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                            />
                        </div>

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