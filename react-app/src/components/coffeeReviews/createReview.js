import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllReview, getOneReview, addOneReview, loadUserReview } from "../../store/review";
import brokenImg from '../../icons/broken-img.png'
import './editReview.css'

export default function AddReview({ coffeeId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    // const {reviewId} = useParams()

    const [errors, setErrors] = useState([]);

    const [rating, setRating] = useState('')
    const [review_body, setReview_body] = useState('')
    const [showAddReview, setShowAddReview] = useState(false)


    const user = useSelector(state => state.session.user)
    const review = useSelector(state => state.review.singleReview)

    let singleReview;
    if (review) {
        singleReview = review.Reviews
    }


    useEffect(() => {
        if (!showAddReview) return;

        const closeAddReview = () => {
            setShowAddReview(false);
        };

        document.addEventListener('click', closeAddReview);

        return () => document.removeEventListener("click", closeAddReview);
    }, [showAddReview]);



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

    const submitReview = async (e) => {
        e.preventDefault();
        const newReview = {
            rating,
            user_id: user.id,
            review_body
        }

        try {
            const createdReview = await dispatch(addOneReview(coffeeId, createdReview))
            setErrors([])
            await dispatch(loadUserReview())
            return <Redirect to='/my-reviews' />
        } catch (res) {
            console.log(res)
        }

    }
    if (!user || (singleReview && (singleReview.user_id !== user.id))) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <div onClick={() => setShowAddReview(!showAddReview)}>Edit Review</div>
            {showAddReview && (<div className='edit-review-page-wrapper'>
                <div className='new-review-form-wrapper'>
                    <form onSubmit={submitReview}>
                        <div className='new-review-form-errors'>
                            {errors && errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>

                        <div className='review-input-wrapper'>
                            <label className='review-input-label' htmlFor='name'>Rating</label>
                            <input
                                name='name'
                                className='new-review-input'
                                type='text'
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                            />
                        </div>

                        <div className='review-input-wrapper'>
                            <label className='review-input-label' htmlFor='brand'>Review</label>
                            <textarea
                                name='brand'
                                required
                                className='new-review-input'
                                value={review_body}
                                onChange={e => setReview_body(e.target.value)}
                            >

                            </textarea>
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

            </div>)}
        </div>
    )
}