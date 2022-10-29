import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllReview, getOneReview, editOneReview, loadUserReview } from "../../store/review";
import brokenImg from '../../icons/broken-img.png'
import x from '../../icons/x.svg'
import './editReview.css'

export default function EditReview({ reviewId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    // const {reviewId} = useParams()

    const [errors, setErrors] = useState([]);

    const [rating, setRating] = useState('')
    const [review_body, setReview_body] = useState('')
    const [showEditReview, setShowEditReview] = useState(true)


    const user = useSelector(state => state.session.user)
    const review = useSelector(state => state.review.singleReview)

    let singleReview;
    if (review) {
        singleReview = review.Reviews
    }

    useEffect(() => {
        dispatch(getOneReview(reviewId))
    }, [dispatch, reviewId])

    useEffect(() => {
        if (!showEditReview) return;

        let close = document.querySelectorAll('.closeEditModal')
        let input = document.querySelectorAll('.new-review-input')

        console.log(close)

        const closeEditReview = () => {
            setShowEditReview(false);
        };

        close.forEach(ele => ele.addEventListener('click', closeEditReview));
        input.forEach(ele => ele.addEventListener('click', e => e.stopPropagation()));
        document.addEventListener('click', closeEditReview)

        return () => document.removeEventListener("click", closeEditReview);
    }, [showEditReview]);


    // let editReviewVisibility
    // showEditReview === true ? editReviewVisibility = 'edit-visible' : editReviewVisibility = 'edit-not-visible'

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
            <div className='edit-review-page-wrapper-title' onClick={() => setShowEditReview(!showEditReview)}></div>
            {showEditReview && <div >
                <div className='new-review-form-wrapper'>
                    <div id='close-modal'>
                        <img className='closeEditModal' onClick={() => setShowEditReview(!showEditReview)} src={x} />
                    </div>
                        
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
                            // className='closeEditModal'
                        >
                            SUBMIT
                        </button>
                    </form>

                </div>

            </div>}
        </div>
    )
}