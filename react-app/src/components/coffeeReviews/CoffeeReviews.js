import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneReview, loadAllReview } from "../../store/review";
import './coffeeReviews.css'
import ReviewStars from "./reviewStars";

export default function CoffeeReviews({ coffeeId }) {
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.review.allReview)

    useEffect(() => {
        dispatch(loadAllReview(coffeeId))
    }, [dispatch, reviews.length])

    async function deleteReview(id) {
        await dispatch(deleteOneReview(id))
        dispatch(loadAllReview(coffeeId))
    }

    if (reviews) {
        if (Object.values(reviews).length < 1) {
            return (
                <div className='empty-page'>
                    This coffee does not have any reviews. 
                    <NavLink className='write-a-review' to={`/reviews/${coffeeId}/new`}>
                        {` Write a Review.`}
                    </NavLink>
                </div>
            )
        }
    }

    function dateFormatter(date) {
        if (date) {
            date = date.toString()
            return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
        }
    }

    let allReview
    let reviewUserIds
    if (reviews) {
        let reviewArr = Object.values(reviews)
        reviewUserIds = reviewArr.map(obj => obj.user_id)
        allReview = reviewArr.map(obj => {
            let user = obj.User
            if (user) {


                return (
                    <div className='user-review-container' key={obj.id}>
                        <div className='user-info-single-container'>
                            <div className="user-info-name">
                                {user.first_name && user.first_name.toUpperCase()}
                                {user.curator && <span className='coffee-review-details'>Verified Cawfee Curator</span>}
                            </div>
                            <div className='coffee-review-details-wrapper'>
                                <div className='coffee-review-stars'>
                                    <ReviewStars rating={obj.rating} />
                                    <span className='coffee-review-details'>{dateFormatter(obj.updated_at)}</span>
                                    {obj.created_at.slice(0, 19) !== obj.updated_at.slice(0, 19) && <span className='coffee-review-details'>(Edited)</span>}
                                </div>
                                <div className='single-coffee-review-details'>
                                    {obj.review_body}
                                    {currentUser && obj.user_id === currentUser.id && <div className='single-coffee-review-edit-delete'>

                                        <NavLink className='single-coffee-review-edit-delete' to={`/cawfee/${coffeeId}/reviews/${obj.id}/edit`}>Edit</NavLink>

                                        <div onClick={() => deleteReview(obj.id)} 
                                        className='single-coffee-review-edit-delete'>
                                            Delete
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className='all-review-line-break'></div>
                    </div>
                )
            }
        })
    }
    if (!currentUser) {
        return <Redirect to='/' />
    }


    return (
        <div className='coffee-all-reviews-container'>
            <div className='coffee-all-user-review-container'>
                <div className='user-review-container'>
                    <div className='get-user-review-user-review'>
                        Reviews
                    </div>
                    {!currentUser && <div className='coffee-review-details'>
                        Log in to review this product
                    </div>}
                    {currentUser && !reviewUserIds.includes(currentUser.id) && <div className='coffee-review-details'>
                        <NavLink className='coffee-review-details-review-this-product' to={`/reviews/${coffeeId}/new`}>Review this product</NavLink>
                    </div>}
                    <div className='all-review-line-break'></div>
                </div>
                {allReview}
            </div>
        </div>
    )
}