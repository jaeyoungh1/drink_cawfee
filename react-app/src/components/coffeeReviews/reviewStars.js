import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneReview, loadAllReview } from "../../store/review";

import './coffeeReviews.css'

export default function ReviewStars({ rating }) {
    // commentthisout
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