import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneReview, loadUserReview, getOneReview, editOneReview } from "../../store/review";
import './userReviews.css'
import ReviewStars from "../coffeeReviews/reviewStars";
import x from '../../icons/x.svg'
import '../editReview/editReview.css'
import emptyStar from '../../icons/empty-star.svg'
import fullStar from '../../icons/filled-star.svg'
import DynamicRating from "../coffeeReviews/dynamicRating";

export default function UserReviews() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.review.allReview)
    const [seeEditModal, setSeeEditModal] = useState(false)
    const [editReviewId, setEditReviewId] = useState('')
    const [openConfirm, setOpenConfirm] = useState('')

    let [starRating, setStarRating] = useState(0)
    let [hover, setHover] = useState()

    useEffect(() => {
        dispatch(loadUserReview())
        setSeeEditModal(false)
    }, [dispatch, reviews.length])


    async function deleteReview(id) {
        await dispatch(deleteOneReview(id))
        dispatch(loadUserReview())
    }



    function dateFormatter(date) {
        if (date) {
            date = date.toString()
            return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
        }
    }


    // GRABBING FROM EDIT REVIEW --------------------------------------

    const [errors, setErrors] = useState([]);

    const [rating, setRating] = useState('')
    const [review_body, setReview_body] = useState('')
    // const [seeEditModal, setSeeEditModal] = useState(true)


    const review = useSelector(state => state.review.singleReview)

    let singleReview;
    if (review) {
        singleReview = review.Reviews
    }

    useEffect(() => {
        dispatch(getOneReview(editReviewId))
    }, [dispatch, editReviewId])

    useEffect(() => {
        if (!seeEditModal) return;

        // let close = document.querySelectorAll('.closeEditModal')
        // let input = document.querySelectorAll('.new-review-input')
        let stars = document.querySelectorAll('.coffee-all-user-review-container')

        const closeEditReview = () => {
            setSeeEditModal(false);
        };

        // close.forEach(ele => ele.addEventListener('click', closeEditReview));
        // input.forEach(ele => ele.addEventListener('click', e => e.stopPropagation()));
        stars.forEach(ele => ele.addEventListener('click', closeEditReview));
        // document.addEventListener('click', closeEditReview)

        return () => document.removeEventListener("click", closeEditReview);
    }, [seeEditModal]);


    // let editReviewVisibility
    // seeEditModal === true ? editReviewVisibility = 'edit-visible' : editReviewVisibility = 'edit-not-visible'

    useEffect(() => {
        const errors = [];

        if (rating && (rating < 1 || rating > 5)) {
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
            const createdReview = await dispatch(editOneReview(editReviewId, newReview))
            setErrors([])
            await dispatch(loadUserReview())
            setSeeEditModal(false)
            return <Redirect to='/my-reviews' />
        } catch (res) {
            console.log(res)
        }

    }

    // END FROM EDIT REVIEW --------------------------------------


    const handleRating = num => {
        setRating(num)
    }

    if (!user) {
        return <Redirect to='/' />
    }

    let allReview
    if (reviews) {
        // console.log(Object.values(reviews).length)
        if (Object.values(reviews).length < 1) {
            allReview = (
                <div className='empty-page'>
                    You do not currently have any reviews.
                </div>

            )
        } else {


            let reviewArr = Object.values(reviews)
            allReview = reviewArr.map(obj => {
                let coffee = obj.Coffee
                let brand
                let id
                if (coffee) {
                    brand = coffee.Brand
                    id = coffee.id
                }
                if (coffee) {

                    return (
                        <div className='user-reviews-wrapper'>
                            <div className='user-single-coffee-review-container' key={obj.id}>
                                <div className='user-review-coffee-info-single-container'>
                                    <NavLink className='user-review-coffee-info-single-container' to={`/cawfee/${id}`}>
                                        <div className='user-review-coffee-image'>
                                            <img className='user-review-coffee-image' alt='coffee image' src={coffee.img_url} />
                                        </div>
                                        <div className="user-review-coffee-info-name">
                                            {coffee.name}
                                        </div>
                                        <div className="user-review-brand-info-name">
                                            {brand.name.toUpperCase()}
                                        </div>
                                    </NavLink>
                                </div>
                                <div className='coffee-review-details-wrapper'>
                                    <div className='coffee-review-stars'>
                                        <ReviewStars rating={obj.rating} />
                                        <span className='coffee-review-details'>{dateFormatter(obj.updated_at)}</span>
                                        {obj.created_at.slice(0, 19) !== obj.updated_at.slice(0, 19) && <span className='coffee-review-details'>(Edited)</span>}
                                    </div>
                                    <div className='coffee-review-details'>
                                        {obj.review_body}
                                    </div>
                                    <div></div>
                                    <div className='user-review-edit-delete'>
                                        {/* <EditReview reviewId={editReviewId}/> */}
                                        <div onClick={() => {
                                            setSeeEditModal(!seeEditModal)
                                            setEditReviewId(obj.id)
                                        }} className='review-edit-delete' >
                                            Edit
                                        </div>
                                        {openConfirm === obj.id ?
                                            <div onClick={() => deleteReview(obj.id)} className='review-edit-delete review-request-confirmation'>
                                                Confirm Delete
                                            </div>
                                            :
                                            <div onClick={() => setOpenConfirm(obj.id)} className='review-edit-delete' >
                                                Delete
                                            </div>
                                        }

                                        {openConfirm === obj.id && <div onClick={() => setOpenConfirm(0)} className='review-edit-delete'>Cancel</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='user-review-line-break'></div>
                        </div >
                    )
                }

            })
        }
    }



    return (
        <div className='coffee-user-reviews-container'>
            <div className='coffee-all-user-review-container'>
                <div className='user-review-container'>
                    <div className='get-all-coffee-all-coffee'>
                        My Reviews
                    </div>
                    <div className='get-all-coffee-subheader'>
                        Coffees that you have reviewed. Now this is something to caw about!
                    </div>

                </div>
                {allReview}
            </div>
            {seeEditModal && (
                <div >
                    <div className='new-review-form-wrapper'>
                        <div id='close-modal'>
                            <img className='closeEditModal' onClick={() => setSeeEditModal(!seeEditModal)} src={x} />
                        </div>
                        <div className='edit-review-page-wrapper-title'>Edit Review</div>

                        <form className='review-input-wrapper' onSubmit={submitReview}>
                            <div className='new-review-form-errors'>
                                {errors && errors.map((error, ind) => (
                                    <div className='new-review-form-errors' key={ind}>{error}</div>
                                ))}
                            </div>

                            <div className='new-review-wrapper'>
                                {/* <label className='review-input-label' htmlFor='name'>Rating</label> */}
                                {/* TESTING ========== */}
                                <div className='dynamic-star-rating-wrapper '>
                                    {[1, 2, 3, 4, 5].map((star, i) => {
                                        i++;
                                        return (
                                            <div key={i}
                                                className={i <= starRating ? "review-star fill" : "review-star empty"}
                                                onClick={() => {
                                                    setRating(i)
                                                    // handleRating(i)
                                                }
                                                }
                                                onMouseEnter={() => setHover(i)}
                                                onMouseLeave={() => setHover(starRating)}

                                            >
                                                {i <= (rating || hover) ?
                                                    (<img className='new-review-input' height='20' width='20' src={fullStar} />) :
                                                    (<img className='new-review-input' height='20' width='20' src={emptyStar} />)}
                                            </div>
                                        )
                                    })}
                                </div >

                                <input
                                    name='name'
                                    className='new-review-input invisible'
                                    type='text'
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                />
                            </div>

                            <div className='review-input-wrapper new-review-wrapper'>
                                {/* <label className='review-input-label' htmlFor='brand'>Review</label> */}
                                <textarea
                                    name='brand'
                                    required
                                    className='new-review-wrapper new-review-textarea'
                                    value={review_body}
                                    onChange={e => setReview_body(e.target.value)}
                                >

                                </textarea>
                                <div className='characters-remaining'>{500 - review_body.length} CHARACTERS REMAINING</div>
                            </div>
                            <button
                                type="submit"
                                disabled={errors.length > 0}
                                id='login-button'
                                className='new-review-input'
                            // className='closeEditModal'
                            >
                                SUBMIT
                            </button>
                        </form>

                    </div>

                </div>
            )
            }
        </div>
    )
}