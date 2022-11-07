import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAllBrand } from "../../store/brand";
import './roasters.css'
import brokenImg from '../../icons/broken-img.png'
import noImg from '../../icons/no_image.svg'


export default function Roasters() {
    const dispatch = useDispatch()

    const brands = useSelector(state => state.brand.allBrand)

    useEffect(() => {
        dispatch(loadAllBrand())
    }, [dispatch])

    let allBrand
    if (brands) {
        let brandArr = Object.values(brands)
        // console.log("BRAND ARR", brandArr)
        if (brandArr.length < 1) {
            allBrand = (
                <div className='no-brand-container'>
                    This page is under construction.
                </div>
            )
        } else {
            allBrand = brandArr.map(obj => {
                return (
                    <div className='all-roaster-single-container' key={obj.id}>

                        <div className="single-roaster-image-wrapper">
                            <img alt='single roaster' className="single-roaster-image-wrapper-img" src={obj.brand_img}
                                onError={e => e.target.src = noImg} />
                        </div>
                        <div className='all-roaster-details'>
                            <div className='all-roaster-details-roaster'>
                                {obj.name}
                            </div>
                            <div className='all-roaster-details-location'>
                                {obj.city}, {obj.state}
                            </div>
                            <div className='all-roaster-details-story'>
                                {obj.brand_story}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }


    return (
        <div className='roaster-page-wrapper'>
            <div className='get-all-roaster-header'>
                <div className='get-all-roaster-header-link'>
                    {/* <span><NavLink className='get-all-brand-header-link-nav' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee'>Brand</NavLink></span> <img width='10' height='10' src={arrow} /> {title} */}
                </div>
                <div className='get-all-roaster-all-roaster'>
                    Roasters
                </div>
                <div className='get-all-roaster-subheader'>
                    Explore the dedicated people standing behind your coffee.
                </div>
            </div>
            <div className='get-all-roaster-header-img'>
                <img alt='header' src="https://images.ctfassets.net/o88ugk6hewlf/uvxmiGvizkTYPN5tiYlpF/2d6e37876fa75fdeb87071cd86d75aa1/1440x770__43_.png?q=75" />
            </div>
            <div className='roaster-roasters'>
                {allBrand}
            </div>

        </div>
    )
}