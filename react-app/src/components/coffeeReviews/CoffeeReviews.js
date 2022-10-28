import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneReview, loadAllReview } from "../../store/review";
import './coffeeReviews.css'

export default function CoffeeReviews({coffeeId}) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
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
                </div>
            )
        }
    }

    // console.log("REVIEWS", reviews)
    let allReview
    if (reviews) {
        let reviewArr = Object.values(reviews)
        // console.log("REVIEWSARR", reviewArr)
        allReview = reviewArr.map(obj => {
            let user = obj.User
            console.log("USER", user)
            console.log("REVIEW", obj)
            return (
                <div className='user-review-container' key={obj.id}>
                    <div className='user-info-single-container'>
                            <div className="user-info-name">
                                {user.first_name.toUpperCase()}
                                {user.curator && <span>Verified Cawfee Curator</span>}
                            </div>
                        <div className='coffee-review-details'>
                            <div className='coffee-review-details-brand'>
                                {obj.rating}
                            </div>
                            <div className='coffee-review-details-name'>
                                <NavLink style={{ textDecoration: 'none', color: 'black' }} className='coffee-review-details-name' to={`/cawfee/${obj.id}`}>
                                    {/* {obj.name} */}
                                </NavLink>
                            </div>
                            <div className='coffee-review-details-price'>
                                {/* ${obj.price} */}
                            </div>
                        </div>
                    </div>
                    <div className='user-review-details-container'>
                        <div className='user-review-details'>Current Inventory: {obj.inventory}</div>
                        <div className='user-review-details-container'>
                            <div ><NavLink className='user-review-details user-review-navlink' to={`/cawfee/edit/${obj.id}`}>Edit Review</NavLink></div>
                            {/* <div onClick={() => deleteReview(obj.id)} className='user-review-details user-review-navlink' >Remove Curation</div> */}
                        </div>
                    </div>
                    <div className='all-review-line-break'></div>
                </div>
            )
        })
    }
    if (!user) {
        return <Redirect to='/' />
    }


    return (
        <div className='get-user-review-page-wrapper'>
            <div className='get-user-review-header'>
                <div className='get-user-review-user-review'>
                    Reviews
                </div>
                {!user && <div className='get-user-review-subheader'>
                    Log in to review this product
                </div>}
                {user && <div className='get-user-review-subheader'>
                    Review this product
                </div>}
            </div>
            <div className='all-review-line-break'></div>
            <div className='coffee-review-container'>
                {allReview}
            </div>
        </div>
    )
}