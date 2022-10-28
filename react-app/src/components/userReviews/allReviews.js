import { useEffect, useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneReview, loadUserReview } from "../../store/review";
import './allReviews.css'

export default function AllReviews() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.review.allReview)

    useEffect(() => {
        dispatch(loadUserReview())
    }, [dispatch, reviews.length])

    async function deleteReview(id) {
        await dispatch(deleteOneReview(id))
        dispatch(loadUserReview())
    }

    if (reviews) {
        if (Object.values(reviews).length < 1) {
            return (
                <div className='empty-page'>
                    No current reviews
                </div>
            )
        } 
    }

    console.log("REVIEWS", reviews)
    let allReview
    // if (reviews) {
    //     let reviewArr = Object.values(reviews)
    //     allReview = reviewArr.map(obj => {
    //         return (
    //             <div className='user-review-container' key={obj.id}>
    //                 <div className='user-review-single-container'>
    //                     <NavLink to={`/cawfee/${obj.id}`}>
    //                         <div className="user-review-image-wrapper">
    //                             <img className="single-review-image-wrapper-img" src={"https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1040_3.jpg"} />
    //                         </div>
    //                     </NavLink>

    //                     <div className='all-review-line-break'></div>
    //                     <div className='all-review-details'>
    //                         <div className='all-review-details-brand'>
    //                             {obj.Brand.name.toUpperCase()}
    //                         </div>
    //                         <div className='all-review-details-name'>
    //                             <NavLink style={{ textDecoration: 'none', color: 'black' }} className='all-review-details-name' to={`/cawfee/${obj.id}`}>
    //                                 {obj.name}
    //                             </NavLink>
    //                         </div>
    //                         <div className='all-review-details-price'>
    //                             ${obj.price}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className='user-review-details-container'>
    //                     <div className='user-review-details'>Current Inventory: {obj.inventory}</div>
    //                     <div className='user-review-details-container'>
    //                         <div ><NavLink className='user-review-details user-review-navlink' to={`/cawfee/edit/${obj.id}`}>Edit Review</NavLink></div>
    //                         <div onClick={() => deleteReview(obj.id)} className='user-review-details user-review-navlink' >Remove Curation</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }
    if (!user) {
        return <Redirect to='/' />
    }


    return (
        <div className='get-all-review-page-wrapper'>
            <div className='get-all-review-header'>
                <div className='get-all-review-all-review'>
                    Your Review Curations
                </div>
                <div className='get-all-review-subheader'>
                    A collection of the reviews that you have curated and are currently available for purchase
                    on Drink Cawfee. The early bird gets the brew!
                </div>
            </div>
            <div className='all-review-container'>
                {/* {allReview} */}
            </div>
        </div>
    )
}